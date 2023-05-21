import React from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";

export default function LoginPage() {
  const onFinish = (values: any) => {
    axios
      .post("http://localhost:8000/login", {
        values,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="backGroundImage bg-cover bg-center flex items-start  justify-around flex-col h-screen">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          className="p-14 border-solid border-2 ms-11 border-red-500 rounded-2xl text-cyan-50 bg-gray-00"
        >
          <Form.Item
            name="email"
            className=" flex justify-around"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              className="w-64"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            className=" flex  justify-around"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              className="w-64"
              prefix={<LockOutlined className="site-form-item-icon" />}
              minLength={8}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item className="w-44 flex items-center flex-col mx-10 justify-around">
            {/* <Link href="/Dashboard">
              <Button
                htmlType="submit"
                className="px-10 bg-amber-950 text-white"
              >
                Login
              </Button>
            </Link> */}
            <Button htmlType="submit" className="px-10 bg-amber-950 text-white">
              Login
            </Button>
          </Form.Item>
          <Link
            className=" flex justify-around text-rose-700"
            href="/RegisterPage"
          >
            Don't have an account? Register
          </Link>
        </Form>
      </div>
    </>
  );
}
