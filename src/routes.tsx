import App from "./App";
import Explore from "./explore";
import Home from "./home";
import Tags from "./tags";

const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/explore",
        element: <Explore />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/tag",
        element: <Tags />,
    },
];

export default routes;