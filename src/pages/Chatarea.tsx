import React from "react";
import { Input } from "antd";
import { SearchProps } from "antd/es/input/Search";
const { Search } = Input;

function Chatarea() {
  return (
    <>
      <div className=" h-screen bg-[#0e151b] p-5">
        <div className="flex flex-row h-[99%] bg-[#111b21]">
          <div className="w-1/4 border-r-2 border-gray-600">
            <div className="bg-[#222e35] text-white text-center py-4">
              Online People
            </div>
            <div className="flex justify-center mt-3">
              <Search
                placeholder="search chat..."
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
}

export default Chatarea;
