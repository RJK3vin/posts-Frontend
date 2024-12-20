import { Link } from "react-router-dom"
import { useState } from "react"
import { createPost } from "./api"
import React from "react";

export default function Home() {
    const [textboxvalue, setTextBoxValue] = useState("")
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (comment: string) => {
        setError(null)
        setSuccessMessage(null)

        if (!comment.trim()) {
            setError("You have to type something")
            return;
        }

        try {
            createPost(comment)
            setSuccessMessage("Post sucessfully created")
            setTextBoxValue("")
        } catch (error) {
            console.log(error)
            setError("Failed to create post, try again")
        }
    } 
    return (
        <>
            <h1>Home page</h1>
            <Link to= "/explore">
                <button>Go to explore page</button>
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