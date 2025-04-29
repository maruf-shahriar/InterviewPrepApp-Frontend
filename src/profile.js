import './css/post.css';
import './css/profile.css';
import './css/newPost.css';
import Navbar from './navbar';

import {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Url = "https://interviewapp.pythonanywhere.com/api/post/newpost/"

function Profile() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const[poster, setPoster] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [isError, setIsError] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [works_at, setWork] = useState("");
  const [gender, setGender] = useState("");
  const[lives, setLives] = useState("");
  const[email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const[coverPhoto, setCoverPhoto] = useState();
  const [myPost, setPostData] = useState([]);
  const[nextUrl, setNextUrl] = useState();
  const[previousUrl, setPreviousUrl] = useState();
  const[detail, setDetail] = useState("");
  const Access = localStorage.accessToken

  const navigate = useNavigate();


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
          setPoster(response.data.username)
          setEmail(response.data.email)
          setAuthor(response.data.id)
          
          axios
          .get("https://interviewapp.pythonanywhere.com/api/user/profile/" + response.data.id + "/")
          .then((res) => {
            setName(res.data.name)
            setWork(res.data.works_at)
            setGender(res.data.gender)
            setAvatar(res.data.avatar)
            setLives(res.data.lives)
            setCoverPhoto(res.data.coverPhoto)
          }) 
          .catch((error) =>{
            setDetail(error.message)
            console.log(error.message)
            console.log(detail)
          } );
          axios
          .get("https://interviewapp.pythonanywhere.com/api/post/post/?search=" + response.data.username)
          .then((response)=>{
              //console.log(response.data.results)
              setPostData(response.data.results)
              setNextUrl(response.data.next)
              setPreviousUrl(response.data.previous)
          })
      })
      .catch((error) => {
        let count = 0
        while (error.message === "Request failed with status code 401"){
          if (count === 1) {
            navigate('/login')
            break;
          }
          else{
            window.location.reload();
            count = count + 1
          }
          
         
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
      .catch((error) => setIsError(error.message));
  } 

  const  handleImage = (e) => {
    console.log(e.target.files)
    setImage(e.target.files[0])
}

const post = (e) =>
  {
    e.preventDefault();
    axios.interceptors.request.use(
      config => {
        config.headers.authorization = `JWT ${Access}`;
        return config;
      },
      error => {
        return Promise.reject(error); 
      }
    )
    const formdata = new FormData()
    formdata.append('title', title)
    formdata.append('text', text)
    formdata.append('author', author)
    formdata.append('category', category)
    formdata.append('author_name', poster)
    formdata.append('cover', image)
    
    axios({
      method: "post",
      url : Url,
      data: formdata,
      headers: { "Content-Type": "multipart/form-data"},
    })
    
      .then((res)=>{
        console.log(res)
        window.location.reload();
    })
    //window.location.reload(true);
  }
   
    function logout(){
        window.localStorage.removeItem("accessToken");
        navigate('/')
    
    }
    return (
      <body className='profileBody'>
        <Navbar/>
      <div className="ProfilePage">
        
        
        <div className='profile-container'>
        <a href={coverPhoto} target="_blank"><img src={coverPhoto} alt="cover" className='cover-img'/></a>
          <div className='profile-details'>
            <div className='pd-left'>
              <div className='pd-row'>
              <a href={avatar} target="_blank"><img src = {avatar} className='pd-img'/></a>
              <div>
                <h3 className='pd-name'>{name}</h3>
                <p className='pd-username'>@{username}</p>
              </div>
              </div>
            </div>
            <div className='pd-right'>
                        
                        {detail === "Request failed with status code 404" && <Link to = '/profile/create'>
                        
                                <button className='cfef'><i className='fa fa-edit' id="iconleft"/>Create Profile</button>
                        </Link>}
                        {detail !== "Request failed with status code 404" && <Link to = '/profile/edit'>
                           <button className='cfef'><i className='fa fa-edit' id="iconleft"/>Update Profile</button>
                        </Link>}   
                            
                        
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
             <form  class="newpost" onSubmit={e => e.preventDefault()}>
            <h1 className="heading"><b>Create new post</b> </h1>
            
            <form className='newposti'>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Title" onChange={(e)=>setTitle(e.target.value)} required/>
                {/*<input type="text" className="input-box" placeholder="Enter Title" onChange={(e)=>setTitle(e.target.value)} required/>*/}
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter Text" onChange={(e)=>setText(e.target.value)} required/>
                {/*<input type="text" className="input-box-text" placeholder="Enter Text"onChange={(e)=>setText(e.target.value)} required/>*/} 
            </form>   
           <div class="spt">
            <div class="postimage_field">
            <label class="image_label" for="image"><b>Image</b></label>
                
                <input class="image_input" type="file" name="image" accept = "image/*" onChange={handleImage}/>
                
            </div> 
            <div class="postCategory_field">
            <label class="category_label" for="category"><b>Category </b></label>
              <select name="category" onChange={(e)=>setCategory(e.target.value)}>
                <option value="questions"  >Questions</option>
                <option value="entertainment"  >Entertainment</option>
                <option value="experiences"  >Experiences</option>
              </select>
            </div>
            
            </div>
            
            <div class="bton">
            <button className="postButton" onClick = {post}><i className='fa fa-paper-plane' id="iconleft"/><b>Post</b></button>
            </div>
            </form>
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
    );
  }
  export default Profile;