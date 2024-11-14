import { Container, Flex, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(5);
    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 5000);
        setInterval(() => {
            setTimer(timer - 1);
        }, 1000);
    }, [navigate, timer]);

    return (
        <Container size={"mainXl"} h={"100vh"}>
            <Flex
                direction={"column"}
                gap={"sm"}
                justify={"center"}
                align={"center"}
                h={"100%"}
            >
                <Title order={1} c={"white"}>
                    Error 404 - Page not found
                </Title>
                <Title order={4} c={"dimmed"}>
                    You will be directed to homepage in:
                </Title>
                <Title order={1} c={"white"}>
                    {timer}
                </Title>
            </Flex>
        </Container>
    );
};

export default ErrorPage;
