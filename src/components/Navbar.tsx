// import { Anchor, Box, Container, Flex } from "@mantine/core";
// import { Link } from "react-router-dom";

import {
    Anchor,
    Avatar,
    Box,
    Burger,
    CloseButton,
    Container,
    Drawer,
    Flex,
    Group,
    Menu,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "../css/Navbar.module.css";
import { useAuth } from "../context/UseAuth";
import { IconSearch } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

// Second Iteration

const links = [
    { link: "/movies/1", label: "Movies" },
    { link: "/series/1", label: "TV Series" },
];

const Navbar = () => {
    const [opened, { open, close }] = useDisclosure(false);
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
                data-active={undefined}
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
            notifications.show({
                message: "Successfully Log In",
                color: "green",
                autoClose: 5000,
            });
        } catch (error) {
            console.log(error, "error");
        }
    };
    return (
        <header className={scroll ? classes.header_glass : classes.header}>
            <Container size="mainXl" className={classes.inner}>
                <Drawer
                    opened={opened}
                    onClose={close}
                    size={"sm"}
                    shadow="xl"
                    padding={"lg"}
                    position="bottom"
                    overlayProps={{ backgroundOpacity: 0.1, blur: 4 }}
                >
                    <Flex
                        direction={"column"}
                        justify={"space-between"}
                        w={"90vw"}
                        mih={"100%"}
                    >
                        <Flex direction={"column"}>
                            {!user && (
                                <Anchor
                                    p={"6px"}
                                    fw={"bolder"}
                                    td={"none"}
                                    fz={"h3"}
                                    c={"white"}
                                    onClick={handleGoogleLogin}
                                >
                                    Login
                                </Anchor>
                            )}
                            {user && (
                                <Flex
                                    direction={"row"}
                                    gap={"md"}
                                    align={"center"}
                                    pb={"md"}
                                    px={6}
                                >
                                    <Avatar src={user?.photoURL} />
                                    <Title fz={"h3"}>{user?.displayName}</Title>
                                </Flex>
                            )}
                            <Anchor
                                component={Link}
                                to={"/movies/1"}
                                p={"6px"}
                                fw={"bolder"}
                                td={"none"}
                                fz={"h3"}
                                c={"white"}
                            >
                                Movies
                            </Anchor>
                            <Anchor
                                component={Link}
                                to={"/series/1"}
                                p={"6px"}
                                fw={"bolder"}
                                td={"none"}
                                fz={"h3"}
                                c={"white"}
                            >
                                TV Series
                            </Anchor>
                            {user && (
                                <>
                                    <Anchor
                                        component={Link}
                                        to={"/watchlist"}
                                        p={"6px"}
                                        fw={"bolder"}
                                        td={"none"}
                                        fz={"h3"}
                                        c={"white"}
                                    >
                                        Watchlist
                                    </Anchor>
                                    <Anchor
                                        // component={Link}
                                        // to={"/watchlist"}
                                        p={"6px"}
                                        fw={"bolder"}
                                        td={"none"}
                                        fz={"h3"}
                                        c={"red"}
                                        onClick={logout}
                                    >
                                        Logout
                                    </Anchor>
                                </>
                            )}
                        </Flex>
                        <TextInput
                            placeholder="Search Movie or TV Series"
                            // w={"100vw"}
                            classNames={classes}
                            onChange={(e) =>
                                setSearchQuery(e.currentTarget.value)
                            }
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
                            leftSection={<IconSearch color="white" size={14} />}
                            rightSection={
                                <CloseButton
                                    aria-label="Clear Input"
                                    onClick={() => {
                                        setSearchQuery("");
                                    }}
                                    style={{
                                        display: searchQuery
                                            ? undefined
                                            : "none",
                                    }}
                                />
                            }
                        />
                    </Flex>
                </Drawer>
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
                        placeholder="Search Movies or TV Series or Person"
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
                        leftSection={<IconSearch color="white" size={14} />}
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
                                <Menu.Item component={Link} to={"/watchlist"}>
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
                    onClick={opened ? close : open}
                    hiddenFrom="xs"
                    style={opened ? { display: "none" } : { display: "block" }}
                    size="sm"
                />
            </Container>
        </header>
    );
};

export default Navbar;
