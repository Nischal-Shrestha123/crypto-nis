import React, { useEffect } from "react";
import { CryptoHistoryProps } from "../../types/MainScreenTypes";
import { Link } from "react-router-dom";

const CryptoHystoryTable: React.FC<CryptoHistoryProps> = ({
  cryptoTableData,
  handleCheckboxClick,
}) => {
  // Set first render data for chart as first index data
  useEffect(() => {
    if (cryptoTableData.length > 0) {
      handleCheckboxClick(cryptoTableData[0].id);
    }
  }, []);

  return (
    <div className="w-full overflow-auto">
      <table className="table w-full table-auto border-collapse">
        <thead className="table-header-group">
          <tr className="table-row border-b-2 border-slate-400">
            <th className="table-cell text-left"></th>
            <th className="table-cell text-left font-extrabold">Name</th>
            <th className="table-cell text-left font-extrabold">Symbol</th>
            <th className="table-cell text-left font-extrabold">Rank</th>
            <th className="table-cell text-left font-extrabold">Price (USD)</th>
            <th className="table-cell text-left font-extrabold">
              Change % (24 Hrs)
            </th>
            <th className="table-cell text-left font-extrabold">Action</th>
          </tr>
        </thead>
        <tbody className="table-row-group">
          {cryptoTableData.map(
            (data) =>
              parseInt(data.rank) <= 50 && (
                <tr
                  className="table-row odd:bg-slate-950 even:bg-gray-900 hover:bg-slate-800"
                  key={data.id}
                >
                  <td className="table-cell text-center">
                    <input
                      type={"radio"}
                      name="FilterRadio"
                      onChange={() => handleCheckboxClick(data.id)}
                    />
                  </td>
                  <td className="table-cell text-left font-bold">
                    {data.name}
                  </td>
                  <td className="table-cell text-left font-bold">
                    {data.symbol}
                  </td>
                  <td className="table-cell text-left font-bold">
                    {data.rank}
                  </td>
                  <td className="table-cell text-left ">
                    <span className="font-bold">
                      {parseFloat(data.priceUsd).toFixed(2)}
                    </span>
                    <span className="text-gray-400">
                      {data.priceUsd.split(".")[1].slice(2)}
                    </span>
                  </td>
                  <td className="table-cell text-left font-bold">
                    {parseFloat(data.changePercent24Hr).toFixed(3)}
                  </td>
                  <td className="table-cell text-left font-bold">
                    <Link
                      to={"/details/" + data.id}
                      className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 ease-in-out duration-300"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoHystoryTable;
