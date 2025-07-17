import { useEffect, useRef } from 'react';
import { SymbolData } from '../types/binance';

const useBinanceWebSocket = (
    symbols: string[],
    setSymbolData: React.Dispatch<React.SetStateAction<SymbolData[]>>
) => {
    const wsConnectionsRef = useRef<Map<string, WebSocket>>(new Map());

    useEffect(() => {
        const connections = wsConnectionsRef.current;
        
        // Remove conexões de símbolos que não estão mais selecionados
        const currentSymbols = new Set(symbols);
        for (const [symbol, ws] of connections) {
            if (!currentSymbols.has(symbol)) {
                console.log('🔌 Disconnecting from:', symbol);
                ws.close();
                connections.delete(symbol);
                
                // Remove dados do símbolo removido
                setSymbolData(prev => prev.filter(data => data.symbol !== symbol));
            }
        }

        // Adiciona conexões para novos símbolos
        for (const symbol of symbols) {
            if (!connections.has(symbol)) {
                console.log('🔌 Connecting to:', symbol);
                
                const wsUrl = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`;
                const ws = new WebSocket(wsUrl);
                
                ws.onopen = () => {
                    console.log('✅ WebSocket connected for:', symbol);
                };

                ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    
                    setSymbolData(prev => {
                        const existingIndex = prev.findIndex(item => item.symbol === data.s);
                        
                        const newSymbolData: SymbolData = {
                            symbol: data.s,
                            lastPrice: data.c,
                            priceChangePercent: data.P,
                            bestBidPrice: data.b,
                            bestAskPrice: data.a,
                            eventTime: data.E || Date.now()
                        };
                        
                        if (existingIndex >= 0) {
                            // Atualiza item existente
                            const updated = [...prev];
                            updated[existingIndex] = newSymbolData;
                            return updated;
                        } else {
                            // Adiciona novo item
                            return [...prev, newSymbolData];
                        }
                    });
                };

                ws.onclose = () => {
                    console.log('❌ WebSocket disconnected for:', symbol);
                };

                ws.onerror = (error) => {
                    console.error('🚨 WebSocket error for:', symbol, error);
                };

                connections.set(symbol, ws);
            }
        }

        // Cleanup function
        return () => {
            for (const [symbol, ws] of connections) {
                ws.close();
            }
            connections.clear();
        };
    }, [symbols]);

    // Cleanup quando o componente desmonta
    useEffect(() => {
        return () => {
            const connections = wsConnectionsRef.current;
            for (const [symbol, ws] of connections) {
                ws.close();
            }
            connections.clear();
        };
    }, []);

    return wsConnectionsRef.current;
};

export default useBinanceWebSocket;