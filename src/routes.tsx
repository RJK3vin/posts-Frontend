import App from "./App";
import Explore from "./explore";
import Home from "./home";

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
];

export default routes;