import './css/profile.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import Navbar from './navbar';
import { useParams, Link } from "react-router-dom";
function People(){
    const{profile_id} = useParams()
    const{username} = useParams()
    const [name, setName] = useState("");
    const [works_at, setWork] = useState("");
    const [gender, setGender] = useState("");
    const [avatar, setAvatar] = useState();
    const [myPost, setPostData] = useState([]);
    const[nextUrl, setNextUrl] = useState();
    const[previousUrl, setPreviousUrl] = useState();
    const[coverPhoto, setCoverPhoto] = useState();
    const[lives, setLives] = useState("");
    const[email, setEmail] = useState("");
    const[detail, setDetail] = useState("");

    const base = "https://interviewapp.pythonanywhere.com/api/user/profile/"
    const postUrl = "https://interviewapp.pythonanywhere.com/api/post/post/?search="
    useEffect(()=>{
        axios
        .get(base + profile_id + "/")
        .then((res)=>{
            console.log(res.data)
            setName(res.data.name)
            setWork(res.data.works_at)
            setGender(res.data.gender)
            setAvatar(res.data.avatar)
            setLives(res.data.lives)
            setCoverPhoto(res.data.coverPhoto)
        })
        axios
        .get(postUrl + username)
        .then((res)=> {
            setPostData(res.data.results)
            setNextUrl(res.data.next)
            setPreviousUrl(res.data.previous)
        })
    },[])
    const PaginationHandler = (url) => {
        axios
          .get(url)
          .then((response) => {
            setPostData(response.data.results)
            setNextUrl(response.data.next)
            setPreviousUrl(response.data.previous)
          }) 
    }
    return(
        <body className="profileBody">
          <Navbar/>
            <div className="ProfilePage">
        
        
        <div className='profile-container'>
          <img src={coverPhoto} alt="cover" className='cover-img'/>
          <div className='profile-details'>
            <div className='pd-left'>
              <div className='pd-row'>
              <img src = {avatar} className='pd-img'/>
              <div>
                <h3 className='pd-name'>{name}</h3>
                <p className='pd-username'>@{username}</p>
              </div>
              </div>
            </div>
            <div className='pd-right'>
                        
            </div>
          </div>
           
           <div className='profile-info'>
             <div className='info-col'>
                <div className='profile-intro'>
                  <h3 className='about'>About</h3>
                  <hr></hr>
                  <ul>
                    <li><i className="fa fa-briefcase" id="iconleft"/>Works at <b>{works_at}</b></li>
                    <li><i className="fa fa-map-marker" id="iconleft"/> From <b>{lives}</b> </li>
                    <li><i className="fa fa-venus-mars" id="iconleft"/>{gender}</li>
                    <li><i className="fa fa-envelope" id="iconleft"/> {email}</li>
                  </ul>
                </div>
             </div>
             <div className='post-col'>
                
           
            
            
            {/*  */}
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
           </div>
        </div>
        <div className='pnb'>
        
        {previousUrl &&
        <button className='prebton' onClick={()=>PaginationHandler(previousUrl)}><span className="p" aria-hidden="true">&laquo;</span>Previous</button>}
        {nextUrl &&
        <button className='prebton' onClick={()=>PaginationHandler(nextUrl)}>Next<span className="n" aria-hidden="true">&raquo;</span></button>}
        </div>
        
        
        
	      
      </div>
        </body>
        
       
    )
} 
export default People;