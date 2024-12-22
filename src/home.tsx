import { Link } from "react-router-dom"
import { useState } from "react"
import { createPost } from "./api"
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from './store';


export default function Home() {
    const [textboxvalue, setTextBoxValue] = useState("")
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const token = useSelector((state: RootState) => state.post.authToken);
    const user = useSelector((state: RootState) => state.post.authUser);

    const handleSubmit = async (comment: string) => {
        setError(null)
        setSuccessMessage(null)

        if (!comment.trim()) {
            setError("You have to type something")
            return;
        }

        try {
            if (token) {
                await createPost(comment, token)
                setSuccessMessage("Post sucessfully created")
                setTextBoxValue("")
            } else {
                setError("You must be logged in to post");
            }
        } catch (error) {
            console.log(error)
            setError("Failed to create post, try again")
        }
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
            <input placeholder = "Type" value={textboxvalue} onChange={(event) => setTextBoxValue(event.target.value)}></input>
            <button onClick={() => handleSubmit(textboxvalue)}>Post</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <br></br>
            <br></br>
            <Link to="/">
                <button>Sign out</button>
            </Link>
        </>
    )
}