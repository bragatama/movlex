// import { Anchor, Box, Container, Flex } from "@mantine/core";
// import { Link } from "react-router-dom";

import { Anchor, Box, Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from '../css/Navbar.module.css'


// Second Iteration

const links = [
    { link: '/movies', label: 'Movies' },
    { link: '/series', label: 'TV Series' },
    { link: '/browse', label: 'Browse' },
]

const Navbar = () => {
    const [opened, { toggle }] = useDisclosure(false)
    const [active, setActive] = useState('');
    const [scroll, setScroll] = useState(false);

    const changeScroll = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        window.scrollY > 0 ? setScroll(true) : setScroll(false);
    }

    useEffect(() => {
        window.addEventListener('scroll', changeScroll)
        return () => {
            window.removeEventListener('scroll', changeScroll)
        };
    }, []);
    console.log(scroll);


    const items = links.map((link) => {
        return (
            <Anchor
                component={Link}
                key={link.label}
                to={link.link}
                p={'6px'}
                fw={'bolder'}
                td={'none'}
                className={classes.link}
                data-active={active === link.link || undefined}
                onClick={() => setActive(link.link)}
            >
                {link.label}
            </Anchor>
        )
    })
    console.log(items);

    // const <


    return (
        <header className={(scroll ? classes.header_glass : classes.header)} >
            <Container size="mainXl" className={classes.inner}>
                <Anchor
                    underline="never"
                    component={Link}
                    to={'/'}
                    onClick={() => {
                        setActive('')
                    }}
                >
                    <Box className={classes.title}>
                        Movlex
                    </Box>
                </Anchor>
                <Group gap={20} visibleFrom="xs" className={classes.menu}>
                    {items}
                </Group>
                <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
            </Container>
        </header>
    );
}



export default Navbar;
