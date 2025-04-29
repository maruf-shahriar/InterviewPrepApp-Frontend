import './css/LoginPage.css';

import {useState} from "react";
import axios from 'axios';
import { useNavigate,Link } from "react-router-dom";
const Url = "https://interviewapp.pythonanywhere.com/auth/jwt/create/"
function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState("");
    const navigate = useNavigate();

    const logindata = (e) =>{
        e.preventDefault();
        axios
        .post(Url, {
            username,
            password
        })
        .then((response) => {   
            console.log(response.data)
            window.localStorage.setItem('accessToken', response.data.access);
            navigate('/profile')
        
        })
        .catch((error) => {
        if (error.message === "Request failed with status code 401"){
            alert("Please Input Your Credentials Correctly")}
        }
        );
      

    }
    return (
        <body className="loginpagebody">
        <div className="LoginPage">
            
            <h1> Login </h1>
            <form>
            <div className="txt_field">
                
                <input type="text" onChange={(e)=>setUsername(e.target.value)} required/>
                <span></span>
                <label>Username</label>
                
            </div>
            
            <div className="txt_field">
                
                <input type="password" onChange={(e)=>setPassword(e.target.value)} required/>
                <span></span>
                <label>Password</label>
            </div>
            <div className="pass">Forgot Password?</div> 
            
            <button className="button" onClick={logindata}>Login</button>
            
            
            <div className="signup_link">
                Don't Have An Account? <Link to="/signup">Sign Up</Link>
            </div>
            </form>
        
        </div>
        </body>
        
      
    );
  }
  
  export default LoginPage;