import App from "./App";
import Explore from "./explore";
import Home from "./home";
import Tags from "./tags";
import PostInfo from "./postInfo";

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
    {
        path: "/post",
        element: <PostInfo />,
    },
];

export default routes;