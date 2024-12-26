import { Link } from "react-router-dom"
import { RootState } from "./store"
import { useSelector } from "react-redux"

export default function Tags() {
    const comments = useSelector((state : RootState) => state.post.comments)

    return (
        <>
            <h1>Posts your tagged in</h1>
            <div>
                <p></p>
            </div>
            <Link to ='/home'>
                <button>Back to home page</button>
            </Link>
        </>
    )
}