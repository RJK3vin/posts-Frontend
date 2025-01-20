import { useState } from "react"
import { logIn, createAccount } from "./api"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthToken, setAuthUser } from "./postSlice";
import './App.css'

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

  const handleSignUp = async() => {
    try {
      await createAccount(username, password)
      await handleLogIn()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="container">
        <input className="input" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)}/>
        <input className="input" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
        <button onClick={handleLogIn}>Log In</button>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </>
  )
}

  

