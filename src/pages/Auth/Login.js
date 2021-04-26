import React, { useState } from "react";

import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/actions/UserAction";
import "../../styles/Auth.css";
import { Link } from "react-router-dom";

export const Login = () => {
  const [state, setstate] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    setstate({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onFinish = (values) => {
    dispatch(signIn(values.email, values.password));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      layout="horizontal"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
            type: "email",
          },
        ]}
      >
        <Input name="email" onChange={onChangeHandler} value={state.email} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          name="password"
          onChange={onChangeHandler}
          value={state.password}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 24,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <div className="auth__link">
        <p>
          Need an account? <Link to="/signup">Sign Up</Link>{" "}
        </p>
      </div>
    </Form>
  );
};
