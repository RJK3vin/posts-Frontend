import { Link } from "react-router-dom"

export default function Tags() {
    return (
        <>
            <h1>Posts your tagged in</h1>
            <Link to ='/home'>
                <button>Back to home page</button>
            </Link>
        </>
    )
}