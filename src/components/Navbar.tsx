// import { Anchor, Box, Container, Flex } from "@mantine/core";
// import { Link } from "react-router-dom";

import {
    Anchor,
    Avatar,
    Box,
    Burger,
    Button,
    Container,
    Flex,
    Group,
    Menu,
    Text,
    Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "../css/Navbar.module.css";
import { useAuth } from "../context/UseAuth";

// Second Iteration

const links = [
    { link: "/movies/1", label: "Movies" },
    { link: "/series/1", label: "TV Series" },
    { link: "/browse", label: "Browse" },
];

const Navbar = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState("");
    const [scroll, setScroll] = useState(false);
    const { user, signInWithGoogle, logout } = useAuth();
    const changeScroll = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        window.scrollY > 0 ? setScroll(true) : setScroll(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", changeScroll);
        return () => {
            window.removeEventListener("scroll", changeScroll);
        };
    }, []);

    const items = links.map((link) => {
        return (
            <Anchor
                component={Link}
                key={link.label}
                to={link.link}
                p={"6px"}
                fw={"bolder"}
                td={"none"}
                className={classes.link}
                data-active={active === link.link || undefined}
                onClick={() => setActive(link.link)}
            >
                {link.label}
            </Anchor>
        );
    });

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
            console.log("success");
        } catch (error) {
            console.log(error, "error");
        }
    };
    return (
        <header className={scroll ? classes.header_glass : classes.header}>
            <Container size="mainXl" className={classes.inner}>
                <Anchor
                    underline="never"
                    component={Link}
                    to={"/"}
                    onClick={() => {
                        setActive("");
                    }}
                >
                    <Box className={classes.title}>Movlex</Box>
                </Anchor>
                <Group gap={20} visibleFrom="xs" className={classes.menu}>
                    {items}
                    {user && (
                        <Menu position="bottom-end">
                            <Menu.Target>
                                <Anchor
                                    underline="never"
                                    className={classes.link}
                                >
                                    <Group>
                                        <Text fw={500} c={"white"} fz={"sm"}>
                                            {user?.displayName}
                                        </Text>
                                        <Avatar
                                            size={"md"}
                                            src={user?.photoURL}
                                        />
                                    </Group>
                                </Anchor>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item component={Link} to={"/"}>
                                    Watchlist
                                </Menu.Item>
                                <Menu.Item onClick={logout} c={"red"}>
                                    Logout
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    )}
                    {!user && (
                        <Anchor
                            p={"6px"}
                            fw={"bolder"}
                            td={"none"}
                            className={classes.link}
                            data-active={undefined}
                            onClick={handleGoogleLogin}
                        >
                            Login
                        </Anchor>
                    )}
                </Group>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="xs"
                    size="sm"
                />
            </Container>
        </header>
    );
};

export default Navbar;
