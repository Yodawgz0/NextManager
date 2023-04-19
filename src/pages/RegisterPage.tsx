import React from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { FormOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

export default function RegisterPage() {
  const onFinish = (values: any) => {
    fetch("http://localhost:8000/signup", {
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
          className="p-14 border-solid border-2 ms-11 border-red-500 rounded-2xl text-cyan-50 bg-gray-300"
        >
          <Form.Item
            name={["user", "email"]}
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              className="w-64"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item name={["user", "firstname"]} rules={[{ required: true }]}>
            <Input
              className="w-64"
              prefix={<FormOutlined className="site-form-item-icon" />}
              placeholder="First Name"
            />
          </Form.Item>
          <Form.Item name={["user", "lastname"]} rules={[{ required: true }]}>
            <Input
              className="w-64"
              prefix={<FormOutlined className="site-form-item-icon" />}
              placeholder="Last Name"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              className="w-64"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item className="flex items-center justify-around">
            <Button htmlType="submit" className="px-10 bg-amber-950 text-white">
              Register
            </Button>
          </Form.Item>
          <Link
            className=" flex justify-around text-rose-700"
            href="/LoginPage"
          >
            Already have an account? Login
          </Link>
        </Form>
      </div>
    </>
  );
}
