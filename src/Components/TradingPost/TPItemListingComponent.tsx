import TPPriceComponent from "./TPPriceComponent";
import { TTPItem } from "../../Utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWikipediaW } from "@fortawesome/free-brands-svg-icons";
import { wikiBaseURL } from "../../Utils/settings";
import { Link } from "@tanstack/react-router";

export const getItemColor = (item: TTPItem) => {
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

const TPItemListingComponent = ({
  item,
  index,
}: {
  item: TTPItem;
  index: number;
}) => {
  return (
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
        className={`border cursor-pointer border-gray-700 border-l-0 px-4 py-3  ${getItemColor(item)}`}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <Link
          to={`/TradingPost/${item.id}`}
          className=" h-full flex flex-row align-middle start gap-4"
        >
          {item.name}
          <FontAwesomeIcon
            onClick={(e) => {
              e.preventDefault();
              window.open(wikiBaseURL + item.name, "_blank");
            }}
            className="text-white self-center pt-[0.15rem] cursor-pointer"
            icon={faWikipediaW}
          />
        </Link>
      </td>
      <td className="border border-gray-700 px-4 py-2 text-gray-300">
        <TPPriceComponent
          price={
            item?.LatestPrice?.sellPrice
              ? item.LatestPrice.sellPrice.toString()
              : "No data"
          }
        />
      </td>
      <td className="border border-gray-700 px-4 py-2 text-gray-300">
        <TPPriceComponent
          price={
            item?.LatestPrice?.buyPrice
              ? item.LatestPrice.buyPrice.toString()
              : "No data"
          }
        />
      </td>
      <td className="border border-gray-700 px-4 py-2 text-gray-300">
        <TPPriceComponent
          price={
            item.LatestPrice?.profit
              ? item.LatestPrice.profit.toFixed(0)
              : "No data"
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
        {item.LatestPrice
          ? item.LatestPrice.supply!.toLocaleString("en-US")
          : Infinity}
      </td>
      <td className="border border-gray-700 px-4 py-2 text-gray-300">
        {item.LatestPrice
          ? item.LatestPrice.demand!.toLocaleString("en-US")
          : Infinity}
      </td>
    </tr>
  );
};

export default TPItemListingComponent;
