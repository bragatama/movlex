// import { Anchor, Box, Container, Flex } from "@mantine/core";
// import { Link } from "react-router-dom";

import { Anchor, Box, Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Link } from "react-router-dom";
import '../css/Navbar.css'

// const Navbar = () => {
//     return (
//         <Box py={4} mb={2}>
//             <Container>
//                 <Flex justify={"space-between"}
//                     align={"center"}
//                     direction={"row"}>
//                     <Anchor
//                         underline="never"
//                         component={Link}
//                         to={'/'}>
//                         <Box
//                             fz={"xl"}
//                             fw={"bold"}
//                             c={"green"}>
//                             MovieTIME
//                         </Box>
//                     </Anchor>

//                     {/* For Desktop */}
//                     <Flex gap={12}>
//                         {/* <Link to={'/movies'}><h3>Movies</h3></Link>
//                         <Link to={'/series'}><h3>TV Series</h3></Link>
//                         <Link to={'/browse'}><h3>Browse</h3></Link> */}
//                         <Anchor c={"white"} underline="never" component={Link} to={'/movies'}><h3>Movies</h3></Anchor>
//                         <Anchor c={"white"} underline="never" component={Link} to={'/series'}><h3>TV Series</h3></Anchor>
//                         <Anchor c={"white"} underline="never" component={Link} to={'/browse'}><h3>Browse</h3></Anchor>
//                     </Flex>
//                 </Flex>
//             </Container>
//         </Box>
//     );
// }

// export default Navbar;

// Second Iteration

const links = [
    { link: '/movies', label: 'Movies' },
    { link: '/series', label: 'TV Series' },
    { link: '/browse', label: 'Browse' },
]

const Navbar = () => {
    const [opened, { toggle }] = useDisclosure(false)
    const [active, setActive] = useState(links[0].link);
    // const clickHandler =()=>{
        
    // }

    const items = links?.map((link) => {
        return (
            <Anchor
                component={Link}
                to={link.link}
                className="link "
                data-active={active === link.link || undefined}
                onClick={(e) => {
                    e.preventDefault();
                    setActive(link.link);
                }}
            >
                {link.label}
            </Anchor>
        )
    })
    console.log(items);

    // const <


    return (
        <header className="header">
            <Container size="md" className="inner">
                <Anchor
                    underline="never"
                    component={Link}
                    to={'/'}>
                    <Box>
                        MovieTIME
                    </Box>
                </Anchor>
                <Group gap={20} visibleFrom="xs">
                    {items}
                </Group>
                <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
            </Container>
        </header>
    );
}



export default Navbar;
