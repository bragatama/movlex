import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./index.css";
import {
    ColorSchemeScript,
    Container,
    createTheme,
    MantineProvider,
    rem,
} from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import "@mantine/nprogress/styles.css";
import Movies from "./pages/movies/Movies.tsx";
import Series from "./pages/series/Series.tsx";
import DetailsPage from "./pages/DetailsPage.tsx";

const CONTAINER_SIZES: Record<string, string> = {
    xxs: rem(300),
    xs: rem(400),
    sm: rem(500),
    md: rem(600),
    lg: rem(700),
    xl: rem(1200),
    xxl: rem(1700),
    mainXl: "90vw",
};

const theme = createTheme({
    fontFamily: "Poppins, sans-serif",
    components: {
        Container: Container.extend({
            vars: (_, { size, fluid }) => ({
                root: {
                    "--container-size": fluid
                        ? "100%"
                        : size !== undefined && size in CONTAINER_SIZES
                        ? CONTAINER_SIZES[size]
                        : rem(size),
                },
            }),
        }),
    },
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/movies/1",
                element: <Movies />,
            },
            { path: "/movies/:page", element: <Movies /> },
            { path: "/movies/:page?query=:search", element: <Movies /> },
            { path: "/movies/:page?&sort_by=:sort_by", element: <Movies /> },
            { path: "/series/:page?query=:search", element: <Movies /> },
            { path: "/series/:page?&sort_by=:sort_by", element: <Movies /> },
            {
                path: "/series/1",
                element: <Series />,
            },
            {
                path: "/series/:page",
                element: <Series />,
            },
            {
                path: "/browse",
                element: <h1>This is a browse</h1>,
            },
            {
                path: "/:type/:id",
                element: <DetailsPage />,
            },
            {
                path: "/:type/:id/season/:season",
                element: <DetailsPage />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ColorSchemeScript />
        <MantineProvider theme={theme} defaultColorScheme="dark">
            <NavigationProgress />
            <RouterProvider router={router} />
        </MantineProvider>
    </StrictMode>
);
