import { Link } from "react-router-dom"
import { useState } from "react"
import { createPost } from "./api"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from './store';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setUserList } from "./postSlice";
import { fetchUsers } from "./api";

export default function Home() {
    const [textboxvalue, setTextBoxValue] = useState("")
    const [tagboxvalue, setTagBoxValue] = useState("")
    const [renderTags, setRenderTags] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const token = useSelector((state: RootState) => state.post.authToken);
    const user = useSelector((state: RootState) => state.post.authUser);
    const users = useSelector((state: RootState) => state.post.userList);

    useEffect(() => {
        const getUsers = async () => {
            try {
                if (token) {
                    const data = await fetchUsers(token)
                    dispatch(setUserList(data))
                }
            } catch (error) {
                console.log(error)
            }
        }
        getUsers();
    }, [dispatch, token]);

    const handleSubmit = async (post: string, tag: string) => {
        setError(null)
        setSuccessMessage(null)

        if (!post.trim()) {
            setError("You have to type something")
            return;
        }

        const updatedTags = tag.split(',').map(tag => tag.replace('@','').trim()).filter(tag => tag !== '');
        console.log(updatedTags)
        try {
            if (token) {
                await createPost(post, updatedTags, token)
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

    const handleOnClick = (name: string) => {
        setTagBoxValue((prevValue) => prevValue + name + ',')
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setTagBoxValue(newValue)

        if (newValue[newValue.length - 1] === '@') {
            setRenderTags(true)
        } else {
            setRenderTags(false)
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
            <p>Create posts</p>
            <input placeholder = "Type post" value={textboxvalue} onChange={(event) => setTextBoxValue(event.target.value)}></input>
            <input placeholder = "Tag users" value = {tagboxvalue} onChange={(event) => handleChange(event)}></input>
            <button onClick={() => handleSubmit(textboxvalue, tagboxvalue)}>Post</button>
            <br></br>
            <br></br>
            <div>
                {renderTags && users.length > 0 &&(
                    users.map((person) => (
                        <>
                            <button key={person.id} onClick={() => handleOnClick(`${person.username}`)}>{person.username}</button>
                        </>
                    ))
                )}
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <br></br>
            <br></br>
            <button onClick={handleSignOut}>Sign out</button>
        </>
    )
}