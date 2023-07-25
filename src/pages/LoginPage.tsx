import React, { useState } from "react";
import { Alert, Button, Form, Input } from "antd";
import Link from "next/link";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";

axios.defaults.withCredentials = true;

export default function LoginPage() {
  const router = useRouter();
  const [alertText, setAlertText] = useState<string>("");
  const [showLoad, setShowLoad] = useState<boolean>(false);
  const onFinish = (values: any) => {
    setShowLoad(true);
    const userDetails = {
      email: values.email,
      password: values.password,
    };

    axios
      .post("http://localhost:8000/login", {
        userDetails,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.message === "Login Successful") {
          router.push("/Dashboard");
        }
      })
      .catch(function (error) {
        try {
          if (error.response.data.message === "User Not Found") {
            setAlertText("User Not Found");
          } else if (error.response.data.message === "Wrong Password") setAlertText("Wrong Password");
        } catch {
          setAlertText("Something went wrong! ");
        }
        setShowLoad(false);
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {alertText.length ? (
        <div className="z-10 fixed p-7 ml-24">
          <Alert
            message="Error"
            description={alertText}
            type="error"
            showIcon
            closable
            afterClose={() => setAlertText("")}
          />
        </div>
      ) : (
        <></>
      )}

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
            rules={[{ required: true, message: "Email is required!" }]}
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
            rules={[
              { required: true, message: "Password is required!" },
              { min: 8, message: "Password must be minimum 8 characters." },
            ]}
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
            <Button
              htmlType="submit"
              className="px-10  bg-amber-950 text-white"
              loading={showLoad}
            >
              Login
            </Button>
          </Form.Item>
          <Link
            className=" flex justify-around text-rose-700"
            href="/RegisterPage"
          >
            Donot have an account? Register
          </Link>
        </Form>
      </div>
    </>
  );
}
