import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import axios from "axios";
import { DataType } from "@/pages/Dashboard";
const { Search } = Input;
axios.defaults.withCredentials = true;

interface Ifilterprops {
  setPlayerData: React.Dispatch<React.SetStateAction<DataType[]>>;
  playerData: DataType[];
}

function FilterTable({ setPlayerData, playerData }: Ifilterprops) {
  const [loadingSearchName, setLoadingSearchName] = useState<boolean>(false);
  const handleChange = (value: string) => {
    axios
      .get(`http://localhost:8000/playerDataFilter/filter:${value}`)
      .then((res) => setPlayerData(res.data.data));
  };

  const [playerNamesUniq, setPlayerNamesUniq] = useState<
    { [key: string]: string }[]
  >([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/playerDataFilter/getplayernames")
      .then((res) => setPlayerNamesUniq(res.data.data[0].names));
  }, [playerData]);

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
          value={playeNameFilter ? playeNameFilter : "Choose Player Name..."}
          loading={loadingSearchName}
        />
        <Select
          defaultValue="Shot Made filter..."
          onChange={handleShotMadeChange}
          className="mt-3 ms-5 w-64"
          options={[
            { value: "made", label: "Made" },
            { value: "missed", label: "Missed" },
          ]}
        />
        <ClearOutlined
          onClick={() => {
            setPlayeNameFilter("");
            setShotMadeFilter("");
          }}
          className="ms-5 text-xl"
        />
      </div>
    </>
  );
}

export default FilterTable;
