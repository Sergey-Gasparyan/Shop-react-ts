import { Button, Form, Input, message, Select } from "antd";
import { IProduct } from "../../types/types";
import { useAppDispatch } from "../../redux/reduxHooks";
import { createProduct } from "../../redux/slices/productSlice";

const Admin = () => {
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  function handleFinish(values: Omit<IProduct, "rating" | 'quantity'>) {
    dispatch(createProduct({...values,rating:3,quantity : 1}))
    messageApi.success("Successfully created new product!");
    form.resetFields();
  }
  return (
    <div style={{ marginLeft: "40px", marginTop: "40px" }}>
      {contextHolder}
      <h1>Create New Product</h1>
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        style={{ marginTop: "30px" }}
        wrapperCol={{ span: 8 }}
      >
        <Form.Item
          name="brand"
          label="Brand"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Model"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="img"
          label="Image URL"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              { label: "Laptop", value: "laptop" },
              { label: "Phone", value: "phone" },
              { label: "Monitor", value: "monitor" },
            ]}
          />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default Admin;
