import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import CryptoHystoryTable from "../../components/MainScreen/CryptoHystoryTable";
import StatisticsChart from "../../components/MainScreen/StatisticsChart";
import { ChartData, CryptoHistoryData } from "../../types/MainScreenTypes";
import {
  getAssets,
  getAssetsHistoryByIdAndTimeInterval,
} from "../../query/MainScreenQuery";

const MainScreen = () => {
  const [loadingTable, setLoadingTable] = useState<boolean>(true);
  const [tableData, setTableData] = useState<CryptoHistoryData[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [filter, setFilter] = useState<string>("");
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [currentlySelected, setCurrentlySelected] = useState<string>("");

  // Function to get time interval of a month
  const subtractMonth = (date: Date) => {
    date.setMonth(date.getMonth() - 1);
    return date;
  };

  // Fetch crypto currency data for table
  useEffect(() => {
    const getCryptodata = async () => {
      try {
        const data = await getAssets(pageNo, filter);
        setTableData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingTable(false);
      }
    };

    getCryptodata();
  }, [pageNo, filter]);

  // Fetch Time/Value data for chart
  const getCryptoHistorydata = async (chartId: string) => {
    try {
      const endDate = new Date();
      const startDate = subtractMonth(new Date());
      const data = await getAssetsHistoryByIdAndTimeInterval(
        chartId,
        startDate,
        endDate
      );
      setChartData(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle pagination click
  const handlePageClick = (data: { selected: number }) => {
    setPageNo(data.selected * 10);
  };

  // Handle Search Bar changes
  const handleSearch = (data: React.FormEvent<HTMLInputElement>) => {
    setFilter(data.currentTarget.value.trim());
  };

  // Handle radio button click to show data in chart
  const handleRadioBtnClick = (id: string) => {
    getCryptoHistorydata(id);
    const selected = tableData.find((item) => item.id === id);
    setCurrentlySelected(selected?.name!);
  };

  return (
    <div className="px-10">
      <div className="flex items-center">
        <p className="text-2xl font-bold mt-5 flex-1">Crypto History</p>
        <input
          type={"text"}
          className="py-1 px-3 rounded-full text-black"
          placeholder="Search..."
          onChange={handleSearch}
        />
      </div>

      {loadingTable ? (
        <div>Loading...</div>
      ) : (
        <CryptoHystoryTable
          cryptoTableData={tableData}
          handleCheckboxClick={handleRadioBtnClick}
        />
      )}
      <p className="text-2xl font-bold mt-2">Statistics</p>
      <div className="bg-gray-950 rounded-md px-1 pt-4 pb-5 shadow-md w-full h-72 my-2">
        <p className="text-center text-gray-300 font-semibold">
          {currentlySelected}
        </p>
        <StatisticsChart chartData={chartData} />
      </div>
      {!loadingTable && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={5}
          onPageChange={handlePageClick}
          className={"flex justify-center align-middle my-5"}
          previousLinkClassName={
            "rounded-l-lg px-2 py-1  border border-slate-100 hover:bg-blue-300 hover:text-black"
          }
          pageLinkClassName={
            "px-3 py-1 border border-slate-100 hover:bg-blue-300 hover:text-black"
          }
          nextLinkClassName={
            "rounded-r-lg px-2 py-1 border border-slate-100 hover:bg-blue-300 hover:text-black"
          }
          activeLinkClassName={"bg-blue-300 text-black"}
        />
      )}
    </div>
  );
};

export default MainScreen;
