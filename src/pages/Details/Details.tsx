import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardView from "../../components/Details/CardView";
import { CardViewData } from "../../types/DetailsTypes";
import StatisticsChart from "../../components/MainScreen/StatisticsChart";
import { ChartData } from "../../types/MainScreenTypes";
import {
  getAssetsById,
  getAssetsHistoryById,
  getAssetsHistoryByIdForAllTime,
  getAssetsHistoryByIdForTimeIntervalsAndStartEnd,
} from "../../query/DetailsQuery";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detailsData, setDetilsData] = useState<CardViewData>();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Array to map Filter Buttons
  const DataFilterBtn = [
    { name: "1 Day", id: "1" },
    { name: "1 Week", id: "2" },
    { name: "1 Month", id: "3" },
    { name: "3 Months", id: "4" },
    { name: "6 Months", id: "5" },
    { name: "1 Year", id: "6" },
    { name: "All-Time", id: "7" },
  ];

  // Fetch crypto currency data for chart according to time interval
  const getCryptoChartDetailsByTime = async (
    startDate: Date,
    endDate: Date,
    interval: string
  ) => {
    try {
      const data = await getAssetsHistoryByIdForTimeIntervalsAndStartEnd(
        id!,
        interval,
        startDate,
        endDate
      );
      setChartData(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch all-time crypto currency data for chart
  const getCryptoChartDetailsGeneral = async () => {
    try {
      const data = await getAssetsHistoryByIdForAllTime(id!);
      setChartData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch Crypto Currency Details by Id
    const getCryptoDetails = async () => {
      try {
        const data = await getAssetsById(id!);
        setDetilsData(data);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch Crypto Currency data for chart (On page load)
    const getCryptoChartDetails = async () => {
      try {
        const data = await getAssetsHistoryById(id!);
        setChartData(data);
      } catch (error) {
        console.error(error);
      }
    };

    getCryptoDetails();
    getCryptoChartDetails();
  }, [id]);

  // Navigate one step back
  const goBack = () => {
    navigate(-1);
  };

  // Handle filter button click
  const handleSetDates = (id: string) => {
    let startDateParam: Date = new Date();
    let endDateParam: Date = new Date();
    const startDate = new Date();
    let interval = "";
    if (id === "1") {
      startDate.setDate(startDate.getDate() - 1);
      startDateParam = startDate;
      interval = "h1";
    } else if (id === "2") {
      startDate.setDate(startDate.getDate() - 7);
      startDateParam = startDate;
      interval = "h12";
    } else if (id === "3") {
      startDate.setMonth(startDate.getMonth() - 1);
      startDateParam = startDate;
      interval = "d1";
    } else if (id === "4") {
      startDate.setMonth(startDate.getMonth() - 3);
      startDateParam = startDate;
      interval = "d1";
    } else if (id === "5") {
      startDate.setMonth(startDate.getMonth() - 6);
      startDateParam = startDate;
      interval = "d1";
    } else if (id === "6") {
      startDate.setFullYear(startDate.getFullYear() - 1);
      startDateParam = startDate;
      interval = "d1";
    } else if (id === "7") {
      interval = "d1";
    }

    if (id !== "7") {
      getCryptoChartDetailsByTime(startDateParam, endDateParam, interval);
    } else {
      getCryptoChartDetailsGeneral();
    }
  };

  return (
    <div className="px-10 mt-5">
      <button
        className="text-sm px-3 py-1 rounded-full font-bold bg-slate-200 text-black hover:bg-slate-300 ease-in-out duration-300"
        onClick={goBack}
      >
        Go Back
      </button>
      <div className="flex flex-col mt-5 gap-5 flex-wrap">
        <CardView cardViewData={detailsData} />
        <div className="flex flex-row flex-wrap">
          {DataFilterBtn.map((data) => (
            <button
              type="button"
              className="px-2 py-1 hover:bg-slate-900 ease-in-out duration-300 flex-1 border-b-2 border-slate-400 hover:border-blue-400"
              onClick={() => handleSetDates(data.id)}
            >
              {data.name}
            </button>
          ))}
        </div>
        <div className="bg-gray-950 rounded-md p-1 shadow-md w-full h-96 mb-5">
          <StatisticsChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Details;
