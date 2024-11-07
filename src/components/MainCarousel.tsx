import { Carousel } from "@mantine/carousel";
import { Anchor, Flex, Image, Paper, Skeleton, Text, Title } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import classes from '../css/CarouselCard.module.css'
import Autoplay from "embla-carousel-autoplay";
import { fetchTrending, getLogo, imageOriginalUrl } from "../services/Api";
import { genreAll, TrendingAll } from "../types/types";
import moment from "moment";
import { Link } from "react-router-dom";

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
                        c={'white'}
                        fw={900}
                    >{genre.name}</Text>
                </Paper>
            </div>
        ));
    const releaseDate = moment(item?.release_date || item?.first_air_date).format("YYYY")

    return (
        <Anchor
            component={Link}
            to={'/'}
            underline="never"
        >
            <Paper
                shadow='md'
                // p="xl"
                style={{
                    backgroundImage: `linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 100%),
                    url(${imageOriginalUrl}/${item.backdrop_path})`
                }}
                className={classes.card}>
                <div></div>
                <div className={classes.content}>
                    <div className={classes.image}>
                        <Image src={`${imageOriginalUrl}/${logo}`} alt='logo' className={classes.images} />
                    </div>
                    <div>
                        <Text className={classes.category} size='xs'>
                            {item.media_type} | {releaseDate} | {item.vote_average.toFixed(1)} ★
                        </Text>
                        <Title className={classes.title}
                            mb={'1vh'}>
                            {item?.title || item?.name}
                        </Title>
                        <Flex
                            justify={'flex-start'}
                            direction={'row'}
                            wrap={'wrap'}
                            gap={{ base: 'xs', md: 'md' }}
                        >
                            {matchGenres(genreAll, item.genre_ids)}
                        </Flex>
                        <Text className={classes.description} lineClamp={2}>
                            {item.overview}
                        </Text>
                    </div>
                </div>
            </Paper>
        </Anchor>
    )
}

const MainCarousel = ({ type, time_window }: { type: string, time_window: string }) => {
    const [data, setData1] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchTrending(type, time_window)
            .then((res) => {
                setData1(res.data.results)
            })
            .catch((err) => {
                console.log(err, 'error');
            }).finally(() => {
                setLoading(false)
            })
    }, [time_window, type]);

    const slides = data && data.slice(0, 10).map((item, i) => (
        <Carousel.Slide key={item.id}>
            {loading ?
                <Skeleton height={'80vh'} width={'100vw'} key={i} />
                : <Card {...item} />
            }
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
        <div style={{ height: '80dvh', display: 'flex', width: '100%' }}>
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
    );
}

export default MainCarousel;
