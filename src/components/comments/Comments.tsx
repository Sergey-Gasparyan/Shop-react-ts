import { Button, Form, Input } from "antd";
import "./Comments.scss";
import {
  useAddCommentsMutation,
  useGetCommentsQuery,
} from "../../queryies/commentsApi";

interface ICommentsForm {
  userName: string;
  message: string;
}

const Comments: React.FC<{ productId: number }> = ({ productId }) => {
  const { data: comments, isLoading, error } = useGetCommentsQuery(productId);
  const [form] = Form.useForm();
  const [addComment] = useAddCommentsMutation();

  function handleFinish(values: ICommentsForm) {
    const date = new Date().toLocaleString();
    addComment({ ...values, productId, date });
    form.resetFields();
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
        {isLoading ? (
          <h2 className="loading">Loading</h2>
        ) : (
          <>
            {comments?.map((comment) => (
              <div key={comment.id} className="product_page_comments_block">
                <span>{comment.userName}</span>
                <span>{comment.date}</span>
                <div>{comment.message}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Comments;
