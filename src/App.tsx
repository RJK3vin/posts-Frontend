import { useState } from "react"
import { logIn } from "./api"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthToken, setAuthUser } from "./postSlice";

export default function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogIn = async() => {
    try {
      const { token, username: user } = await logIn(username, password);
      dispatch(setAuthToken(token))
      dispatch(setAuthUser(user))
      navigate("/home");
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <input placeholder = "username" value = {username} onChange={(event) => setUsername(event.target.value)}></input>
      <input placeholder = "password" value = {password} onChange={(event) => setPassword(event.target.value)}></input>
      <button onClick={handleLogIn}>Log in</button>
    </>
  )
}

  

