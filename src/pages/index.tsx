import { Inter } from "next/font/google";
import React from "react";
import { Button, Space } from "antd";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="backGroundImage bg-cover bg-center flex items-start  justify-around flex-col h-screen">
        <Space
          direction="vertical"
          style={{ width: "20%", marginLeft: "5rem" }}
          className="flex"
        >
          <Link href="/LoginPage">
            <Button className="m-4" block name="Login" type="primary" ghost>
              Login
            </Button>
          </Link>
          <Link href="/RegisterPage">
            <Button className="m-4" name="Register" block danger>
              Register
            </Button>
          </Link>
        </Space>
      </div>
    </>
  );
}
