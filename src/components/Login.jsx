import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./StyleLogin.css";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // แก้ชื่อตัวแปรจาก Home เป็น navigate

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const handleLogin = async () => {
    if (user === "admin" && password === "123456") {
      // เมื่อเข้าสู่ระบบสำเร็จ ให้นำทางไปยังหน้า Home
      navigate("/Page1");
    }
  };

  return (
    <>
    <div className="ALL" >
     
        <div className="BB">
          <div class="formLogin">
            <div class="row">
              <div class="col-6">
                <div class="SS"></div>
              </div>
              <div class="col-6">
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="username"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    rules={[
                      {
                        required: true,
                        message: "Please input your Username!",
                      },
                    ]}
                  >
                    <Input
                      // style={{margin:'70px 0px 0px 400px',width:'400px'}}
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Username"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input
                      // style={{margin:'00px 0px 0px 400px',width:'400px'}}
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Form.Item
                  // style={{margin:'30px 0px 0px 400px',width:'400px'}}
                  >
                    <Button
                      style={{
                        fontSize: "20px",
                        width: "100px",
                        height: "50px",
                      }}
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      onClick={handleLogin}
                    >
                      Log in
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      
    </div>
    </>
  );
}

export default Login;
