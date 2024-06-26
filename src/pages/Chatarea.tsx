import React, { useEffect } from "react";
import { Input } from "antd";
import WebSocket from "ws";
// import { SearchProps } from "antd/es/input/Search";
import { ArrowLeftOutlined } from "@ant-design/icons";
import router from "next/router";
const { Search } = Input;
import { config } from "dotenv";
config();
const ServerUrl = process.env["SERVER_URL"];

const Chatarea: React.FC = () => {
  const socket = new WebSocket("ws://" + ServerUrl + ":7000");
  const onExitChat = () => {
    router.push("/Dashboard");
    socket.addEventListener("close", (event) => {
      console.log("WebSocket connection closed", event);
    });
    return () => {
      socket.close();
    };
  };
  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log("WebSocket connection is already open");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className=" h-screen bg-[#0e151b] p-5">
      <div className="flex flex-row h-[99%] bg-[#111b21]">
        <div className="w-1/4 border-r-2 border-gray-600">
          <div className="bg-[#222e35] text-white text-center py-4 flex flex-col">
            <div className="float-left ml-3">
              <ArrowLeftOutlined
                className="float-left text-lg cursor-pointer"
                onClick={() => onExitChat()}
              />
            </div>
            <p className="before:absolute before:content-[''] before:-translate-x-4 before:translate-y-2 before:h-2 before:w-2 before:bg-green-400 before:rounded-full">
              Online People
            </p>
          </div>
          <div className="flex justify-center mt-3">
            <Search
              placeholder="Search Chat..."
              className=" bg-white rounded-lg"
              allowClear
              style={{ width: 200 }}
            />
          </div>
          <hr className="mt-3" />
        </div>
        <div className="text-white font-mono text-3xl text-center flex justify-center flex-col w-full">
          <p>Click on Chat!</p>
        </div>
      </div>
    </div>
  );
};

export default Chatarea;
