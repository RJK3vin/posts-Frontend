import { Link } from "react-router-dom"
import { useState } from "react"
import { createPost } from "./api"
import { useSelector } from "react-redux";
import { RootState } from './store';
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [textboxvalue, setTextBoxValue] = useState("")
    const [tagboxvalue, setTagBoxValue] = useState("")

    const navigate = useNavigate()

    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const token = useSelector((state: RootState) => state.post.authToken);
    const user = useSelector((state: RootState) => state.post.authUser);

    const handleSubmit = async (comment: string, tag: string) => {
        setError(null)
        setSuccessMessage(null)

        if (!comment.trim()) {
            setError("You have to type something")
            return;
        }

        const updatedTags = tag.split(',').map(tag => tag.replace('@','').trim()).filter(tag => tag !== '');
        console.log(updatedTags)
        try {
            if (token) {
                await createPost(comment, updatedTags, token)
                setSuccessMessage("Post sucessfully created")
                setTextBoxValue("")
                setTagBoxValue("")
            } else {
                setError("Failed to create post, try again");
            }
        } catch (error) {
            console.log(error)
            setError("Failed to create post, try again")
        }
    } 

    const handleSignOut = async() => {
        navigate("/");
        window.location.reload();
    }

    return (
        <>
            <h1>Home page</h1>
            <h2>Welcome {user}</h2>
            <Link to= "/explore">
                <button>Go to explore page</button>
            </Link>
            <br></br>
            <br></br>
            <Link to= "/tag">
                <button>Go to posts your tagged in</button>
            </Link>
            <br></br>
            <p>Create comments</p>
            <input placeholder = "Type comment" value={textboxvalue} onChange={(event) => setTextBoxValue(event.target.value)}></input>
            <input placeholder = "Tag users" value = {tagboxvalue} onChange={(event) => setTagBoxValue(event.target.value)}></input>
            <button onClick={() => handleSubmit(textboxvalue, tagboxvalue)}>Post</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <br></br>
            <br></br>
            <button onClick={handleSignOut}>Sign out</button>
        </>
    )
}