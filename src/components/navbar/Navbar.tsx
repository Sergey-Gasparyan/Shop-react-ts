import { Flex, Form, Input, Select } from "antd";
import "./Navbar.scss";
import { debounce } from "lodash";
import { ISearchParamsProps } from "../../types/types";
import { useGetBrandsQuery } from "../../queryies/brandApi";

const categories = ["phone", "laptop", "monitor"];

const Navbar: React.FC<ISearchParamsProps> = ({
  handleChangeFilters,
  searchParams,
}) => {
  const debounceHandlerPrice = debounce(
    (key: string, value: string) => handleChangeFilters(key, value),
    800
  );

  const { data, error, isLoading } = useGetBrandsQuery();

 const options = data?.map((brand) => ({ label: brand, value: brand }));


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
      <div>
        {error ? (
          <h2 className="error">Error</h2>
        ) : (
          <>
            <h3>Brands</h3>
            <Form.Item layout="vertical">
              <Select onSelect={(value) => handleChangeFilters("q", value)} loading={isLoading} options={options} />
            </Form.Item>
          </>
        )}
      </div>
      <div className="price_block">
        <h3 className="price_block_price">Price</h3>
        <Flex gap="middle">
          <Input
            onChange={(e) => debounceHandlerPrice("price_gte", e.target.value)}
            defaultValue={searchParams.get("price_gte") || ""}
          />
          -
          <Input
            onChange={(e) => debounceHandlerPrice("price_lte", e.target.value)}
            defaultValue={searchParams.get("price_lte") || ""}
          />
        </Flex>
      </div>
    </div>
  );
};

export default Navbar;
