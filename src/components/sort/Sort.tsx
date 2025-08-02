import { ISearchParamsProps } from "../../types/types";
import "./Sort.css";


const Sort: React.FC<ISearchParamsProps> = ({ handleChangeFilters, searchParams}) => {
  const selectedSort = searchParams.get("_order");
  return (
    <div className="sort">
      <span>Sort by price: </span>
      <span
        onClick={() => handleChangeFilters("_order", "asc")}
        className={`${selectedSort === "asc" ? "sort-active" : ""}`}
      >
        By ascending
      </span>
      <span
        onClick={() => handleChangeFilters("_order", "desc")}
        className={`${selectedSort === "desc" ? "sort-active" : ""}`}
      >
        By descending
      </span>
    </div>
  );
};

export default Sort;
