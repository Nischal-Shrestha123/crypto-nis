import { ChartData, CryptoHistoryData } from "../types/MainScreenTypes";

// Query to get assets
export const getAssets = async (pageNo: number, filter: string) => {
    const response = await fetch(
        "https://api.coincap.io/v2/assets?limit=10&offset=" +
          pageNo +
          "&search=" +
          filter
      );

      const JsonReponse = await response.json();
      return JsonReponse.data as CryptoHistoryData[];
}

// Query to get assets histor by id and time interval
export const getAssetsHistoryByIdAndTimeInterval = async (chartId: string, startDate:Date, endDate: Date) => {
    const response = await fetch(
        "https://api.coincap.io/v2/assets/" +
          chartId +
          "/history?interval=d1&start=" +
          startDate.getTime() +
          "&end=" +
          endDate.getTime()
      );
      const JsonReponse = await response.json();
      return JsonReponse.data as ChartData[];
}