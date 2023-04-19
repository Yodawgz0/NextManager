import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { Col, Row } from "antd";
import { FormOutlined, NumberOutlined, UserOutlined } from "@ant-design/icons";
import { Table, Divider } from "antd";
import type { ColumnsType } from "antd/es/table";

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
  const onFinish = (values: any) => {
    console.log(values);
  };

  const data: DataType[] = [
    {
      GAME_ID: 21400899,
      SHOT_NUMBER: 1,
      PERIOD: 1,
      SHOT_DIST: 7.7,
      PTS_TYPE: 2,
      SHOT_RESULT: "made",
      CLOSEST_DEFENDER: "Anderson, Alan",
      PTS: 2,
      player_name: "brian roberts",
    },
    {
      GAME_ID: 21400899,
      SHOT_NUMBER: 2,
      PERIOD: 1,
      SHOT_DIST: 28.2,
      PTS_TYPE: 3,
      SHOT_RESULT: "missed",
      CLOSEST_DEFENDER: "Bogdanovic, Bojan",
      PTS: 0,
      player_name: "brian roberts",
    },
    {
      GAME_ID: 21400899,
      SHOT_NUMBER: 3,
      PERIOD: 1,
      SHOT_DIST: 10.1,
      PTS_TYPE: 2,
      SHOT_RESULT: "missed",
      CLOSEST_DEFENDER: "Bogdanovic, Bojan",
      PTS: 0,
      player_name: "brian roberts",
    },
    {
      GAME_ID: 21400899,
      SHOT_NUMBER: 4,
      PERIOD: 2,
      SHOT_DIST: 17.2,
      PTS_TYPE: 2,
      SHOT_RESULT: "missed",
      CLOSEST_DEFENDER: "Brown, Markel",
      PTS: 0,
      player_name: "brian roberts",
    },
  ];
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
      title: "Shot Distance",
      dataIndex: "SHOT_DIST",
    },
    {
      title: "Shot Result",
      dataIndex: "SHOT_RESULT",
    },
    {
      title: "PTS Type",
      dataIndex: "PTS_TYPE",
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
                name="Player Name"
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
                name={["ID"]}
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
                name={["Shot No."]}
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
                name={["Closest Defender"]}
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
              <Form.Item name={["Points"]} rules={[{ required: true }]}>
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
