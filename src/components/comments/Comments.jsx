import { Button, Form, Input } from "antd";
import "./Comments.scss";
import { useEffect } from "react";
import { createComment, fetchComments } from "../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Comments = ({ productId }) => {
  const comments = useSelector((store) => store.product.comments);
  const [form] = Form.useForm()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchComments(productId));
  }, [productId]);

  function handleFinish(values) {
    const date = new Date().toLocaleString();
    dispatch(createComment({ ...values, productId, date }));
    form.resetFields()
  }

  return (
    <div className="product_page_comments">
      <h1>Comments</h1>
      <Form onFinish={handleFinish} form={form}>
        <Form.Item name="userName">
          <Input placeholder="Enter your Name" />
        </Form.Item>
        <Form.Item name="message">
          <Input.TextArea placeholder="Comment" />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Add Comment
        </Button>
      </Form>
      <div>
        {comments?.map((comment) => {
          return (
            <div key={comment.id} className="product_page_comments_block">
              <span> {comment.userName}</span>
              <span>{comment.date}</span>
              <div>{comment.message}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
