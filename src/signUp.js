import './css/signUp.css';

import {useState} from "react";
import axios from 'axios';
import { useNavigate,Link } from "react-router-dom";
const Url = "https://interviewapp.pythonanywhere.com/auth/users/"

function SignUp(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState();
    const [isError, setIsError] = useState("");

    const userData = {
        email,
        username,
        password
    };
    const signin = async (e) =>{
        e.preventDefault();
        try{
            const resp = await axios.post(Url, userData);
            navigate('/activate')
        }
        catch (error)  {
            if (error.response.data.email !== undefined) {
                alert(error.response.data.email)
                
            }
            if(error.response.data.password !== undefined){
                alert(error.response.data.password)
                
            }
            if (error.response.data.username !== undefined){
                alert(error.response.data.username)
                
            }
        }  
    }
    return(
        <body className="signupbody">
        <div className="singupPage">
            
            <form  class="signup">
            <h1 className="title">Create account</h1>
            <h2 className='acc'>Already have an account? <span className="spn"><Link to = '/login'>Log in</Link></span></h2>

               <div class="signup__field">
                    <input class="signup__input" type="text" name="username" id="username" onChange={(e)=>setUsername(e.target.value)} required />
                    <label class="signup__label" for="username">Username</label>
              </div>

             <div class="signup__field">
                    <input class="signup__input" type="text" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} required />
                    <label class="signup__label" for="email">Email</label>
            </div>

            <div class="signup__field">
                   <input class="signup__input" type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}required />
                   <label class="signup__label" for="password">Password</label>
           </div>
            
            <button className="Register" onClick={signin}><b>Sign Up</b></button>
            

            </form> 
            
            
            
        
        </div>
        </body>
    );
}
export default SignUp;