import React, {useEffect, useRef, useState} from "react"
import { Link } from "react-router-dom"
import axios from "../api/axios"


export default function Login(){
    const usernameRef = useRef()
    const passwordRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const errorFunction = prevError =>{
        setError("Username or password is too short")
    }
    
    const errorHandler = () =>{
    if (username.length <= 0 && password.length <= 6){
        errorFunction()
    }
  }



    const submitUser = (e)=>{
      e.preventDefault()
    }
  
  
    useEffect(()=>{
      setError("")
    }, [username, password])
  
    return (
      <div>
        <p ref={errRef} className={error ? "errmsg" : "offscreen"} aria-live="assertive">{error}</p>
        <p>{errorHandler}</p>
        <h1>Log In</h1>
        <form onSubmit={submitUser}>
          <label htmlFor="username">Username: </label>
          <input
            placeholder="Username"
            type="text"
            autoFocus
            autoComplete="off"
            required
            ref={usernameRef}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <label htmlFor="password">Password: </label>
          <input
            placeholder="Password"
            type="password"
            required
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button>Login!</button>
        </form>
        <Link to="/register">Sign up here.</Link>
      </div>
    )
}
