import MainCard from '../components/MainCard';
import MainCarousel from '../components/MainCarousel';
import { Box, Container, Flex } from '@mantine/core';

const Home = () => {

    return (
        <>
            <MainCarousel />
            <Box pt={'md'}>
                <Container size={'mainXl'}
                // right={'0px'}
                >
                    <Flex
                        direction={'column'}
                        gap={'xs'}
                    >
                        <MainCard type='popular' label='Popular Movies'/>
                        <MainCard type='top_rated' label='Top Rated Movies'/>
                        <h1>test pertama</h1>
                        <h1>test Kedua</h1>
                        <h1>test Ketiga</h1>
                    </Flex>
                </Container>
            </Box>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
        </>
    );
}

export default Home;
