import { useEffect, useRef } from 'react';

const useWebSocket = (url: string, onMessage: (data: any) => void) => {
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        socketRef.current = new WebSocket(url);

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            onMessage(data);
        };

        socketRef.current.onclose = () => {
            console.log('WebSocket closed');
        };

        return () => {
            socketRef.current?.close();
        };
    }, [url, onMessage]);
};

export const connectToWebSocket = (symbols: string[], onMessage: (data: any) => void) => {
    const streams = symbols.join('/');
    const url = `wss://data-stream.binance.com/stream?streams=${streams}`;
    useWebSocket(url, onMessage);
};