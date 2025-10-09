import React from "react";
import {Typography, Card, Row} from "antd";
import ResetPasswordForm from "../../../components/forms/ResetPasswordForm.tsx";

const { Title, Text } = Typography;

const ResetPasswordPage: React.FC = () => {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f5f5f5",
                padding: "20px",
            }}
        >
            <Card
                style={{
                    maxWidth: 900,
                    width: "100%",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
            >
                <Row>
                    <div style={{ textAlign: "center", marginBottom: 24 }}>
                        <Title level={3} style={{ marginBottom: 0 }}>
                            Reset Password
                        </Title>
                        <Text>Enter your new password</Text>
                    </div>
                    <ResetPasswordForm />
                </Row>
            </Card>
        </div>
    );
};

export default ResetPasswordPage;