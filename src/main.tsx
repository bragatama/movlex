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
import { AuthProvider } from "./context/AuthProvider.tsx";
import Search from "./Search.tsx";
import Watchlist from "./Watchlist.tsx";
import Protected from "./components/routes/Protected.tsx";
import GetPerson from "./components/GetPerson.tsx";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import ErrorPage from "./components/ErrorPage.tsx";

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
            { path: "/series/:page?query=:search", element: <Series /> },
            { path: "/series/:page?&sort_by=:sort_by", element: <Series /> },
            {
                path: "/search/:page",
                element: <Search />,
            },
            {
                path: "/search/:page?query=:search",
                element: <Search />,
            },
            {
                path: "/series/:page",
                element: <Series />,
            },
            {
                path: "/:type/:id",
                element: <DetailsPage />,
            },
            {
                path: "/:type/:id/season/:season",
                element: <DetailsPage />,
            },
            {
                path: "/:type/:id/season/:season/episode/:episode",
                element: <DetailsPage />,
            },
            { path: "/person/:id", element: <GetPerson /> },
            {
                path: "/watchlist",
                element: (
                    <Protected>
                        <Watchlist />
                    </Protected>
                ),
            },
        ],
        errorElement: <ErrorPage />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ColorSchemeScript />
        <MantineProvider theme={theme} defaultColorScheme="dark">
            <Notifications />
            <NavigationProgress />
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </MantineProvider>
    </StrictMode>
);
