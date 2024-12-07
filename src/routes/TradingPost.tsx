import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { getAllTradingPostItems } from "../Utils/API";
import { TTPItem } from "../Utils/types";
import { useEffect, useState } from "react";
import { stringify } from "postcss";

export const Route = createFileRoute("/TradingPost")({
  loader: async () => {
    const tpItems = await getAllTradingPostItems();

    return {
      tpItems,
    };
  },
  component: TradingPostComponent,
});
const listingFeePercentage = 0.05;
const exchangeFreePercentage = 0.1;
const calculateROIForItem = (item: TTPItem) => {
  if (item === null) return "0";
  const itemProfit = calculateProfit(item);
  const ROI = (itemProfit / item.LatestPrice.buyPrice) * 100;
  return ROI.toFixed(0);
};

const calculateProfit = (item: TTPItem) => {
  if (item === null) return 0;
  const preFeeProfit = item.LatestPrice.sellPrice - item.LatestPrice.buyPrice;
  const listFeeProfit = preFeeProfit * listingFeePercentage;
  const exchangeFreeProfit = listFeeProfit * exchangeFreePercentage;
  return exchangeFreeProfit;
};

const convertPriceToCoins = (price: string) => {
  if (price.length === 0) return "0";
};

function TradingPostComponent() {
  const { tpItems } = useLoaderData({ from: "/TradingPost" });
  const itemsPerPage = 50;
  let currentPage = 40;
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800 text-white text-sm">
            <th className="border border-gray-700 border-r-0 border-r-transparent px-4 py-2"></th>
            <th className="border border-gray-700 border-l-0 px-4 py-2">
              Name
            </th>
            <th className="border border-gray-700 px-4 py-2">Sell</th>
            <th className="border border-gray-700 px-4 py-2">Buy</th>
            <th className="border border-gray-700 px-4 py-2">Profit</th>
            <th className="border border-gray-700 px-4 py-2">ROI</th>
            <th className="border border-gray-700 px-4 py-2">Supply</th>
            <th className="border border-gray-700 px-4 py-2">Demand</th>
            <th className="border border-gray-700 px-4 py-2">Sold</th>
            <th className="border border-gray-700 px-4 py-2">Offers</th>
            <th className="border border-gray-700 px-4 py-2">Bought</th>
            <th className="border border-gray-700 px-4 py-2">Bids</th>
          </tr>
        </thead>
        <tbody>
          {tpItems &&
            tpItems
              .slice(
                itemsPerPage * currentPage,
                itemsPerPage * currentPage + itemsPerPage
              )
              .map((item, index) => (
                <tr
                  key={index}
                  className={`text-sm ${
                    index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                  } hover:bg-gray-700`}
                >
                  <td className="border border-gray-700 border-r-0 pl-2">
                    <img
                      className="h-full max-h-8"
                      src={item.icon}
                      alt={`${item.name} img`}
                    />
                  </td>
                  <td className="border border-gray-700 border-l-0 px-4 py-2 text-white">
                    {item.name}
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-gray-300">
                    {item.LatestPrice.sellPrice}
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-gray-300">
                    {item.LatestPrice.buyPrice}
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-gray-300">
                    {calculateProfit(item).toFixed(0)}
                  </td>
                  <td
                    className={`border border-gray-700 px-4 py-2 ${
                      calculateROIForItem(item).startsWith("-")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {calculateROIForItem(item)}
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-gray-300">
                    {item.LatestPrice.supply}
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-gray-300">
                    {item.LatestPrice.demand}
                  </td>
                  {/* <td className="border border-gray-700 px-4 py-2 text-gray-300">
                {item.sold}
              </td>
              <td className="border border-gray-700 px-4 py-2 text-gray-300">
                {item.offers}
              </td>
              <td className="border border-gray-700 px-4 py-2 text-gray-300">
                {item.bought}
              </td>
              <td className="border border-gray-700 px-4 py-2 text-gray-300">
                {item.bids}
              </td> */}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
