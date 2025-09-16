import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface WebSocketState {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  lastMessage: any;
  connectionCount: number;
}

type WebSocketAction =
  | { type: 'CONNECTING' }
  | { type: 'CONNECTED' }
  | { type: 'DISCONNECTED' }
  | { type: 'ERROR'; payload: string }
  | { type: 'MESSAGE_RECEIVED'; payload: any }
  | { type: 'CLEAR_ERROR' }
  | { type: 'INCREMENT_CONNECTION_COUNT' }
  | { type: 'DECREMENT_CONNECTION_COUNT' };

const initialState: WebSocketState = {
  isConnected: false,
  isConnecting: false,
  error: null,
  lastMessage: null,
  connectionCount: 0,
};

const webSocketReducer = (state: WebSocketState, action: WebSocketAction): WebSocketState => {
  switch (action.type) {
    case 'CONNECTING':
      return {
        ...state,
        isConnecting: true,
        error: null,
      };
    case 'CONNECTED':
      return {
        ...state,
        isConnected: true,
        isConnecting: false,
        error: null,
      };
    case 'DISCONNECTED':
      return {
        ...state,
        isConnected: false,
        isConnecting: false,
      };
    case 'ERROR':
      return {
        ...state,
        isConnected: false,
        isConnecting: false,
        error: action.payload,
      };
    case 'MESSAGE_RECEIVED':
      return {
        ...state,
        lastMessage: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'INCREMENT_CONNECTION_COUNT':
      return {
        ...state,
        connectionCount: state.connectionCount + 1,
      };
    case 'DECREMENT_CONNECTION_COUNT':
      return {
        ...state,
        connectionCount: Math.max(0, state.connectionCount - 1),
      };
    default:
      return state;
  }
};

interface WebSocketContextType {
  state: WebSocketState;
  dispatch: React.Dispatch<WebSocketAction>;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(webSocketReducer, initialState);

  return (
    <WebSocketContext.Provider value={{ state, dispatch }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  return context;
};

export default WebSocketContext;
