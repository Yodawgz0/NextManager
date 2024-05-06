import {
  CheckOutlined,
  DeleteFilled,
  EditOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Button, Modal, Skeleton, Spin, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { config } from "dotenv";
config();

const ServerUrl = process.env["SERVER_URL"];

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
  const [renameFlag, setRenameFlag] = useState<[boolean, string]>([false, ""]);
  const [renameSet, setRenameSet] = useState<string>("");
  const [linkFetchFlag, setLinkFetchFlag] = useState<[boolean, string]>([
    false,
    "",
  ]);
  const [previewButton, setPreviewButton] = useState<boolean>(false);

  const getAllFiles = () => {
    const tempallfilesdata: fileprops[] = [];
    axios
      .get(ServerUrl + ":8000/getUploadedFiles")
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
      .delete(`${ServerUrl}:8000/deleteFile/${file.filename}`)
      .then((res) => {
        message.success(`${file.filename} ${res.data.message}`);
        getAllFiles();
      })
      .catch((err) => {
        message.error(`${file.filename} ${err.message}`);
        setSpinShow([false, 0]);
      });
  };
  const handleRenameInput = (renameFilename: string, IDFile: String) => {
    setRenameFlag([false, ""]);
    axios
      .patch(`${ServerUrl}:8000/renamefile/${IDFile}&${renameFilename}`)
      .then((res) => {
        getAllFiles();
      })
      .catch((err) => console.log(err));
  };

  const getFileDownloadLink = (filename: string) => {
    setLinkFetchFlag([true, filename]);
    axios
      .get(`${ServerUrl}:8000/getFile/${filename}`, {
        responseType: "blob",
      })
      .then((res) =>
        setLink([URL.createObjectURL(new Blob([res.data])), filename])
      )
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
                  {renameFlag[0] && renameFlag[1] === element.filename ? (
                    <input
                      className="px-2 py-1 overflow-ellipsis"
                      placeholder={element.filename}
                      onChange={(e) => setRenameSet(e.target.value)}
                    />
                  ) : (
                    element.filename
                  )}
                  <p className="ps-1 italic">
                    {"("}
                    {(parseInt(element.filesize) / (1024 * 1024))
                      .toString()
                      .slice(0, 3)}
                    {" MB)"}
                  </p>
                  {renameFlag[0] && renameFlag[1] === element.filename ? (
                    <>
                      {renameSet.length ? (
                        <CheckOutlined
                          onClick={() =>
                            handleRenameInput(renameSet, element._id)
                          }
                          className="ms-1 mt-1"
                        />
                      ) : (
                        <></>
                      )}
                      <StopOutlined
                        onClick={() => {
                          setRenameFlag([false, ""]);
                          setRenameSet("");
                        }}
                        className="ms-1 mt-1"
                      />
                    </>
                  ) : (
                    <EditOutlined
                      onClick={() => setRenameFlag([true, element.filename])}
                      className="ms-1 mt-1"
                    />
                  )}
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
                  {link[0].length &&
                  link[1] === element.filename &&
                  element.filename.includes("mp4") ? (
                    <Button
                      className="ms-4 bottom-1 bg-teal-500 text-cyan-50"
                      onClick={() => setPreviewButton(true)}
                    >
                      Preview
                    </Button>
                  ) : (
                    <></>
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
      <Modal
        centered
        open={previewButton}
        onCancel={() => setPreviewButton(false)}
        footer={null}
        width={700}
      >
        <ReactPlayer controls={true} url={link[0]} />
      </Modal>
    </>
  );
}
