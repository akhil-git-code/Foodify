import { useRef, useCallback, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

interface WebSocketCallbacks {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onMessage?: (data: any) => void;
  onError?: (error: Event) => void;
}

interface WebSocketConnection {
  id: string;
  url: string;
  path: string;
  ws: WebSocket | null;
  callbacks: WebSocketCallbacks;
  reconnectAttempts: number;
  maxReconnectAttempts: number;
  reconnectInterval: number;
  isConnecting: boolean;
  shouldReconnect: boolean;
}

const useSocket = () => {
  const connections = useRef<Map<string, WebSocketConnection>>(new Map());
  const reconnectTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const connectWebSocket = useCallback((
    id: string,
    url: string,
    path: string,
    callbacks: WebSocketCallbacks = {}
  ) => {
    // Close existing connection if it exists
    if (connections.current.has(id)) {
      const existingConnection = connections.current.get(id);
      if (existingConnection?.ws) {
        existingConnection.ws.close();
      }
    }

    const fullUrl = `${url}${path}`;
    console.log(`🔌 Connecting WebSocket ${id} to: ${fullUrl}`);

    const connection: WebSocketConnection = {
      id,
      url,
      path,
      ws: null,
      callbacks,
      reconnectAttempts: 0,
      maxReconnectAttempts: 5,
      reconnectInterval: 1000,
      isConnecting: false,
      shouldReconnect: true,
    };

    connections.current.set(id, connection);

    const connect = () => {
      if (connection.isConnecting) return;
      
      connection.isConnecting = true;
      connection.reconnectAttempts++;

      try {
        const ws = new WebSocket(fullUrl);
        connection.ws = ws;

        ws.onopen = () => {
          console.log(`✅ WebSocket ${id} connected successfully`);
          connection.isConnecting = false;
          connection.reconnectAttempts = 0;
          connection.reconnectInterval = 1000; // Reset interval
          callbacks.onConnect?.();
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log(`📨 WebSocket ${id} received message:`, data);
            callbacks.onMessage?.(data);
          } catch (error) {
            console.log(`📨 WebSocket ${id} received raw message:`, event.data);
            callbacks.onMessage?.(event.data);
          }
        };

        ws.onclose = (event) => {
          console.log(`🔌 WebSocket ${id} closed:`, event.code, event.reason);
          connection.isConnecting = false;
          callbacks.onDisconnect?.();

          // Attempt reconnection if needed
          if (connection.shouldReconnect && connection.reconnectAttempts < connection.maxReconnectAttempts) {
            const delay = connection.reconnectInterval * Math.pow(2, connection.reconnectAttempts - 1);
            console.log(`🔄 WebSocket ${id} reconnecting in ${delay}ms (attempt ${connection.reconnectAttempts}/${connection.maxReconnectAttempts})`);
            
            const timeout = setTimeout(() => {
              reconnectTimeouts.current.delete(id);
              connect();
            }, delay);
            
            reconnectTimeouts.current.set(id, timeout);
          } else if (connection.reconnectAttempts >= connection.maxReconnectAttempts) {
            console.error(`❌ WebSocket ${id} max reconnection attempts reached`);
          }
        };

        ws.onerror = (error) => {
          console.error(`❌ WebSocket ${id} error:`, error);
          connection.isConnecting = false;
          callbacks.onError?.(error);
        };

      } catch (error) {
        console.error(`❌ WebSocket ${id} connection failed:`, error);
        connection.isConnecting = false;
        callbacks.onError?.(error as any);
      }
    };

    connect();
  }, []);

  const disconnectWebSocket = useCallback((id: string) => {
    const connection = connections.current.get(id);
    if (connection) {
      connection.shouldReconnect = false;
      if (connection.ws) {
        connection.ws.close();
        connection.ws = null;
      }
      
      // Clear any pending reconnection
      const timeout = reconnectTimeouts.current.get(id);
      if (timeout) {
        clearTimeout(timeout);
        reconnectTimeouts.current.delete(id);
      }
      
      connections.current.delete(id);
      console.log(`🔌 WebSocket ${id} disconnected and cleaned up`);
    }
  }, []);

  const sendMessage = useCallback((id: string, message: any) => {
    const connection = connections.current.get(id);
    if (connection?.ws && connection.ws.readyState === WebSocket.OPEN) {
      const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
      connection.ws.send(messageStr);
      console.log(`📤 WebSocket ${id} sent message:`, messageStr);
    } else {
      console.warn(`⚠️ WebSocket ${id} is not connected, cannot send message`);
    }
  }, []);

  const isConnected = useCallback((id: string) => {
    const connection = connections.current.get(id);
    return connection?.ws?.readyState === WebSocket.OPEN;
  }, []);

  // Handle app state changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        // Reconnect all WebSockets when app becomes active
        connections.current.forEach((connection, id) => {
          if (connection.shouldReconnect && !connection.isConnecting && 
              (!connection.ws || connection.ws.readyState !== WebSocket.OPEN)) {
            console.log(`🔄 Reconnecting WebSocket ${id} due to app becoming active`);
            connectWebSocket(id, connection.url, connection.path, connection.callbacks);
          }
        });
      } else if (nextAppState === 'background') {
        // Optionally disconnect WebSockets when app goes to background
        // This depends on your app's requirements
        console.log('📱 App went to background, WebSockets remain connected');
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [connectWebSocket]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      connections.current.forEach((connection, id) => {
        disconnectWebSocket(id);
      });
    };
  }, [disconnectWebSocket]);

  return {
    connectWebSocket,
    disconnectWebSocket,
    sendMessage,
    isConnected,
  };
};

export default useSocket;
