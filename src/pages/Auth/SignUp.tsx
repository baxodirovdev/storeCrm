import React, { ChangeEvent, useState } from "react";

import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import "../../styles/Auth.css";
import { Link } from "react-router-dom";
import { signUp } from "../../redux/actions/UserAction";

export const SignUp = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirm: "",
  });
  const dispatch = useDispatch();

  const onChangeHandler = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      setState({
        ...state,
        [target.name]: target.value,
      });
    }
  };

  const onFinish = (values: { email: string; password: string }) => {
    dispatch(signUp(values.email, values.password));
  };

  const onFinishFailed = (errorInfo: any) => {
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
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          name="confirm"
          onChange={onChangeHandler}
          value={state.confirm}
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
          Already have an account ? <Link to="/">Login</Link>{" "}
        </p>
      </div>
    </Form>
  );
};
