import {React, useRef, useState,  useEffect} from "react";
import { Link } from "react-router-dom";
//import api from "../api/axios";
import axios from "axios"

function Signup() {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    
    const submitUser = async (e) =>{
        e.preventDefault()
        try{
        const res = await axios({
            method: "post",
            url: "http://localhost:8080/api/auth/register",
            data:{
                username: username,
                password: password
            }
        })
        const data = await res.json()
        console.log(data)
    
    }catch(err){
            console.log({error: err});
        }
        console.log("User set!");
        setUsername("")
        setPassword("")
        
        
    }

  return (
    <>
  <h1>Signup</h1>
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
          <button>Signup!</button>
        </form>
        <Link to="/login">Already have an account?</Link>
        </>
  );
}

export default Signup;
