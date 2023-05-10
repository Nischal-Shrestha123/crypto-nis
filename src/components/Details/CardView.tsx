import React from "react";
import { CardViewProps } from "../../types/DetailsTypes";

const CardView: React.FC<CardViewProps> = ({ cardViewData }) => {
  return (
    <div className="max-w-md  flex justify-evenly flex-col">
      {cardViewData ? (
        <>
          <h1 className="text-gray-300 font-bold text-lg my-2">
            {cardViewData.name} ({cardViewData.symbol})
          </h1>
          <p className="text-gray-300 my-1 font-semibold grid grid-cols-2">
            <span>Rank</span>
            <span className="text-gray-50">: {cardViewData.rank}</span>
          </p>
          <p className="text-gray-300 my-1 font-semibold grid grid-cols-2">
            <span>Supply</span>
            <span className="text-gray-50">
              : {parseFloat(cardViewData.supply).toFixed(3)}
            </span>
          </p>
          <p className="text-gray-300 my-1 font-semibold grid grid-cols-2">
            <span>Max Supply</span>
            <span className="text-gray-50">
              :{" "}
              {cardViewData.maxSupply === null
                ? "N/A"
                : parseFloat(cardViewData.maxSupply).toFixed(3)}
            </span>
          </p>
          <p className="text-gray-300 my-1 font-semibold grid grid-cols-2">
            <span>Market Cap USD</span>
            <span className="text-gray-50">
              : {parseFloat(cardViewData.marketCapUsd).toFixed(3)}
            </span>
          </p>
          <p className="text-gray-300 my-1 font-semibold grid grid-cols-2">
            <span>Volume USD (24 Hours)</span>
            <span className="text-gray-50">
              : {parseFloat(cardViewData.volumeUsd24Hr).toFixed(3)}
            </span>
          </p>
          <p className="text-gray-300 my-1 font-semibold grid grid-cols-2">
            <span>Price (USD)</span>
            <span className="text-gray-50">
              : {parseFloat(cardViewData.priceUsd).toFixed(3)}
            </span>
          </p>
        </>
      ) : (
        <p className="text-gray-300">Loading...</p>
      )}
    </div>
  );
};

export default CardView;
