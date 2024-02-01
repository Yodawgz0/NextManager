import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Input, InputNumber } from "antd";
import { Col, Row } from "antd";
import {
  FormOutlined,
  NumberOutlined,
  UserOutlined,
  LoadingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Table, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import EditTable from "@/components/EditTable";
import { ObjectId } from "bson";
import router from "next/router";
import FilterTable from "@/components/FilterTable";

axios.defaults.withCredentials = true;
export const spinnerIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not email!",
    number: "${label} is not number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

export interface DataType {
  _id?: ObjectId;
  GAME_ID: number;
  SHOT_NUMBER: number;
  PERIOD: number;
  SHOT_RESULT: string;
  CLOSEST_DEFENDER: string;
  PLAYER_NAME: string;
}

export default function Dashboard() {
  const [alertText, setAlertText] = useState<string>("");
  const [playerData, setPlayerData] = useState<DataType[]>([]);
  const [deletingSpinner, setDeletingSpinner] = useState<boolean>(false);
  const [editPlayerModal, setEditPlayerModal] = useState<boolean>(false);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [signOutLoad, setSignOutLoad] = useState<boolean>(false);

  const [dataPlayerEdit, setDataPlayerEdit] = useState<DataType>({
    GAME_ID: 0,
    SHOT_NUMBER: 0,
    SHOT_RESULT: "",
    PLAYER_NAME: "",
    CLOSEST_DEFENDER: "",
    PERIOD: 0,
  });

  const [form] = Form.useForm();

  const handleSingOut = () => {
    setSignOutLoad(true);
    axios
      .get("http://localhost:8000/userSignOut")
      .then((response) => {
        const socket = new WebSocket("ws://localhost:7000");
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.close();
        }
        router.push("/LoginPage");
      })
      .catch((error) => {
        try {
          setAlertText(error.data.message);
        } catch {}
        setSignOutLoad(false);
      });
  };

  const onFinish = (values: any) => {
    const userDetails = {
      GAME_ID: values.GameID,
      SHOT_NUMBER: values.ShotNo,
      PERIOD: values.Period,
      SHOT_RESULT: values.ShotResult,
      CLOSEST_DEFENDER: values.ClosestDefender,
      PTS: values.PTS,
      PLAYER_NAME: values.PlayerName,
    };
    axios
      .post("http://localhost:8000/playerData", {
        userDetails,
      })
      .then(function (response) {
        setAlertText(response.data.message);
        getPlayerData();
      })
      .catch(function (error) {
        setAlertText(error.data.message);
      });
    form.resetFields();
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Player Name",
      dataIndex: "PLAYER_NAME",
    },
    {
      title: "Shot Number",
      dataIndex: "SHOT_NUMBER",
    },
    {
      title: "Period",
      dataIndex: "PERIOD",
    },
    {
      title: "Shot Result",
      dataIndex: "SHOT_RESULT",
    },
    {
      title: "Closest Defender",
      dataIndex: "CLOSEST_DEFENDER",
    },
    {
      title: "Actions",
      key: "operation",
      render: (_, record) => renderActions(record),
    },
  ];
  const deletePlayerData = (record: DataType) => {
    setDeletingSpinner(true);
    axios
      .delete(
        `http://localhost:8000/deletePlayerData/${record.CLOSEST_DEFENDER}&${record.PLAYER_NAME}&${record._id}`
      )
      .then(function (response) {
        setAlertText(response.data.message);
        getPlayerData();
      })
      .catch(function (error) {
        setAlertText(error.data.message);
        if (error.data.message == "Unauthorized") {
          const socket = new WebSocket("ws://localhost:7000");
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.close();
          }
          router.push("/LoginPage");
        }
      });

    setDeletingSpinner(false);
  };
  const renderActions = (record: DataType) => {
    return (
      <>
        <a
          onClick={() => {
            setEditPlayerModal(true);
            setDataPlayerEdit(record);
          }}
          className="text-blue-500"
        >
          Edit
        </a>
        {deletingSpinner ? (
          <Spin size="small" />
        ) : (
          <a
            onClick={() => deletePlayerData(record)}
            className="mx-3 text-red-600"
          >
            Delete
          </a>
        )}
      </>
    );
  };

  const getPlayerData = () => {
    setTableLoading(true);
    axios
      .get(`http://localhost:8000/AllPlayerData/`)
      .then((data) => {
        setPlayerData(data.data.data);
        setTableLoading(false);
        getUserData();
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
  };

  const getUserData = () => {
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
  };

  useEffect(() => {
    getPlayerData();
    // Check if the WebSocket connection is open
    const socket = new WebSocket("ws://localhost:7000");
    if (socket.readyState === WebSocket.OPEN) {
      console.log("WebSocket connection is already open.");
    } else {
      socket.addEventListener("open", (event) => {
        console.log("WebSocket connection opened", event);
      });

      socket.addEventListener("message", (event) => {
        console.log("Received message:", event.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {editPlayerModal ? (
        <EditTable
          openModal={editPlayerModal}
          setopenModal={setEditPlayerModal}
          dataPlayerEdit={dataPlayerEdit}
          setAlertText={setAlertText}
          getPlayerData={getPlayerData}
        />
      ) : (
        <></>
      )}
      <div className="bg-slate-950 h-screen flex flex-col items-center justify-center">
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <Button
              type="primary"
              className="text-green-950 bg-green-200 ms-4 mb-5 w-40 "
              onClick={() => router.push("/UploadPage")}
            >
              Upload Documents
            </Button>
            <Button
              type="primary"
              className="text-green-950 bg-fuchsia-400 ms-4 mb-10 w-40 "
              onClick={() => router.push("/Chatarea")}
            >
              Chat People?
            </Button>
          </div>

          <Button
            type="primary"
            className="text-rose-950 bg-rose-200 me-4 mb-10 w-40 "
            loading={signOutLoad}
            onClick={() => handleSingOut()}
          >
            <LogoutOutlined style={{ fontSize: 20 }} />
            Sign Out
          </Button>
        </div>

        <h2 className="text-sky-400 mb-10 text-4xl">
          Welcome at the grind!{" "}
          {userName.length ? userName : <Spin indicator={spinnerIcon} />}
        </h2>
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 700 }}
          validateMessages={validateMessages}
          className="bg-slate-100 p-11 w-screen border-solid border-2 rounded-2xl flex-col border-red-500"
        >
          <Row>
            <Col span={24}>
              {" "}
              <Form.Item
                name="PlayerName"
                rules={[
                  { required: true, message: "Please input Player Name!" },
                ]}
              >
                <Input
                  style={{ width: "140%" }}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Player Name"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name={["GameID"]}
                rules={[{ required: true, type: "number", min: 0 }]}
              >
                <InputNumber
                  style={{ width: "133%" }}
                  prefix={<NumberOutlined className="site-form-item-icon" />}
                  placeholder="Game ID"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={["ShotNo"]}
                rules={[{ required: true, type: "number" }]}
              >
                <InputNumber
                  style={{ width: "133%" }}
                  prefix={<NumberOutlined className="site-form-item-icon" />}
                  placeholder="Shot Number"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name={["Period"]}
                rules={[{ required: true, type: "number", min: 0 }]}
              >
                <InputNumber
                  style={{ width: "133%" }}
                  prefix={<NumberOutlined className="site-form-item-icon" />}
                  placeholder="Period"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item name={["ShotResult"]} rules={[{ required: true }]}>
                <Input
                  style={{ width: "133%" }}
                  prefix={<FormOutlined className="site-form-item-icon" />}
                  placeholder="Shot Result"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {" "}
              <Form.Item
                name={["ClosestDefender"]}
                rules={[{ required: true }]}
              >
                <Input
                  style={{ width: "140%" }}
                  prefix={<FormOutlined className="site-form-item-icon" />}
                  placeholder="Closest Defender"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button
              type="primary"
              className="bg-amber-950 w-96"
              htmlType="submit"
            >
              Post Player Data
            </Button>
          </Form.Item>
        </Form>
      </div>
      <FilterTable setPlayerData={setPlayerData} playerData={playerData} />
      <Table
        loading={tableLoading}
        className="p-11 bg-amber-100"
        columns={columns}
        dataSource={playerData}
        size="small"
      />
    </>
  );
}
