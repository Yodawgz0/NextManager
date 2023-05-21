import React from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { FormOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const onFinish = (values: any) => {
    const userDetails = {
      email: values.user.email,
      firstname: values.user.firstname,
      lastname: values.user.lastname,
      password: values.password,
    };
    axios
      .post("http://localhost:8000/register", {
        userDetails,
      })
      .then(function (response) {
        console.log(response);
        router.push("/LoginPage");
      })
      .catch(function (error) {
        alert(error);
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
            rules={[
              { required: true, message: "Password is Required!" },
              { min: 8, message: "Password must be minimum 8 characters." },
            ]}
          >
            <Input
              className="w-64"
              minLength={8}
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
