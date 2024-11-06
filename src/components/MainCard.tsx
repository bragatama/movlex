import { Carousel } from "@mantine/carousel";
import { AspectRatio, Box, Divider, Flex, HoverCard, Image, Paper } from "@mantine/core";
import { MovieList } from "../types/types";
import { homeList, imageOriginalUrl, moviesList } from "../services/Api";
import classes from '../css/CarouselCard.module.css'
import { useEffect, useRef, useState } from "react";

const Card = (item: MovieList) => {
    // const [hover, setHover] = useState(false);
    // const timerRef = useRef()
    // const changeHoverActive = () => {
    //     timerRef.current = setTimeout(() => {
    //         setHover(true)
    //     }, 500);
    // }
    // const changeHoverDeactive = () => {
    //     if (timerRef.current) {
    //         setTimeout(() => {
    //             setHover(false)
    //         }, 500);
    //         clearTimeout(timerRef.current)
    //     }
    // }
    return (
        <Paper
        // onMouseEnter={changeHoverActive}
        // onMouseLeave={changeHoverDeactive}
        className={classes.poster}
        shadow="xl"
        >
            <HoverCard
                shadow="md"
                openDelay={150}

            >
                <HoverCard.Target>
                    <AspectRatio ratio={2 / 3}>
                        <Image
                            src={`${imageOriginalUrl}/${item.poster_path}`}
                            radius={'md'}
                        />
                    </AspectRatio>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                    <Flex
                        justify={'flex-start'}
                        direction={'column'}
                    >
                        <h2>{item.title}</h2>
                    </Flex>
                </HoverCard.Dropdown>
            </HoverCard>
        </Paper>
    )
}

const MainCard = ({ type, label }: { type: string, label: string }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        homeList(type)
            .then((res) => {
                setData(res.data.results)
            })
            .catch((err) => {
                console.log(err, 'error');
            })
    }, [type]);

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
            // w={'94vw'}
            >
                <Carousel
                    slideSize={{ base: '40%', sm: '30%', md: '15%' }}
                    slideGap={'sm'}
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
