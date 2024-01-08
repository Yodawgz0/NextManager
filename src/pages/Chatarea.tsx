import React, { useEffect } from "react";
import { Input } from "antd";
import { SearchProps } from "antd/es/input/Search";
const { Search } = Input;

const Chatarea: React.FC = () => {
  useEffect(() => {
    // Replace the URL with the actual WebSocket server URL
    const socket = new WebSocket("ws://localhost:7000");

    // Connection opened
    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened", event);
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      console.log("Received message:", event.data);
    });

    // Connection closed
    socket.addEventListener("close", (event) => {
      console.log("WebSocket connection closed", event);
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);
  return (
    <>
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
    </>
  );
};

export default Chatarea;
