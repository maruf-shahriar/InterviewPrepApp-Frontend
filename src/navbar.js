import './css/navbar.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

function Navbar(){
    
    const [username, setUsername] = useState("");
    const [isError, setIsError] = useState("");
    const navigate = useNavigate();
    const Access = localStorage.accessToken
    useEffect(() => {
        axios.interceptors.request.use(
          config => {
            config.headers.authorization = `JWT ${Access}`;
            return config;
          },
          error => {
            return Promise.reject(error); 
          }
        )
        //                                                                        Getting Current Username and ID
        axios
          .get(
            "https://interviewapp.pythonanywhere.com/auth/users/me/"
        )
          .then((response) => {
              console.log(response.data)
              setUsername(response.data.username)
          })
          .catch((error) => setIsError(error.message)); 
      }, []);

      function logout(){
        window.localStorage.removeItem("accessToken");
        navigate('/')
    }

    return(

        <body className='navbarBody'>
        <header className='hd'>
        <div className="navbar">
          <h1 className='lgo'>Zar<span>Code</span></h1>
            <ul>
            
            <li><a className="testing" href='/'><i class="fa fa-home" id="iconleft" />Home</a></li>
            
            <li><a className="testing" href = "/about"><i class="fa fa-info-circle" id="iconleft" />About</a></li>
            <li><a className="testing" href = "/post"><i class="fa fa-newspaper" id="iconleft"/>Feed</a></li>
            <li>
              <a className="testing" href = "#">Category <i class="fa fa-caret-down"/></a>
              <div class="dropdown-menu">
                      <ul>
                        <li><a href="/post/filter/category=entertainment">Entertainment</a></li>
                        <li><a href="/post/filter/category=questions">Question</a></li>
                        <li><a href="/post/filter/category=experiences">Experience</a></li>
                      </ul>
              </div>
              </li>
            <li>
              <a className="testing" href = "#">Sort by <i class="fa fa-caret-down"/></a>
              <div class="dropdown-menu">
                      <ul>
                        <li><a href="/post/filter/ordering=bump">Bump<i class="fa fa-angle-double-up" id="iconright"/></a></li>
                        <li><a href="/post/filter/ordering=-bump">Bump<i class="fa fa-angle-double-down" id="iconright"/></a></li>
                        <li><a href="/post/filter/ordering=date">Date<i class="fa fa-angle-double-up" id="iconright"/></a></li>
                        <li><a href="/post/filter/ordering=-date">Date<i class="fa fa-angle-double-down" id="iconright"/></a></li>
                      </ul>
              </div>
              </li>
            
           {localStorage.accessToken != null && <li><a className="testing" href ="/profile"><i class="fa fa-user-circle" id="iconleft" />{username}</a></li>}
           {localStorage.accessToken != null && <li><button className='navbton' onClick = {logout} ><i class="fa fa-power-off" id="iconleft"/>Log Out</button></li>}
          </ul>
          
          </div>
          
          </header>
          
          
          
          
          
             
    </body>
    )
}
export default Navbar;