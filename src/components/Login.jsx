import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./StyleLogin.css";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const handleLogin = async () => {
    const usernameElement = document.getElementById("Username");
    const passwordElement = document.getElementById("Password");
  
    if (usernameElement && passwordElement) {
      const user = usernameElement.value;
      const password = passwordElement.value;
  
      try {
        const response = await fetch(`http://localhost:3000/getLogin?username=${user}&password=${password}`);
  
        if (response.ok) {
          const data = await response.json();
          console.log('Login successful', data);
  
          
          if (data && data.length > 0) {
            navigate('/Page1'); 
          } else {
            console.error('Login failed');
            alert('Invalid username or password');
          }
        } else {
          console.error('Login failed');
          alert('Invalid username or password');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    } else {
      console.error('Username or password element not found');
    }
  };
  

  return (
    <div className="ALL">
      <div className="BB">
        <div className="formLogin">
          <div className="row">
            <div className="col-6">
              <div className="SS"></div>
            </div>
            <div className="col-6">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input your Username!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    id="Username"
                    onChange={(e) => setUser(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    id="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
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
  );
}

export default Login;
