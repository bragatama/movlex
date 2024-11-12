import { Box, Container, Flex, Input, TextInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MainGrid from "./components/MainGrid";

const Search = () => {
    const [searchURL, setSearchURL] = useSearchParams();
    const search = searchURL.get("query");
    const [searchQuery, setSearchQuery] = useState(search || "");
    useEffect(() => {
        document.title = `Search: ${searchURL}`;
    }, [searchURL]);

    return (
        <>
            <Box pt={"xl"}>
                <Container size={"mainXl"}>
                    <Flex direction={"row"} justify={"space-between"}>
                        <Title order={1} c={"white"}>
                            Search a Movie or TV Series
                        </Title>
                        <Flex
                            direction={"column"}
                            gap={"md"}
                            align={"flex-end"}
                        >
                            <TextInput
                                placeholder="Search Movie or TV Series"
                                w={"20vw"}
                                onChange={(e) =>
                                    setSearchQuery(e.currentTarget.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setTimeout(() => {
                                            window.location.href = `/1${
                                                searchQuery
                                                    ? `?query=${searchQuery}`
                                                    : ``
                                            }`;
                                        }, 100);
                                    }
                                }}
                                value={searchQuery}
                            />
                        </Flex>
                    </Flex>
                </Container>
            </Box>
            <MainGrid type="multi" sortBy={null} searchQuery={search} />
        </>
    );
};

export default Search;
