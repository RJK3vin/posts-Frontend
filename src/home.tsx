import { Link } from "react-router-dom"
import { useState } from "react"
import { createPost } from "./api"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from './store';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setUserList } from "./postSlice";
import { fetchUsers } from "./api";
import Toast from "./toast";
import './App.css'

export default function Home() {
    const [postboxvalue, setPostBoxValue] = useState("")
    const [textboxvalue, setTextBoxValue] = useState("")
    const [tagboxvalue, setTagBoxValue] = useState("")
    const [renderTags, setRenderTags] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState<string | null>(null);
    const token = useSelector((state: RootState) => state.post.authToken);
    const user = useSelector((state: RootState) => state.post.authUser);
    const users = useSelector((state: RootState) => state.post.userList);
    const [showToast, setShowToast] = useState(false);

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

    const handleSubmit = async (post: string, caption: string, tag: string) => {
        setError(null)

        if (!post.trim()) {
            setError("You have to type something")
            return;
        }

        const updatedTags = tag.split(',').map(tag => tag.replace('@','').trim()).filter(tag => tag !== '');
        console.log(updatedTags)
        try {
            if (token) {
                await createPost(post, caption, updatedTags, token)
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
                setPostBoxValue("")
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
            <input placeholder = "Paste image source" value={postboxvalue} onChange={(event) => setPostBoxValue(event.target.value)}></input>
            <input placeholder = "Type post" value={textboxvalue} onChange={(event) => setTextBoxValue(event.target.value)}></input>
            <input placeholder = "Tag users" value = {tagboxvalue} onChange={(event) => handleChange(event)}></input>
            <button onClick={() => handleSubmit(postboxvalue, textboxvalue, tagboxvalue)}>Post</button>
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
            <button onClick={handleSignOut}>Sign out</button>
            <Toast message = "Post successfully created!" show={showToast}/>
        </>
    )
}