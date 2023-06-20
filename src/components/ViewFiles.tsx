import { DeleteFilled } from "@ant-design/icons";
import { Skeleton, Spin, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
axios.defaults.withCredentials = true;

interface fileprops {
  _id: string;
  filename: string;
  uploadDate: string;
  content: string;
  filesize: string;
  downloadLink?: string;
}

export default function ViewFiles() {
  const [allFilesData, setAllFilesData] = useState<fileprops[]>([]);
  const [spinShow, setSpinShow] = useState<[boolean, number]>([false, 0]);
  const [noDataFlag, setNoDataFlag] = useState<boolean>(false);
  const [link, setLink] = useState<[string, string]>(["", ""]);
  const [linkFetchFlag, setLinkFetchFlag] = useState<[boolean, string]>([
    false,
    "",
  ]);

  const getAllFiles = () => {
    const tempallfilesdata: fileprops[] = [];
    axios
      .get("http://localhost:8000/getUploadedFiles")
      .then((res) => {
        if (res.data.length) {
          res.data.forEach((e: fileprops) => {
            tempallfilesdata.push(e);
          });
          setAllFilesData(tempallfilesdata);
          setSpinShow([false, 0]);
        } else {
          setNoDataFlag(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteFileHandler = (file: fileprops, index: number) => {
    setSpinShow([true, index]);
    axios
      .delete(`http://localhost:8000/deleteFile/${file.filename}`)
      .then((res) => {
        message.success(`${file.filename} ${res.data.message}`);
        getAllFiles();
      })
      .catch((err) => {
        message.error(`${file.filename} ${err.message}`);
        setSpinShow([false, 0]);
      });
  };

  const getFileDownloadLink = (filename: string) => {
    setLinkFetchFlag([true, filename]);
    axios
      .get(`http://localhost:8000/getFile/${filename}`, {
        responseType: "blob",
      })
      .then((res) =>
        setLink([
          URL.createObjectURL(new Blob([res.data], { type: "image/jpeg" })),
          filename,
        ])
      )
      //.then((res) => setLink(URL.createObjectURL(res.data)))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllFiles();
  }, []);

  return (
    <>
      <div className="w-2/3 bg-white rounded-lg">
        {allFilesData.length && !noDataFlag ? (
          allFilesData.map((element, index) => (
            <>
              <div
                key={index}
                className=" px-11 my-6 flex flex-row justify-between  text-yellow-950"
              >
                <div className="flex flex-row">
                  {element.filename}
                  <p className="ps-1 italic">
                    {"("}
                    {(parseInt(element.filesize) / (1024 * 1024))
                      .toString()
                      .slice(0, 3)}
                    {" MB)"}
                  </p>
                  {link[0].length && link[1] === element.filename ? (
                    <a
                      download={element.filename}
                      href={link[0]}
                      onClick={() => {
                        setLink(["", ""]);
                        setLinkFetchFlag([false, ""]);
                      }}
                      className="ms-2 text-red-700 italic"
                    >
                      Download!
                    </a>
                  ) : linkFetchFlag[0] &&
                    linkFetchFlag[1] === element.filename ? (
                    <Spin className="ms-2 text-lg" />
                  ) : (
                    <p
                      onClick={() => getFileDownloadLink(element.filename)}
                      className="ms-2 text-blue-700 italic cursor-pointer"
                    >
                      Get Link
                    </p>
                  )}
                </div>
                {spinShow[0] && spinShow[1] === index ? (
                  <Spin className="text-lg" />
                ) : (
                  <DeleteFilled
                    onClick={() => deleteFileHandler(element, index)}
                    className="text-lg hover:text-xl"
                  />
                )}
              </div>
            </>
          ))
        ) : (
          <></>
        )}
        {!allFilesData.length && !noDataFlag ? (
          <Skeleton
            title={false}
            paragraph={{ rows: 3, width: "70%" }}
            className="bg-white p-3 rounded-lg"
            active
          />
        ) : (
          <></>
        )}
        {noDataFlag ? (
          <h3 className="text-center p-5 text-red-950 text-lg">
            No files were found!
          </h3>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
