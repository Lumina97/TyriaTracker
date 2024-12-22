import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import {
  getAllTradingPostItemIds,
  getTradableItemsInRange,
} from "../Utils/API";
import { TTPItem } from "../Utils/types";
import TPPriceComponent from "../Components/TradingPost/TPPriceComponent";
import { useState } from "react";
import TPTableHead from "../Components/TradingPost/TPTableHead";

export const enum ESortDirection {
  up = "desc",
  down = "asc",
}
export const enum ESortParam {
  none,
  name = "name",
  sell = "sellPrice",
  buy = "buyPrice",
  profit = "profit",
  ROI = "ROI",
  supply = "supply",
  demand = "demand",
}

export const Route = createFileRoute("/TradingPost")({
  loader: async () => {
    const ids = await getAllTradingPostItemIds();
    if (!ids) {
      console.log("no items");
      return;
    }

    const items = await getTradableItemsInRange(
      0 * 50,
      50,
      ESortParam.demand,
      ESortDirection.down
    );
    if (items === null) {
      console.log("items was null");
      return;
    }

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
  const [tpItems, setTpItems] = useState<TTPItem[]>(items);
  const itemsPerPage = 50;
  const maxPage = Math.floor(ids.length / itemsPerPage);

  let currentPage = 0;
  let sortDirection = ESortDirection.down;
  let sortParam = ESortParam.none;

  const SortTable = async (direction: ESortDirection, sort: ESortParam) => {
    sortDirection = direction;
    sortParam = sort;
    currentPage = 0;
    await getNewItems(currentPage);
  };

  const changePage = (addPage: boolean) => {
    currentPage += addPage ? 1 : -1;
    if (currentPage < 0) currentPage = maxPage;
    if (currentPage > maxPage) currentPage = 0;
    return currentPage;
  };

  const getNewItems = async (page: number) => {
    const newItems = await getTradableItemsInRange(
      page * itemsPerPage,
      itemsPerPage,
      sortParam,
      sortDirection
    );
    if (newItems === null) {
      console.log("new items was null");
      return;
    }
    setTpItems(newItems);
  };
  console.log(currentPage);
  return (
    <>
      <div className="flex gap-4 flex-row">
        <button
          className=" w-[5rem] border-2 border-black"
          onClick={() => {
            getNewItems(changePage(false));
          }}
        >
          Previous
        </button>
        <button
          className="w-[5rem]  border-2 border-black"
          onClick={() => {
            getNewItems(changePage(true));
          }}
        >
          Next
        </button>
        <div>
          {" "}
          Page: {currentPage} / {maxPage}
        </div>
      </div>
      <div className="overflow-x-auto mb-12 ">
        <table className="table-auto m-auto w-[90%] border-collapse border border-gray-700 rounded-md">
          <thead>
            <tr className="bg-gray-800 text-white text-sm">
              <th className="border border-gray-700 border-r-0 border-r-transparent px-4 py-2"></th>
              <TPTableHead
                title="Name"
                isActive={false}
                sortDirection={sortDirection}
                sortParam={ESortParam.none}
                onClickSort={SortTable}
              />
              <TPTableHead
                title="Sell"
                isActive={sortParam === ESortParam.sell}
                sortDirection={sortDirection}
                sortParam={ESortParam.sell}
                onClickSort={SortTable}
              />
              <TPTableHead
                title="Buy"
                isActive={sortParam === ESortParam.buy}
                sortDirection={sortDirection}
                sortParam={ESortParam.buy}
                onClickSort={SortTable}
              />
              <TPTableHead
                title="Profit"
                isActive={sortParam === ESortParam.profit}
                sortDirection={sortDirection}
                sortParam={ESortParam.profit}
                onClickSort={SortTable}
              />
              <TPTableHead
                title="ROI"
                isActive={sortParam === ESortParam.ROI}
                sortDirection={sortDirection}
                sortParam={ESortParam.ROI}
                onClickSort={SortTable}
              />
              <TPTableHead
                title="Supply"
                isActive={sortParam === ESortParam.supply}
                sortDirection={sortDirection}
                sortParam={ESortParam.supply}
                onClickSort={SortTable}
              />
              <TPTableHead
                title="Demand"
                isActive={sortParam === ESortParam.demand}
                sortDirection={sortDirection}
                sortParam={ESortParam.demand}
                onClickSort={SortTable}
              />
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
