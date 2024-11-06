import { Carousel } from "@mantine/carousel";
import { AspectRatio, Box, Divider, Flex, Image, Paper, Text, Title } from "@mantine/core";
import { genreAll, List } from "../types/types";
import { homeList, imageOriginalUrl } from "../services/Api";
import classes from '../css/CarouselCard.module.css'
import { useEffect, useState } from "react";
import moment from 'moment'

const Card = (item: List) => {

    const matchGenres = (genres: { id: number, name: string }[], genreList: { id: number, name: string }) => genres
        .filter(genre => genreList.includes(genre.id))
        .slice(0, 1)
        .map((genre) => (
            <div key={genre.id}>
                <Text
                    size="sm"
                    fw={500}
                >{genre.name}</Text>
            </div>
        ));
    return (
        <Paper
            // onMouseEnter={changeHoverActive}
            // onMouseLeave={changeHoverDeactive}
            className={classes.poster}
        >
            <AspectRatio ratio={2 / 3}>
                <Image
                    src={`${imageOriginalUrl}/${item.poster_path}`}
                    radius={'md'}
                />
            </AspectRatio>
            <Flex
                justify={'flex-start'}
                direction={'column'}
            >
                <Title order={4} pt={"1vh"} fw={1000}>{item.title ? item.title : item.name}</Title>
                {matchGenres(genreAll, item.genre_ids)}
            </Flex>
        </Paper>
    )
}

const MainCard = ({ sort, type, label }: { sort: string, type: string, label: string }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        homeList(sort, type)
            .then((res) => {
                setData(res.data.results)
            })
            .catch((err) => {
                console.log(err, 'error');
            })
    }, [sort, type]);

    const slides = data && data.map((item) => (
        <Carousel.Slide key={item.id}>
            <Card {...item} />
        </Carousel.Slide>
    ))
    return (
        <>
            <h2 style={{ margin: '0px' }}>{label}</h2>
            <Box
                h={'100%'}
                display={'flex'}
            >
                <Carousel
                    slideSize={{ base: '40%', sm: '30%', md: '18%' }}
                    slideGap={'xl'}
                    style={{
                        marginLeft: 'calc((-100vw + 100%) / 2)',
                        marginRight: 'calc((-100vw + 100%) / 2)',
                        flex: 1,
                        width: '100%',
                    }}
                    dragFree
                    classNames={classes}
                    slidesToScroll={'auto'}
                >
                    {slides}
                </Carousel>
            </Box >
            <Divider mt={'5vh'} />
        </>
    );
}

export default MainCard;
