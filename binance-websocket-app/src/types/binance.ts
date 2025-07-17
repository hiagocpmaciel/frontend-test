export interface BinanceTicker {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  p: string; // Price change
  P: string; // Price change percent
  w: string; // Weighted average price
  x: string; // First trade price (first trade before the 24hr rolling window)
  c: string; // Last price
  Q: string; // Last quantity
  b: string; // Best bid price
  B: string; // Best bid quantity
  a: string; // Best ask price
  A: string; // Best ask quantity
  o: string; // Open price
  h: string; // High price
  l: string; // Low price
  v: string; // Total traded base asset volume
  q: string; // Total traded quote asset volume
  O: number; // Statistics open time
  C: number; // Statistics close time
  F: number; // First trade ID
  L: number; // Last trade ID
  n: number; // Total number of trades
}

export interface SymbolData {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  bestBidPrice: string;
  bestAskPrice: string;
  eventTime: number;
}

export interface BinanceContextType {
  symbols: string[];
  symbolData: SymbolData[];
  selectedSymbols: string[];
  addSymbolToWatch: (symbol: string) => void;
  removeSymbolFromWatch: (symbol: string) => void;
}

export interface ExchangeInfoSymbol {
  symbol: string;
  status: string;
  baseAsset: string;
  quoteAsset: string;
}

export interface ExchangeInfoResponse {
  symbols: ExchangeInfoSymbol[];
}

export interface WebSocketMessage {
  stream: string;
  data: BinanceTicker;
}