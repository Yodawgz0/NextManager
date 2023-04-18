import React from "react";
import { Button, Form, Input } from "antd";

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
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          className="p-14 border-solid border-2 ms-11 border-red-500 rounded-2xl text-cyan-50"
        >
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "firstname"]}
            label="First Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "lastname"]}
            label="Last Name"
            rules={[{ required: true }]}
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
            <Button htmlType="submit" className="px-10">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
