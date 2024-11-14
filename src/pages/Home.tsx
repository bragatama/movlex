import { useEffect } from "react";
import MainCard from "../components/MainCard";
import MainCarousel from "../components/MainCarousel";
import { Box, Container, Flex } from "@mantine/core";

const Home = () => {
    useEffect(() => {
        document.title = "Movlex";
    }, []);
    return (
        <>
            <meta
                name="description"
                content="homepage about movies and tv shows information, all information from title, release date, logo, backdrop, rating can be found here"
            />
            <MainCarousel type="all" time_window="week" />
            <Box pt={"xl"}>
                <Container
                    size={"mainXl"}
                    // right={'0px'}
                >
                    <Flex direction={"column"} gap={"xs"}>
                        <MainCard
                            type="movie"
                            sort="popular"
                            label="Popular Movies"
                        />
                        <MainCard
                            type="movie"
                            sort="top_rated"
                            label="Top Rated Movies"
                        />
                        <MainCard
                            type="tv"
                            sort="popular"
                            label="Popular TV Series"
                        />
                        <MainCard
                            type="tv"
                            sort="top_rated"
                            label="Top Rated TV Series"
                        />
                    </Flex>
                </Container>
            </Box>
        </>
    );
};

export default Home;
