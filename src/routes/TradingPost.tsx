import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import {
  getAllTradingPostItemIds,
  getTradingPostItemsFromIds,
} from "../Utils/API";
import { TTPItem } from "../Utils/types";
import TPPriceComponent from "../Components/TradingPost/TPPriceComponent";
import { useState } from "react";

export const Route = createFileRoute("/TradingPost")({
  loader: async () => {
    const ids = await getAllTradingPostItemIds();
    if (!ids) return;
    const items = await getTradingPostItemsFromIds(ids.slice(500, 550));

    return {
      ids,
      items,
    };
  },
  component: TradingPostComponent,
});

const getItemColor = (item: TTPItem) => {
  switch (item.rarity) {
    case "Rare":
      return "text-Rare";
    case "Basic":
      return "text-white";
    case "Fine":
      return "text-Fine";
    case "Masterwork":
      return "text-Master";
    case "Exotic":
      return "text-Exotic";
    case "Ascended":
      return "text-Ascended";
    case "Legendary":
      return "text-Legendary";
    default:
      return "text-white";
  }
};

function TradingPostComponent() {
  const { ids, items } = useLoaderData({ from: "/TradingPost" });
  const [tpItems, setTpItems] = useState<TTPItem[]>(items!);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 50;
  const getNewItems = async (nextPage: boolean) => {
    setCurrentPage(currentPage + (nextPage ? 1 : -1));
    console.log(`Getting new items at page ${currentPage}`);
    const newItems = await getTradingPostItemsFromIds(
      ids.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
      )
    );
    setTpItems(newItems!);
  };
  return (
    <>
      <div className="flex gap-4 flex-row">
        <button
          className=" w-[5rem] border-2 border-black"
          onClick={() => {
            getNewItems(false);
          }}
        >
          Previous
        </button>
        <button
          className="w-[5rem]  border-2 border-black"
          onClick={() => {
            getNewItems(true);
          }}
        >
          Next
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto m-auto w-[90%] border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-white text-sm">
              <th className="border border-gray-700 border-r-0 border-r-transparent px-4 py-2"></th>
              <th className="border border-gray-700 border-l-0 px-12 py-2">
                Name
              </th>
              <th className="border border-gray-700 px-4 py-2">Sell</th>
              <th className="border border-gray-700 px-4 py-2">Buy</th>
              <th className="border border-gray-700 px-4 py-2">Profit</th>
              <th className="border border-gray-700 px-4 py-2">ROI</th>
              <th className="border border-gray-700 px-4 py-2">Supply</th>
              <th className="border border-gray-700 px-4 py-2">Demand</th>
              {/* <th className="border border-gray-700 px-4 py-2">Sold</th>
            <th className="border border-gray-700 px-4 py-2">Offers</th>
            <th className="border border-gray-700 px-4 py-2">Bought</th>
            <th className="border border-gray-700 px-4 py-2">Bids</th> */}
            </tr>
          </thead>
          <tbody>
            {tpItems &&
              tpItems.map((item, index) => (
                <tr
                  key={index}
                  className={`text-xs ${
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
                  <td
                    className={`border border-gray-700 border-l-0 px-4 py-2 ${getItemColor(item)}`}
                  >
                    {item.name}
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-gray-300">
                    <TPPriceComponent
                      price={
                        item?.LatestPrice?.sellPrice
                          ? item.LatestPrice.sellPrice.toString()
                          : "0"
                      }
                    />
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-gray-300">
                    <TPPriceComponent
                      price={
                        item?.LatestPrice?.buyPrice
                          ? item.LatestPrice.buyPrice.toString()
                          : "0"
                      }
                    />
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-gray-300">
                    <TPPriceComponent
                      price={
                        item.LatestPrice?.profit
                          ? item.LatestPrice.profit.toFixed(0)
                          : "0"
                      }
                    />
                  </td>
                  <td
                    className={`border border-gray-700 px-4 py-2 ${
                      item.LatestPrice?.ROI?.toString().startsWith("-")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {item.LatestPrice?.ROI}%
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-gray-300">
                    {item.LatestPrice ? item.LatestPrice.supply : 0}
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-gray-300">
                    {item.LatestPrice ? item.LatestPrice.demand : 0}
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
    </>
  );
}
