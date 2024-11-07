import { Anchor, AspectRatio, Box, Container, Divider, Flex, Grid, Image, Paper, Skeleton, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { genreAll, TrendingMovie } from '../types/types';
import classes from '../css/CarouselCard.module.css'
import { Link } from 'react-router-dom';
import { fetchTrending, imageOriginalUrl } from '../services/Api';
import moment from 'moment';

const Card = (item: TrendingMovie) => {
    const releaseDate = moment(item?.release_date || item?.first_air_date).format("YYYY")
    const matchGenres = (genres: { id: number, name: string }[], genreList: { id: number, name: string }) => genres
        .filter(genre => genreList.includes(genre.id))
        .slice(0, 1)
        .map((genre) => (
            <div key={genre.id}>
                <Text
                    size="sm"
                    fw={500}
                    style={{ textAlign: 'center' }}
                    c={'rgba(255,255,255,0.4)'}
                >{genre.name} • {releaseDate} • {item.vote_average.toFixed(1)}★</Text>
            </div>
        ));

    return (<>
        <Anchor
            component={Link}
            to={'/'}
            underline="never"
        >
            <Paper
                className={classes.poster}
            >
                <AspectRatio ratio={2 / 3}>
                    <Image
                        src={`${imageOriginalUrl}/${item.poster_path}`}
                        radius={'md'}
                    />
                </AspectRatio>
                <Box
                    className={classes.overlay_card}
                    pb={'xl'}
                >
                    <Flex
                        direction={'column'}
                        justify={'flex-end'}
                        h={'100%'}
                        px={'10%'}
                    >
                        <Title style={{ textAlign: 'center' }} order={4} fw={1000} c={'white'}>{item?.title || item?.name}</Title>
                        {matchGenres(genreAll, item.genre_ids)}
                        <Text
                            size='xs'
                            lineClamp={2}
                            c={'white'}
                            pt={'1vw'}
                        >
                            {item.overview}
                        </Text>
                    </Flex>
                </Box>
                {/* <Title style={{ textAlign: 'center' }} order={4} pt={"1vh"} fw={1000} c={'white'}>{item?.title || item?.name}</Title>
                {matchGenres(genreAll, item.genre_ids)} */}
            </Paper>
        </Anchor>
    </>)
}

const MainGrid = ({ type, time_window }: { type: string, time_window: string }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrending(type, time_window)
            .then((res) => {
                setData(res.data.results)
            })
            .catch((err) => {
                console.log(err, 'error');
            }).finally(() => {
                setLoading(false)
            })
        return () => {
        };
    }, [time_window, type]);

    const gridChild = data && data.map((item, i) => (
        <Grid.Col key={item.id} span={{ base: 20, sm: 10, md: 5, lg: 4 }}>
            {loading ?
                <Skeleton key={i} height={400} />
                : <Card {...item} />
            }

        </Grid.Col>
    ))

    return (
        <>
            <Box pt={'xl'}>
                <Container size={'mainXl'}>
                    <Title order={2} style={{ textTransform: 'uppercase' }}>{type === 'movie' ? 'movies' : 'tv series'}</Title>
                    <Divider />
                    <Grid
                        columns={20}
                        p={'8vh 0 10vh'}
                        gutter={{ base: 'lg', md: 'xl' }}
                        justify='center'
                    >
                        {gridChild}
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default MainGrid;
