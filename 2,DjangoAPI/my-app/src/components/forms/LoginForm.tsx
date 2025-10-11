import {Form, Input, Button, type FormProps} from "antd";
import {useLoginMutation} from "../../services/userService.ts";
import {useDispatch} from "react-redux";
import {setTokens} from "../../store/authSlice.ts";
import {Link, useNavigate} from "react-router";
import type {ILoginRequest} from "../../types/users/ILoginRequest.ts";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";

const LoginForm: React.FC = () => {
    const [form] = Form.useForm();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const onFinish: FormProps<ILoginRequest>["onFinish"] = async (values) => {
        try {
            if (!executeRecaptcha) return;

            const token = await executeRecaptcha('login');

            const result = await login({...values, recaptcha_token: token}).unwrap();
            console.log(result);
            dispatch(setTokens(result));
            navigate('/');
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
                label="User name"
                name="username"
                rules={[
                    { required: true, message: "Please enter your email" }
                ]}
            >
                <Input placeholder="Хустон" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter your password" }]}
            >
                <Input.Password placeholder="********" />
            </Form.Item>

            <Link to="/forgot-password">Forgot password?</Link>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    block
                    style={{ height: "40px", fontWeight: 600 }}
                >
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;