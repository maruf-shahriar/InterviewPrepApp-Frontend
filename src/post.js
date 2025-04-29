import './css/post.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

import Navbar from './navbar';
import PostSearch from './postSearch';
import NewPost from "./newPost";

function Post() {
    const baseUrl = "https://interviewapp.pythonanywhere.com/api/post/post/"
    const [myPost, setPostData] = useState([]);
    const [Error, setError] = useState("");
    const[paginationError, setPaginationError] = useState("");
    const[nextUrl, setNextUrl] = useState();
    const[previousUrl, setPreviousUrl] = useState();
    const[search, setSearch] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        axios
          .get(baseUrl)
          .then((response) => {
              console.log(response.data.results)
              setPostData(response.data.results)
              setNextUrl(response.data.next)
              setPreviousUrl(response.data.previous)
              
            })
          .catch((error) => {
            setError(error.message)
            if (error.message == "Request failed with status code 401") {
              navigate('/login')
            }
          });
      }, []);
    
    const PaginationHandler = (url) => {
        axios
          .get(url)
          .then((response) => {
            setPostData(response.data.results)
            setNextUrl(response.data.next)
            setPreviousUrl(response.data.previous)
          }) 
          .catch((error) => setPaginationError(error.message));
    }

    const searchPost = (e) => {
      e.preventDefault();
      navigate(`/post/filter/search=${search}`)
    }

    return (
      
        <body className="postbody">
          <Navbar/>
          <PostSearch/>
          
        {/*<input type="text" name="search_field"  onChange={(e)=>setSearch(e.target.value)} required />
        <button  onClick={searchPost}><b>Search</b></button>*/}
         <NewPost/> 
        <div className="Post">
        
        {Error === "Request failed with status code 401" && <div className='alert alert-danger' role = 'alert'>You Can Not See Any Post Before Logging In. <Link to={"/login"}>Log In</Link> </div>}
        
       
        {myPost.map((feed) => {
            const {title, date, author_name, pk, category, cover, author, bump} = feed;
        
          return(
                <div className="card">
                  <div class="card__img-container">
                    <img class="card__img" src={cover} alt="post image" />
                  </div>
                  <div class="card__body | flow">
                      <h3 class="card__title">{title}</h3>
                  </div>
                  <div class="card__tags">
                       <span class="card__tag" >{category}</span>
                  </div>
                  <p class="card__date">
                    Posted On - {date}
                  </p>
                  <p class="card__date">
                    
                    Posted By - <Link to = {'/profile/user/'+ author + "/" + author_name}>{author_name}</Link>
                  </p>
                  <p class="card__date">Likes - {bump}</p>
                  <Link class="card__cta" to = {'/post/details/' + pk}>Read more</Link>
                </div>
            )
        
        })}
        
        </div>
        <div className='pnb'>
        
        {previousUrl &&
        <button className='prebton' onClick={()=>PaginationHandler(previousUrl)}><span className="p" aria-hidden="true">&laquo;</span>Previous</button>}
        {nextUrl &&
        <button className='prebton' onClick={()=>PaginationHandler(nextUrl)}>Next<span className="n" aria-hidden="true">&raquo;</span></button>}
        </div>
        </body>
      
    );
  }
  
  export default Post;