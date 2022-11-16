import { Button, Form, Input, message } from "antd";
import Card from "antd/lib/card/Card";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [pathName, setPathName] = useState("login");
  const [username, setUsername] = useState("");
  const [passwsord, setPassword] = useState("");
  useEffect(() => {
    console.log(window.location.pathname.split("/")[1]);
    if (window.location.pathname.split("/")[1] === "register") {
      setPathName("Registration");
    } else {
      setPathName("Login");
    }
  }, []);

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitClick = () => {
    var url = "";
    var payload = { username: username, password: passwsord };
    if (pathName === "Login") {
      url = "http://localhost:5000/api/users/login";
    } else {
      url = "http://localhost:5000/api/users/signup";
    }

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.ok) {
        res.json().then((val) => {
          console.log(val.info);
          message.success("User login successfully")
        });
        navigate("/league");
      } else {
        
        res.json().then((err) => {
          console.log(err);
          message.error(err.error)
        });
      }
    });
  };

  return (
    <div>
      <div className="row form-box" style={{display:"flex", justifyContent:"center", textAlign:"center"}}>
        {/* <legend className="form-legend">Generate Barcode</legend> */}
        <Card title={pathName} style={{width:"80%"}}>
          <br />
          <br />
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,

                message: "Enter Username",
              },
            ]}
          >
            <Input type="text" onChange={onUsernameChange} name="username" />
          </Form.Item>
          <br />
          <br />
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,

                message: "Enter Password",
              },
            ]}
          >
            <Input type="text" onChange={onPasswordChange} name="password" />
          </Form.Item>
          <br />
          <br />

          <Button onClick={onSubmitClick}>{pathName}</Button>
          <br />
          {pathName === "Login" && (
            <p>
              Not a user? <a href="/register">Register</a>
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Login;
