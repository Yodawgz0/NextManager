import React, { useEffect, useState } from "react";
import { Select, message } from "antd";
import axios from "axios";
import { DataType } from "@/pages/Dashboard";
import { ClearOutlined } from "@ant-design/icons";
import { config } from "dotenv";
config();

const ServerUrl = process.env["SERVER_URL"];

axios.defaults.withCredentials = true;

interface Ifilterprops {
  setPlayerData: React.Dispatch<React.SetStateAction<DataType[]>>;
  playerData: DataType[];
}

function FilterTable({ setPlayerData, playerData }: Ifilterprops) {
  const [loadingSearchName, setLoadingSearchName] = useState<boolean>(false);
  const [playeNameFilter, setPlayeNameFilter] = useState<string>("");
  const [shotMadeFilter, setShotMadeFilter] = useState<string>("");

  const handlePlayerNameChange = (value: string) => {
    setPlayeNameFilter(value);
    axios
      .get(
        `${ServerUrl}:8000/playerDataFilter/${
          shotMadeFilter
            ? `PLAYERNAME:${value}&SHOTRESULT:${shotMadeFilter}`
            : `PLAYERNAME:${value}&SHOTRESULT:`
        }`
      )
      .then((res) => setPlayerData(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleShotResultChange = (value: string) => {
    setShotMadeFilter(value);
    axios
      .get(
        `${ServerUrl}:8000/playerDataFilter/${
          playeNameFilter
            ? `PLAYERNAME:${playeNameFilter}&SHOTRESULT:${value}`
            : `PLAYERNAME:&SHOTRESULT:${value}`
        }`
      )
      .then((res) => setPlayerData(res.data.data))
      .catch((err) => console.log(err));
  };
  const [playerNamesUniq, setPlayerNamesUniq] = useState<
    { [key: string]: string }[]
  >([]);

  const getAllPlayerData = () => {
    axios
      .get(`${ServerUrl}:8000/AllPlayerData/`)
      .then((data) => {
        setPlayerData(data.data.data);
        message.success("Filters Cleared!`");
      })
      .catch((err) => {
        message.error("Something Went Wrong!");
        console.log(err);
      });
  };

  useEffect(() => {
    setLoadingSearchName(true);
    axios
      .get(ServerUrl + ":8000/playerDataFilter/getplayernames")
      .then((res) => {
        setPlayerNamesUniq(res.data.data[0].names);
        setLoadingSearchName(false);
      })
      .catch((err) => console.log(err));
  }, [playerData]);

  return (
    <>
      <div className="px-11 bg-amber-100 d-flex flex-row">
        <Select
          defaultValue="Choose Player Name..."
          onChange={handlePlayerNameChange}
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
          onChange={handleShotResultChange}
          className="mt-3 ms-5 w-64"
          options={[
            { value: "made", label: "Made" },
            { value: "missed", label: "Missed" },
          ]}
          value={shotMadeFilter ? shotMadeFilter : "Shot Made filter..."}
        />
        <ClearOutlined
          onClick={() => {
            setPlayeNameFilter("");
            setShotMadeFilter("");
            getAllPlayerData();
          }}
          className="ms-5 text-xl"
        />
      </div>
    </>
  );
}

export default FilterTable;
