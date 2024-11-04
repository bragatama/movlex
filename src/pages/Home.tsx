import { Carousel } from '@mantine/carousel'
import { Image, Paper, Text, Title } from '@mantine/core';
import classes from '../css/CarouselCard.module.css'
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';

const Home = () => {
    const slides = data.map((item) => (
        <Carousel.Slide key={item.title}>
            <Card {...item} />
        </Carousel.Slide>
    ));
    const autoplay = useRef(Autoplay({ delay: 5000 }));

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
                    onMouseEnter={autoplay.current.stop}
                    onMouseLeave={autoplay.current.reset}
                >
                    {slides}
                </Carousel>
            </div>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
        </>
    );
}

interface CarouselProps {
    'image': string;
    'logo': string;
    'title': string;
    'category': string;
    'year': string;
    'overview': string;

}

const Card = ({ image, logo, title, category, year, overview }: CarouselProps) => {
    return (
        <Paper
            shadow='md'
            // p="xl"
            style={{ backgroundImage: `linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 100%),url(${image})` }}
            className={classes.card}>
            {/* Isi card */}
            <div></div>
            <div className={classes.content}>
                <div className={classes.image}>
                    <Image src={logo} alt='logo' h={'0%'} fit='contain' />
                </div>
                <div>
                    <Text className={classes.category} size='xs'>
                        {category}
                    </Text>
                    <Title className={classes.title}>
                        {title} - (<span style={{ color: 'white', opacity: 0.7 }}>{year}</span>)
                    </Title>
                    <Text className={classes.description}>
                        {overview}
                    </Text>
                </div>
            </div>
        </Paper>
    )
}

const data = [
    {
        title: "Inside Out 2",
        category: "Movie",
        logo: "https://image.tmdb.org/t/p/original/h40hblm8J1if7T2CBMjCD85HwuD.png",
        year: "2024",
        image: "https://image.tmdb.org/t/p/original/p5ozvmdgsmbWe0H8Xk7Rc8SCwAB.jpg",
        overview: "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone."
    }, {
        title: "Kingdom of the Planet of the Apes",
        category: "Movie",
        logo: "https://image.tmdb.org/t/p/original/gLi5qaqxZbVj2PXQYrah0AFgqkB.png",
        year: "2024",
        image: "https://image.tmdb.org/t/p/original/fypydCipcWDKDTTCoPucBsdGYXW.jpg",
        overview: "Several generations following Caesar's reign, apes – now the dominant species – live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all he's known about the past and to make choices that will define a future for apes and humans alike."
    }, {
        title: "Civil War",
        category: "Movie",
        logo: "https://image.tmdb.org/t/p/original/bpFneOXBSMdlJkw2zODnUbBj3x9.png",
        year: "2024",
        image: "https://image.tmdb.org/t/p/original/en3GU5uGkKaYmSyetHV4csHHiH3.jpg",
        overview: "In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war."
    }
]

export default Home;
