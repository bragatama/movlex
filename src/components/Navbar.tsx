// import { Anchor, Box, Container, Flex } from "@mantine/core";
// import { Link } from "react-router-dom";

import {
    Anchor,
    Avatar,
    Box,
    Burger,
    CloseButton,
    Container,
    Flex,
    Group,
    Menu,
    Text,
    TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "../css/Navbar.module.css";
import { useAuth } from "../context/UseAuth";
import { IconSearch } from "@tabler/icons-react";

// Second Iteration

const links = [
    { link: "/movies/1", label: "Movies" },
    { link: "/series/1", label: "TV Series" },
];

const Navbar = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState("");
    const [scroll, setScroll] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
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
                    <TextInput
                        placeholder="Search Movie or TV Series"
                        w={"15vw"}
                        classNames={classes}
                        onChange={(e) => setSearchQuery(e.currentTarget.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setTimeout(() => {
                                    window.location.href = `${
                                        searchQuery
                                            ? `/search/1?query=${searchQuery}`
                                            : ``
                                    }`;
                                }, 100);
                            }
                        }}
                        rightSectionPointerEvents="all"
                        value={searchQuery}
                        leftSection={<IconSearch color="white"  size={14}/>}
                        rightSection={
                            <CloseButton
                                aria-label="Clear Input"
                                onClick={() => {
                                    setSearchQuery("");
                                }}
                                style={{
                                    display: searchQuery ? undefined : "none",
                                }}
                            />
                        }
                    />
                    {user && (
                        <Menu position="bottom-end" offset={10}>
                            <Menu.Target>
                                <Anchor
                                    component={Avatar}
                                    src={user?.photoURL}
                                    underline="never"
                                />
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item component={Text} fw={600}>
                                    <Flex
                                        direction={"row"}
                                        gap={"md"}
                                        align={"center"}
                                    >
                                        <Avatar src={user?.photoURL} />
                                        <Box>
                                            <Text fz={"sm"}>
                                                {user?.displayName}
                                            </Text>
                                            <Text fz={"xs"}>{user?.email}</Text>
                                        </Box>
                                    </Flex>
                                </Menu.Item>
                                <Menu.Divider />
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
