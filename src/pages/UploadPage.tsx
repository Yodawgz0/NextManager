import React, { useCallback, useEffect, useState } from "react";
import {
  InboxOutlined,
  LogoutOutlined,
  SwapLeftOutlined,
} from "@ant-design/icons";
import { Alert, Button, Spin, UploadProps } from "antd";
import { message, Upload } from "antd";
import axios from "axios";
import router from "next/router";
import { spinnerIcon } from "./Dashboard";
import ViewFiles from "@/components/ViewFiles";

const { Dragger } = Upload;
axios.defaults.withCredentials = true;

export default function UploadPage() {
  const [userName, setUserName] = useState<string>("");
  const [alertText, setAlertText] = useState<string>("");
  const [signOutLoad, setSignOutLoad] = useState<boolean>(false);

  const [renderTrigg, setRenderTrigg] = useState<boolean>(false);
  const MemoizedViewFiles = useCallback(() => {
    return <ViewFiles />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderTrigg]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/getUsername`)
      .then((data) => {
        setUserName(data.data.message);
      })
      .catch((err) => {
        try {
          if (err.response.data.message === "Unauthorized") {
            router.push("/LoginPage");
            setAlertText("Please Login, Unauthorized Page!");
          } else {
            setAlertText("Server Problem , Please retry in a while!");
          }
        } catch {
          setAlertText("Unable to reach servers!");
        }
      });
  }, []);

  const handleSingOut = () => {
    setSignOutLoad(true);
    axios
      .get("http://localhost:8000/userSignOut")
      .then((response) => {
        router.push("/LoginPage");
      })
      .catch((error) => {
        setAlertText(error.data.message);
        setSignOutLoad(false);
      });
  };

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "http://localhost:8000/uploadfile",
    withCredentials: true,
    onChange(info) {
      console.log(info);
      const { status } = info.file;
      console.log(status);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setRenderTrigg(!renderTrigg);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    onRemove(file) {
      axios
        .delete(`http://localhost:8000/deleteFile/${file.name}`)
        .then((res) => {
          message.success(`${file.name} ${res.data.message}`);
          setRenderTrigg(!renderTrigg);
        })
        .catch((err) => {
          message.error(`${file.name} ${err.message}`);
        });
    },
  };

  return (
    <>
      {alertText.length ? (
        <div className="z-10 fixed p-7 ml-24">
          <Alert
            description={alertText}
            type="info"
            showIcon
            closable
            afterClose={() => setAlertText("")}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="h-screen bg-slate-900 flex flex-col justify-center items-center">
        <div className="w-full flex justify-between">
          <Button
            type="primary"
            className="text-green-950 bg-red-200 ms-4 mb-20 "
            onClick={() => router.push("/Dashboard")}
          >
            <SwapLeftOutlined style={{ fontSize: 30 }} /> Back
          </Button>
          <Button
            type="primary"
            className="text-rose-950 bg-rose-200 me-4 mb-10 w-40 "
            loading={signOutLoad}
            onClick={() => handleSingOut()}
          >
            Sign Out
            <LogoutOutlined style={{ fontSize: 20 }} />
          </Button>
        </div>
        <div className="w-full text-center">
          <h3 className="mb-10 text-cyan-100 text-3xl ms-4 text-b">
            Upload your files here!
            {userName.length ? userName : <Spin indicator={spinnerIcon} />}
          </h3>
        </div>
        <div className=" w-3/5 p-10 rounded-lg border-solid">
          <div className="bg-violet-300 p-4">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </div>
        </div>
        <MemoizedViewFiles />
      </div>
    </>
  );
}
