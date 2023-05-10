import { CardViewData } from "../types/DetailsTypes";
import { ChartData } from "../types/MainScreenTypes";

// Query to get assets history by id
export const getAssetsHistoryById = async (id:string) => {
    const response = await fetch(
        "https://api.coincap.io/v2/assets/" + id + "/history?interval=h1"
      );
      const JsonReponse = await response.json();
      return JsonReponse.data as ChartData[];
}

// Query to get assets by Id
export const getAssetsById = async (id: string) => {
    const response = await fetch("https://api.coincap.io/v2/assets/" + id);
        const JsonReponse = await response.json();
        return JsonReponse.data as CardViewData;
}

// Query to get assets history by id of all time
export const getAssetsHistoryByIdForAllTime = async (id: string) => {
    const response = await fetch(
        "https://api.coincap.io/v2/assets/" + id + "/history?interval=d1"
      );
      const JsonReponse = await response.json();
      return JsonReponse.data as ChartData[];
}

//Query to get assets history by id for time intervals
export const getAssetsHistoryByIdForTimeIntervalsAndStartEnd = async (id: string, interval: string, startDate: Date, endDate: Date) => {
    const response = await fetch(
        "https://api.coincap.io/v2/assets/" +
          id +
          "/history?interval=" +
          interval +
          "&start=" +
          startDate.getTime() +
          "&end=" +
          endDate.getTime()
      );
      const JsonReponse = await response.json();
      return JsonReponse.data as ChartData[];
}