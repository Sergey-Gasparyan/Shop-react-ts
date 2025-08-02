import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { login, registration } from "../../redux/slices/registrtionSlice";
import { IUser } from "../../types/types";
import { Link } from "react-router-dom";

const Login = () => {
  const [openRegistration, setOpenRegistration] = useState(false);
  const { user, error } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (error === "User already register") {
      setOpenRegistration(false);
      form.resetFields();
    }
  }, [error]);

  async function handleFinish(values: IUser) {
    if (values.phone) {
      dispatch(registration(values));
    } else {
      dispatch(login(values));
    }
  }

  return (
    <div style={{ marginTop: "30px" }}>
      {error && <h2 style={{ marginBottom: "10px", color: "red" }}>{error}</h2>}
      {user ? (
        <>
          <h2 style={{ marginBottom: "10px", color: "green" }}>
            Welcome {user?.name}
          </h2>
          <Link to="/admin">Go To the page ADMIN</Link>
        </>
      ) : (
        <>
          <Form form={form} onFinish={handleFinish}>
            <Form.Item
              name="login"
              rules={[
                {
                  required: true,
                  min: 5,
                  message: "Please enter your Login at least 5 characters",
                },
              ]}
            >
              <Input placeholder="Please enter your Login" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password at least 5 characters",
                  min: 5,
                },
              ]}
            >
              <Input.Password placeholder="Please enter your password" />
            </Form.Item>
            {openRegistration && (
              <>
                <Form.Item name="name">
                  <Input
                    style={{ marginBottom: "20px" }}
                    placeholder="Please enter your name"
                  />
                </Form.Item>
                <Form.Item
                  name="phone"
                  rules={[
                    { required: true, message: "Please enter your phone" },
                  ]}
                >
                  <Input placeholder="Please enter your phone" />
                </Form.Item>
              </>
            )}
            <Button htmlType="submit" style={{ marginTop: "20px" }}>
              {openRegistration ? "Register" : "Login"}
            </Button>
          </Form>

          {!openRegistration && (
            <Button
              style={{ marginTop: "20px" }}
              type="primary"
              onClick={() => setOpenRegistration(true)}
            >
              Register
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default Login;
