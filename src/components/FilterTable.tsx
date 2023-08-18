import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import axios from "axios";
const { Search } = Input;
axios.defaults.withCredentials = true;
function FilterTable() {
  const [loadingSearchName, setLoadingSearchName] = useState<boolean>(false);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const [playerNamesUniq, setPlayerNamesUniq] = useState<
    { [key: string]: string }[]
  >([]);

  useEffect(() => {
    // axios
    //   .get("http://localhost:8000/playerDataFilter")
    //   .then((res) => console.log(res));
    axios
      .get("http://localhost:8000/playerDataFilter/getplayernames")
      .then((res) => setPlayerNamesUniq(res.data.data[0].names));
  }, []);

  return (
    <>
      <div className="px-11 bg-amber-100 d-flex flex-row">
        <Search
          className=" bg-violet-950 mt-3 rounded-lg w-96"
          placeholder="input search text"
          enterButton="Search"
          loading={loadingSearchName}
        />
        <Select
          defaultValue="Please choose one..."
          onChange={handleChange}
          className="mt-3 ms-5 w-64"
          options={playerNamesUniq.map((item) => ({
            value: item,
            label: item,
          }))}
        />
      </div>
    </>
  );
}

export default FilterTable;
