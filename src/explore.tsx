import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from './store';
import { useEffect } from "react";
import { fetchPosts } from "./api";
import { setPosts } from "./postSlice";

export default function Explore() {
    const posts = useSelector((state : RootState) => state.post.posts)
    const token = useSelector((state: RootState) => state.post.authToken);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPictures = async () => {
            try {
                if (token) {
                    const data = await fetchPosts(token)
                    dispatch(setPosts(data))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchPictures();
    }, [dispatch, token]);
    console.log(posts)

    return (
        <>
        <h1>Explore page</h1>
        <div>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <>
                    <Link to="/post" state = {{ post }}>
                        <p key={post.id}>{post.post} - posted by: {post.username}</p>
                    </Link>
                    </>
                ))
            ) : (
                <p>Loading posts...</p>
            )}
        </div>
        <Link to ="/home">
            <button>Back to home page</button>
        </Link>
        </>
    )
}