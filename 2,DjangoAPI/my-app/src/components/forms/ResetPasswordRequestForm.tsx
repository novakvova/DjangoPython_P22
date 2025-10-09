import {Form, Input, Button, type FormProps} from "antd";
import {useResetPasswordRequestMutation} from "../../services/userService.ts";
import {useNavigate} from "react-router";
import type {IResetPasswordRequest} from "../../types/users/IResetPasswordRequest.ts";

const ResetPasswordRequestForm: React.FC = () => {
    const [form] = Form.useForm();
    const [resetRequest, { isLoading }] = useResetPasswordRequestMutation();
    const navigate = useNavigate();

    const onFinish: FormProps<IResetPasswordRequest>["onFinish"] = async (values) => {
        try {
            const result = await resetRequest(values).unwrap();
            console.log(result)
            navigate('/success-confirm');
        } catch (err: any) {
            const errorMessage = err?.data?.errors?.Name?.[0];
            console.error(errorMessage);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "100%" }}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Invalid email format" },
                ]}
            >
                <Input placeholder="johnsmith@example.com" />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    block
                    style={{ height: "40px", fontWeight: 600 }}
                >
                    Reset
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ResetPasswordRequestForm;