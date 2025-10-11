import React from "react";
import {Typography, Card, Row, Col} from "antd";
import LoginForm from "../../../components/forms/LoginForm.tsx";

const { Title, Text } = Typography;

const UserLoginPage: React.FC = () => {
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
                    </Col>
                    <Col xs={24} md={12} style={{ padding: "40px" }}>
                        <div style={{ textAlign: "center", marginBottom: 24 }}>
                            <Title level={3} style={{ marginBottom: 0 }}>
                                Login
                            </Title>
                            <Text>Enter your information to login</Text>
                        </div>
                        <LoginForm />
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default UserLoginPage;