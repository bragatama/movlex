import { Box, Container, Select, Title } from "@mantine/core";
import MainGrid from "../../components/MainGrid";
import { useState } from "react";

const Movies = () => {
    const [sortValue, setSortValue] = useState("popularity.desc");

    return (
        <>
            <Box pt={"xl"}>
                <Container size={"mainXl"}>
                    <Title order={1} c={"white"}>
                        Movies
                    </Title>
                    <Select
                        data={[
                            { value: "popularity.desc", label: "Popularity" },
                            { value: "vote_average.desc", label: "Top Rated" },
                        ]}
                        defaultValue="popularity.desc"
                        label="Sort by..."
                        w={"20%"}
                        placeholder="Sort by..."
                        allowDeselect={false}
                        checkIconPosition="right"
                        onChange={(e) => setSortValue(e)}
                    ></Select>
                </Container>
            </Box>

            <MainGrid type="movie" sortBy={sortValue}/>
        </>
    );
};

export default Movies;
