import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { getAllTradingPostItems } from "../Utils/API";
import { TTPItem } from "../Utils/types";
import TPPriceComponent from "../Components/TradingPost/TPPriceComponent";

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

const calculateROIForItem = (item: TTPItem) => {
  if (
    item === null ||
    item.LatestPrice.buyPrice === 0 ||
    item.LatestPrice.sellPrice === 0
  )
    return "0";
  const itemProfit = calculateProfit(item);
  const ROI = (itemProfit / item.LatestPrice.buyPrice) * 100;
  return ROI.toFixed(0);
};

const calculateProfit = (item: TTPItem) => {
  if (item === null) return 0;
  const preFeeProfit = item.LatestPrice.sellPrice - item.LatestPrice.buyPrice;
  const listFeeProfit = preFeeProfit - preFeeProfit * listingFeePercentage;
  const exchangeFreeProfit =
    listFeeProfit - listFeeProfit * exchangeFreePercentage;
  return exchangeFreeProfit;
};

function TradingPostComponent() {
  const { tpItems } = useLoaderData({ from: "/TradingPost" });
  const itemsPerPage = 50;
  let currentPage = 500;
  return (
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
            tpItems
              .slice(
                itemsPerPage * currentPage,
                itemsPerPage * currentPage + itemsPerPage
              )
              .map((item, index) => (
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
                      price={item.LatestPrice.sellPrice.toString()}
                    />
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-gray-300">
                    <TPPriceComponent
                      price={item.LatestPrice.buyPrice.toString()}
                    />
                  </td>
                  <td className="border border-gray-700 px-4 py-2 text-gray-300">
                    <TPPriceComponent
                      price={calculateProfit(item).toFixed(0)}
                    />
                  </td>
                  <td
                    className={`border border-gray-700 px-4 py-2 ${
                      calculateROIForItem(item).startsWith("-")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {calculateROIForItem(item)}%
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
