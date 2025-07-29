import { Flex, Input } from "antd";
import "./Navbar.scss";
import { debounce } from "lodash";
const categories = ["phone", "laptop", "monitor"];

const Navbar = ({ handleChangeFilters, searchParams }) => {
  const debounceHandlerPrice = debounce(
    (key,value) => handleChangeFilters(key,value),
    800
  );

  return (
    <div className="navbar">
      <div className="category">
        {categories.map((categoria) => (
          <div
            key={categoria}
            className={`${
              searchParams.get("category") === categoria ? "active" : ""
            }`}
            onClick={() => handleChangeFilters("category", categoria)}
          >
            {categoria}
          </div>
        ))}
      </div>
      <div className="price_block">
        <h3 style={{ marginTop: "30px", marginBottom: "20px" }}>Price</h3>
        <Flex gap="middle">
          <Input
            onChange={(e) => debounceHandlerPrice("price_gte", e.target.value)}
            defaultValue={searchParams.get("price_gte")}
          />
          -
          <Input
            onChange={(e) => debounceHandlerPrice("price_lte", e.target.value)}
            defaultValue={searchParams.get("price_lte")}
          />
        </Flex>
      </div>
    </div>
  );
};

export default Navbar;
