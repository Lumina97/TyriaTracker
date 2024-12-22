import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { ESortDirection, ESortParam } from "../../routes/TradingPost";

const TPTableHead = ({
  title,
  isActive,
  sortDirection,
  sortParam,
  onClickSort,
}: {
  title: string;
  isActive: boolean;
  sortDirection: ESortDirection;
  sortParam: ESortParam;
  onClickSort: (direction: ESortDirection, sortParam: ESortParam) => void;
}) => {
  return (
    <th className="border border-gray-700 border-l-0  py-2 ">
      <div className="flex justify-evenly gap-12>">
        {title}
        {sortParam !== ESortParam.none && (
          <div className="flex flex-shrink  flex-col gap-0">
            <FontAwesomeIcon
              icon={faSortUp}
              onClick={() => {
                onClickSort(ESortDirection.up, sortParam);
              }}
              className={`flex-shrink hover:scale-125 ${isActive && sortDirection === ESortDirection.up && "text-cyan-300"}`}
            />
            <FontAwesomeIcon
              icon={faSortDown}
              onClick={() => {
                onClickSort(ESortDirection.down, sortParam);
              }}
              className={`flex-shrink hover:scale-125 ${isActive && sortDirection === ESortDirection.down && "text-cyan-300"}`}
            />
          </div>
        )}
      </div>
    </th>
  );
};

export default TPTableHead;
