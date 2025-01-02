import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import {
  getAllTradingPostItemIds,
  getTradableItemsInRange,
} from "../Utils/API";
import { TTPItem } from "../Utils/types";
import { ChangeEvent, useState } from "react";
import TPTableHead from "../Components/TradingPost/TPTableHead";
import TPItemListingComponent from "../Components/TradingPost/TPItemListingComponent";
import Navbar from "../Components/NavBar/Navbar";
import "../CSS/global.css";

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

export const Route = createFileRoute("/TradingPost/")({
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
      ESortDirection.up
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

function TradingPostComponent() {
  const { ids, items } = useLoaderData({ from: "/TradingPost/" });
  const [tpItems, setTpItems] = useState<TTPItem[]>(items);
  const [sortParam, setSortParam] = useState<ESortParam>(ESortParam.demand);
  const [sortDirection, setSortDirection] = useState<ESortDirection>(
    ESortDirection.up
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [inputPage, setInputPage] = useState<number>(1);
  const [showGoButton, setShowGoButton] = useState<boolean>(false);
  const itemsPerPage = 50;
  const maxPage = Math.floor(ids.length / itemsPerPage);

  const SortTable = async (direction: ESortDirection, sort: ESortParam) => {
    setSortDirection(direction);
    setSortParam(sort);
    setCurrentPage(0);
    await getNewItems(currentPage, sort, direction);
  };

  const changePage = (addPage: boolean) => {
    let page = currentPage + (addPage ? 1 : -1);
    if (page < 0) page = maxPage;
    if (page > maxPage) page = 0;
    setCurrentPage(page);
    return page;
  };
  const handlePageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const page = parseInt(e.target.value, 10);
    if (page >= 1 && page <= maxPage + 1) {
      setInputPage(page);
      setCurrentPage(page - 1);
      setShowGoButton(page !== currentPage + 1);
    }
  };

  const handlePageConfirm = () => {
    setCurrentPage(currentPage);
    getNewItems(currentPage, sortParam, sortDirection);
    setShowGoButton(false);
  };

  const getNewItems = async (
    page: number,
    sParam: ESortParam,
    sDirection: ESortDirection
  ) => {
    const newItems = await getTradableItemsInRange(
      page * itemsPerPage,
      itemsPerPage,
      sParam,
      sDirection
    );
    if (newItems === null) {
      console.log("new items was null");
      return;
    }
    setTpItems(newItems);
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-4">Trading Post</h3>
          <div className="flex flex-col sm:flex-row justify-between mb-4">
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300 mb-2 sm:mb-0"
              onClick={() =>
                getNewItems(changePage(false), sortParam, sortDirection)
              }
            >
              Previous
            </button>
            <div className="flex items-center mb-2 sm:mb-0">
              <input
                type="number"
                min="1"
                max={maxPage + 1}
                value={inputPage}
                onChange={handlePageInputChange}
                className="px-4 py-2 bg-gray-700 text-white text-center w-20 rounded-l-md focus:outline-none focus:ring-0"
                style={{ MozAppearance: "textfield", WebkitAppearance: "none" }}
              />
              <span
                className={`px-4 py-2 bg-gray-700 text-white ${!showGoButton ? "rounded-r-md" : ""}`}
              >
                / {maxPage + 1}
              </span>
              {showGoButton && (
                <button
                  className="px-4 py-2 bg-gray-700 text-white rounded-r-md hover:bg-gray-600 transition duration-300"
                  onClick={handlePageConfirm}
                >
                  Go
                </button>
              )}
            </div>
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300"
              onClick={() =>
                getNewItems(changePage(true), sortParam, sortDirection)
              }
            >
              Next
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-700 rounded-md">
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
                </tr>
              </thead>
              <tbody>
                {tpItems.map((item, index) => (
                  <TPItemListingComponent
                    key={item.name + index}
                    item={item}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
