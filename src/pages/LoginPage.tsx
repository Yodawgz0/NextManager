import React from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";

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
          className="p-14 border-solid border-2 ms-11 border-red-500 rounded-2xl text-cyan-50"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="flex items-center justify-around">
            <Link href="/Dashboard">
              <Button htmlType="submit" className="px-10">
                Login
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
