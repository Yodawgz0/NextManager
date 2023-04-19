import React from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export default function LoginPage() {
  const onFinish = (values: any) => {
    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: values,
    });
    console.log("Success:", values);
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
            name="username"
            className=" flex justify-around"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              className="w-64"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
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
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item className="w-44 flex items-center flex-col mx-10 justify-around">
            <Link href="/Dashboard">
              <Button
                htmlType="submit"
                className="px-10 bg-amber-950 text-white"
              >
                Login
              </Button>
            </Link>
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
