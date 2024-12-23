import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import {
  getAllTradingPostItemIds,
  getTradableItemsInRange,
} from "../Utils/API";
import { TTPItem } from "../Utils/types";
import { useState } from "react";
import TPTableHead from "../Components/TradingPost/TPTableHead";
import TPItemListingComponent from "../Components/TradingPost/TPItemListingComponent";

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
    <div className=" bg-sunset pt-8  pb-12">
      <div className="flex gap-4 pb-6 flex-row m-auto w-[90%]">
        <button
          className=" text-black w-[5rem] border-2 border-black"
          onClick={() => {
            getNewItems(changePage(false), sortParam, sortDirection);
          }}
        >
          Previous
        </button>
        <button
          className="w-[5rem]  text-black border-2 border-black"
          onClick={() => {
            getNewItems(changePage(true), sortParam, sortDirection);
          }}
        >
          Next
        </button>
        <div className="text-black">
          Page: {currentPage} / {maxPage}
        </div>
      </div>
      <div className="overflow-x-auto ">
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
                <TPItemListingComponent item={item} index={index} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
