import { Carousel } from "@mantine/carousel";
import { Flex, Image, Paper, Text, Title } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import classes from '../css/CarouselCard.module.css'
import Autoplay from "embla-carousel-autoplay";
import { fetchTrendingCarousel, getLogo, imageOriginalUrl } from "../services/Api";
import { genreAll, TrendingAll } from "../types/types";
import moment from "moment";

const Card = (item: TrendingAll) => {
    const [logo, setLogo] = useState('');
    useEffect(() => {
        getLogo(item.id, item.media_type === 'movie' ? item.media_type : 'tv')
            .then((res) => {
                setLogo(res.data.logos[0].file_path)
            })
            .catch((error) => {
                console.log(error, 'error');
            })
    }, [item.id, item.media_type]);
    // genre
    const matchGenres = (genres: [{ id: number, name: string }], genreList: [{ id: number, name: string }]) => genres
        .filter(genre => genreList.includes(genre.id))
        .map((genre) => (
            <div key={genre.id}>
                <Paper
                    radius={'md'}
                    withBorder
                    px={'sm'}
                >
                    <Text
                        className={classes.genre}
                        fw={900}
                    >{genre.name}</Text>
                </Paper>
            </div>
        ));
    // console.log(genre);
    const releaseDate = moment(item.release_date ? item.release_date : item.first_air_date).format("YYYY")
    return (
        <Paper
            shadow='md'
            // p="xl"
            style={{ backgroundImage: `linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 100%),url(${imageOriginalUrl}/${item.backdrop_path})` }}
            className={classes.card}>
            <div></div>
            <div className={classes.content}>
                <div className={classes.image}>
                    <Image src={`${imageOriginalUrl}/${logo}`} alt='logo' h={'0%'} fit='contain' />
                </div>
                <div>
                    <Text className={classes.category} size='xs'>
                        {item.media_type} | {releaseDate}
                    </Text>
                    <Title className={classes.title}
                        mb={'1vh'}>
                        {item.title ? item.title : item.name}
                    </Title>
                    <Flex
                        justify={'flex-start'}
                        direction={'row'}
                        wrap={'wrap'}
                        gap={{ base: 'xs', md: 'md' }}
                    >
                        {matchGenres(genreAll, item.genre_ids)}
                    </Flex>
                    <Text className={classes.description} lineClamp={4}>
                        {item.overview}
                    </Text>
                </div>
            </div>
        </Paper>
    )
}

const MainCarousel = () => {
    const [data, setData1] = useState([]);
    useEffect(() => {
        fetchTrendingCarousel('day')
            .then((res) => {
                setData1(res.data.results)
            })
            .catch((err) => {
                console.log(err, 'error');
            })
    }, []);

    const slides = data && data.slice(0, 10).map((item) => (
        <Carousel.Slide key={item.id}>
            <Card {...item} />
        </Carousel.Slide>
    ));
    const autoplay = useRef(Autoplay({
        playOnInit: true,
        delay: 5000,
        stopOnMouseEnter: true,
        stopOnFocusIn: false,
        stopOnInteraction: false
    }));

    return (
        <>
            <div style={{ height: '70dvh', display: 'flex', width: '100%' }}>
                <Carousel
                    height={'100%'}
                    slideSize={{ base: '100%', sm: '50%' }}
                    slideGap={{ base: '6px', sm: 'xl' }}
                    style={{ width: '100%' }}
                    align='start'
                    withIndicators
                    loop
                    classNames={classes}
                    plugins={[autoplay.current]}
                >
                    {slides}
                </Carousel>
            </div>
        </>
    );
}

export default MainCarousel;
