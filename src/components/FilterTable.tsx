import React, { useState } from "react";
import { Input, Select } from "antd";
const { Search } = Input;

function FilterTable() {
  const [loadingSearchName, setLoadingSearchName] = useState<boolean>(false);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <div className="px-11 bg-amber-100 d-flex flex-row">
        <Search
          className=" bg-violet-950 mt-3 rounded-lg"
          placeholder="input search text"
          enterButton="Search"
          size="large"
          loading={loadingSearchName}
        />
        <Select
          defaultValue="lucy"
          onChange={handleChange}
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "disabled", label: "Disabled", disabled: true },
          ]}
        />
      </div>
    </>
  );
}

export default FilterTable;
