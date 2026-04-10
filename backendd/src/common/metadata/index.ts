export const SUPORTED_ASSETS = ["SOL", "BTC", "ETH"]

export type TradingMetadata = {
    type: "LONG" | "SHORT",
    qty: number,
    symbol: typeof SUPORTED_ASSETS
}


export type TimerNodeMetadata = {
    time: number;
}

export type PriceTriggerMetadata = {
    asset: string,
    price: number,

}

