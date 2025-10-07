import React from "react";
import {Typography, Card, Row, Col} from "antd";
import RegisterForm from "../../../components/forms/RegisterForm.tsx"

const { Title, Text } = Typography;

const UserRegisterPage: React.FC = () => {
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
                    <Col xs={0} md={12} style={{ background: "#1677ff", padding: "60px 40px" }}>
                        <Title level={2} style={{ color: "white" }}>
                            Welcome!
                        </Title>
                        <Text style={{ color: "white", fontSize: 16 }}>
                            Create your account to get started.
                        </Text>
                    </Col>
                    <Col xs={24} md={12} style={{ padding: "40px" }}>
                        <div style={{ textAlign: "center", marginBottom: 24 }}>
                            <Title level={3} style={{ marginBottom: 0 }}>
                                REGISTER
                            </Title>
                            <Text>Enter your information to register</Text>
                        </div>
                        <RegisterForm />
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default UserRegisterPage;