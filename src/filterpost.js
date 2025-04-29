import './css/post.css';
import Navbar from './navbar';
import {useEffect, useState} from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

function FilterPost() {
    const {criteria} = useParams()
    const baseUrl = "https://interviewapp.pythonanywhere.com/api/post/post/?"
    const [myPost, setPostData] = useState([]);
    const [isError, setIsError] = useState("");
    const[nextUrl, setNextUrl] = useState();
    const[previousUrl, setPreviousUrl] = useState();
    const[count, setCount] = useState("");
    
    useEffect(() => {
      console.log(baseUrl + criteria)
        axios
          .get(baseUrl + criteria)
          .then((response) => {
              console.log(response.data.results)
              setPostData(response.data.results)
              setNextUrl(response.data.next)
              setPreviousUrl(response.data.previous)
              setCount(response.data.count)
            })
          .catch((error) => setIsError(error.message));
      }, []);
    
    const PaginationHandler = (url) => {
        axios
          .get(url)
          .then((response) => {
            setPostData(response.data.results)
            setNextUrl(response.data.next)
            setPreviousUrl(response.data.previous)
          }) 
          .catch((error) => setIsError(error.message));
    }
     
    return (
      
      <body className="postbody">
      <Navbar/>
      
    <div className="Post">
    
    {isError === "Request failed with status code 401" && <div className='alert alert-danger' role = 'alert'>You Can Not See Any Post Before Logging In. <Link to={"/login"}>Log In</Link> </div>}
   
   
    {myPost.map((feed) => {
        const {title, date, author_name, pk, category, cover, author,bump} = feed;
    
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
  export default FilterPost;