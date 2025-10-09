import { Form, Input, Button, type FormProps, message } from "antd";
import { useResetPasswordMutation } from "../../services/userService.ts";
import { useNavigate, useParams } from "react-router";
import type { IResetPasswordConfirm } from "../../types/users/IResetPasswordConfirm.ts";

const ResetPasswordForm: React.FC = () => {
    const [form] = Form.useForm();
    const [reset, { isLoading }] = useResetPasswordMutation();
    const navigate = useNavigate();
    const { uid, token } = useParams<{ uid: string; token: string }>();

    const onFinish: FormProps<IResetPasswordConfirm>["onFinish"] = async (values) => {
        if (values.new_password !== values.confirm_password) {
            message.error("Паролі не співпадають");
            return;
        }

        if (!uid || !token) {
            message.error("Невірне або неповне посилання для скидання паролю");
            return;
        }

        try {
            const payload: IResetPasswordConfirm = {
                uid,
                token,
                new_password: values.new_password,
                confirm_password: values.confirm_password,
            };

            await reset(payload).unwrap();
            message.success("Пароль успішно змінено");
            navigate("/login");
        } catch (err: any) {
            console.error(err);
            message.error(err?.data?.detail || "Помилка при зміні паролю");
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish} style={{ width: "100%" }}>
            <Form.Item
                label="Новий пароль"
                name="new_password"
                rules={[{ required: true, message: "Введіть новий пароль" }]}
            >
                <Input.Password placeholder="********" />
            </Form.Item>

            <Form.Item
                label="Підтвердження паролю"
                name="confirm_password"
                dependencies={["new_password"]}
                rules={[
                    { required: true, message: "Підтвердіть пароль" },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("new_password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error("Паролі не співпадають"));
                        },
                    }),
                ]}
            >
                <Input.Password placeholder="********" />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    block
                    style={{ height: "40px", fontWeight: 600 }}
                >
                    Змінити пароль
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ResetPasswordForm;
