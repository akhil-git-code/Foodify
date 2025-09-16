# WebSocket Setup Guide

## Issues with Your Original Implementation

### 1. **Missing WebSocket Hook**
Your original code referenced `useSocket()` and `connectWebSocket()` but these functions didn't exist in your codebase.

### 2. **No Error Handling**
The original WebSocket connections had no error handling, reconnection logic, or proper cleanup.

### 3. **State Management Problems**
- No proper state management for WebSocket connections
- Missing connection status tracking
- No message handling

### 4. **App Lifecycle Issues**
- No handling of app state changes (background/foreground)
- WebSockets would disconnect when app goes to background and not reconnect

## Solution Implemented

### 1. **useSocket Hook** (`src/hooks/useSocket.ts`)
- ✅ Proper WebSocket connection management
- ✅ Automatic reconnection with exponential backoff
- ✅ Error handling and cleanup
- ✅ App state change handling
- ✅ Multiple connection support

### 2. **WebSocket Context** (`src/context/WebSocketContext.tsx`)
- ✅ Global state management for WebSocket status
- ✅ Connection count tracking
- ✅ Error state management
- ✅ Message handling

### 3. **Enhanced LoginScreen** (`src/screens/LoginScreenEnhanced.tsx`)
- ✅ Proper WebSocket integration
- ✅ Connection status display
- ✅ Error handling and user feedback
- ✅ Proper cleanup on unmount

## Setup Instructions

### 1. **Add WebSocket Provider to App**
Wrap your app with the WebSocketProvider:

```tsx
// In your App.tsx or main component
import { WebSocketProvider } from './src/context/WebSocketContext';

export default function App() {
  return (
    <WebSocketProvider>
      {/* Your existing app components */}
    </WebSocketProvider>
  );
}
```

### 2. **Update Your LoginScreen**
Replace your current LoginScreen with the enhanced version:

```tsx
// Replace your LoginScreen import
import LoginScreen from './src/screens/LoginScreenEnhanced';
```

### 3. **Integrate with Redux (Optional)**
If you're using Redux, uncomment the Redux-related code in the enhanced LoginScreen and replace the mock implementations with your actual Redux actions.

### 4. **Add Required Dependencies**
Make sure you have these dependencies installed:

```bash
npm install @react-native-async-storage/async-storage
npm install react-native-toast-message
```

## Key Features

### 🔄 **Automatic Reconnection**
- Exponential backoff strategy
- Max reconnection attempts
- App state change handling

### 📊 **Connection Management**
- Multiple WebSocket connections
- Connection status tracking
- Proper cleanup on unmount

### 🚨 **Error Handling**
- Comprehensive error handling
- User-friendly error messages
- Automatic error recovery

### 📱 **App Lifecycle Support**
- Handles app background/foreground
- Maintains connections when possible
- Reconnects when app becomes active

## Usage Example

```tsx
import useSocket from '../hooks/useSocket';

const MyComponent = () => {
  const { connectWebSocket, disconnectWebSocket, sendMessage, isConnected } = useSocket();

  useEffect(() => {
    // Connect to WebSocket
    connectWebSocket(
      'my-connection',
      'wss://example.com',
      '/websocket',
      {
        onConnect: () => console.log('Connected!'),
        onMessage: (data) => console.log('Message:', data),
        onError: (error) => console.error('Error:', error),
      }
    );

    return () => {
      // Cleanup on unmount
      disconnectWebSocket('my-connection');
    };
  }, []);

  const sendData = () => {
    sendMessage('my-connection', { type: 'ping' });
  };

  return (
    <View>
      <Text>Status: {isConnected('my-connection') ? 'Connected' : 'Disconnected'}</Text>
      <Button title="Send Message" onPress={sendData} />
    </View>
  );
};
```

## Troubleshooting

### WebSocket Not Connecting
1. Check if the WebSocket URL is correct
2. Verify the token is valid
3. Check network connectivity
4. Look at console logs for error messages

### Data Not Fluctuating
1. Ensure WebSocket is connected (`isConnected()` returns true)
2. Check if message handlers are properly set up
3. Verify the server is sending data
4. Check console logs for incoming messages

### Reconnection Issues
1. Check `maxReconnectAttempts` setting
2. Verify network stability
3. Check if server is accessible
4. Look at reconnection logs

## Best Practices

1. **Always cleanup** WebSocket connections on component unmount
2. **Handle errors gracefully** and provide user feedback
3. **Monitor connection status** and show appropriate UI states
4. **Use proper reconnection strategies** for production apps
5. **Test on different network conditions** (WiFi, mobile data, poor connection)

## Testing

To test the WebSocket implementation:

1. **Connection Test**: Check if WebSockets connect successfully
2. **Reconnection Test**: Disable network and re-enable to test reconnection
3. **App State Test**: Background and foreground the app to test lifecycle handling
4. **Error Test**: Test with invalid URLs or tokens to verify error handling
5. **Message Test**: Send test messages to verify data flow

The enhanced implementation should resolve all the issues you were experiencing with WebSocket data fluctuation.
