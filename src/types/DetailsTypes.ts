type CardViewProps = {
    cardViewData: CardViewData | undefined;
}

type CardViewData = {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
}

export type {CardViewProps, CardViewData};