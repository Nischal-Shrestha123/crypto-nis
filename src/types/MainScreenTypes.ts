// Type for the Chart
type ChartProps = {
    chartData: ChartData[];
}

// Type for the table to show crypto currency data
type CryptoHistoryProps = {
    cryptoTableData: CryptoHistoryData[];
    handleCheckboxClick(id: string): void;
}

type CryptoHistoryData = {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    priceUsd: string;
    changePercent24Hr: string;
}

type ChartData = {
    priceUsd: string;
    time: number;
}

// Exporting all the required types
export type {ChartProps, ChartData, CryptoHistoryProps, CryptoHistoryData};