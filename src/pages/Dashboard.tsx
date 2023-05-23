import React, { useState } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { Col, Row } from "antd";
import { FormOutlined, NumberOutlined, UserOutlined } from "@ant-design/icons";
import { Table, Divider } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";

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

interface DataType {
  GAME_ID: number;
  SHOT_NUMBER: number;
  PERIOD: number;
  SHOT_DIST: number;
  PTS_TYPE: number;
  SHOT_RESULT: string;
  CLOSEST_DEFENDER: string;
  PTS: number;
  player_name: string;
}

export default function Dashboard() {
  const [alertText, setAlertText] = useState<string>("");
  const onFinish = (values: any) => {
    console.log(values);
    const userDetails = {
      GAME_ID: values.GameID,
      SHOT_NUMBER: values.ShotNo,
      PERIOD: values.Period,
      SHOT_RESULT: values.ShotResult,
      CLOSEST_DEFENDER: values.ClosestDefender,
      PTS: values.PTS,
      player_name: values.PlayerName,
    };
    console.log(userDetails);
    // axios
    //   .post("http://localhost:8000/playerData", {
    //     userDetails,
    //   })
    //   .then(function (response) {
    //     console.log(response.data);
    //     if (response.data.message === "Login Successful") {
    //       setAlertText("User Added SuccessFully")
    //     }
    //   })
    //   .catch(function (error) {
    //     if (error.response.data.message === "User Not Found") {
    //       setAlertText("User Not Found");
    //     } else if (error.response.data.message === "Wrong Password") setAlertText("Wrong Password");
    //   });
  };

  const data: DataType[] = [];
  const columns: ColumnsType<DataType> = [
    {
      title: "Player Name",
      dataIndex: "player_name",
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
      title: "PTS",
      dataIndex: "PTS",
    },
    {
      title: "Closest Defender",
      dataIndex: "CLOSEST_DEFENDER",
    },
    {
      title: "Actions",
      key: "operation",
      render: () => renderActions(),
    },
  ];

  const renderActions = () => {
    return (
      <>
        <a className="text-blue-500">Edit</a>
        <a className="mx-3 text-red-600">Delete</a>
      </>
    );
  };

  return (
    <>
      <div className="bg-slate-950 h-screen flex items-center justify-center">
        {" "}
        <Form
          {...layout}
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
                className="mx-3"
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
              <Form.Item
                name={["PTS"]}
                className="mx-3"
                rules={[{ type: "number", required: true }]}
              >
                <InputNumber
                  style={{ width: "133%" }}
                  prefix={<NumberOutlined className="site-form-item-icon" />}
                  placeholder="PTS Type"
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
          <Row>
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
            <Col span={12}>
              {" "}
              <Form.Item
                name={["Points"]}
                rules={[{ required: true, type: "number" }]}
              >
                <InputNumber
                  prefix={<NumberOutlined className="site-form-item-icon" />}
                  className="w-64 mx-3"
                  placeholder="Points"
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
      <Table
        className="p-11 bg-amber-100"
        columns={columns}
        dataSource={data}
        size="small"
      />
    </>
  );
}
