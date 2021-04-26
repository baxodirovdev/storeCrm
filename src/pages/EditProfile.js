import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/actions/UserAction";

export const EditProfile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [userInfo, setUser] = useState({
    name: user.displayName || "",
    email: user.email,
    password: "",
    confirm: "",
    newPassword: "",
  });

  const onChangeHandler = (e) => {
    setUser({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const onFinish = (values) => {
    dispatch(updateProfile(values));
  };

  return (
    <Form
      className="editProfile"
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      initialValues={{
        name: userInfo.name,
        email: userInfo.email,
        password: "",
        confirm: "",
        newpassword: "",
      }}
    >
      <Form.Item name="name" label="Name">
        <Input name="name" value={userInfo.name} onChange={onChangeHandler} />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: "email",
          },
        ]}
      >
        <Input name="email" value={userInfo.email} onChange={onChangeHandler} />
      </Form.Item>

      {(user.email !== userInfo.email || userInfo.newPassword) && (
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              message: "Please input your password!",
              required: userInfo.email || userInfo.newPassword ? true : false,
            },
          ]}
          hasFeedback
        >
          <Input.Password
            name="password"
            value={userInfo.password}
            onChange={onChangeHandler}
          />
        </Form.Item>
      )}

      <Form.Item
        name="newPassword"
        label="New Password"
        rules={[
          {
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          name="newPassword"
          value={userInfo.newPassword}
          onChange={onChangeHandler}
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["newPassword"]}
        hasFeedback
        rules={[
          {
            required: userInfo.newPassword ? true : false,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
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
          value={userInfo.confirm}
          onChange={onChangeHandler}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 20,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
