import { Link } from "react-router-dom"

export default function App() {
  return (
    <>
      <input placeholder = "username"></input>
      <input placeholder = "password"></input>
      <Link to="/home">
        <button>Log in</button>
      </Link>
    </>
  )
}

  

