import './css/newPost.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
const Url = "https://interviewapp.pythonanywhere.com/api/post/newpost/"
const img = "https://interviewapp.pythonanywhere.com/api/post/post/"
const user = "https://interviewapp.pythonanywhere.com/auth/users/me/"

function NewPost() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const[poster, setPoster] = useState("");
  const[postError, setPostError] = useState("");

  const Access = localStorage.accessToken
  const navigate = useNavigate();

  //                                                         AUTHOR that is CURRENTLY LOGGED IN and about to POST (INTERCEPTOR AND .GET)

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
    axios
    .get(user)
    .then((res) => {
      setAuthor(res.data.id)
      setPoster(res.data.username)
    })
  }, [])


  //                                                                           IMAGE HANDLING AND POSTING (.POST)

  const  handleImage = (e) => {
      console.log(e.target.files)
      setImage(e.target.files[0])
  }


  //                                                                             CREATING NEW POST (.POST)
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
        navigate(`/post/details/${res.data.pk}`)
    })
    .catch((error)=>{
      setPostError(error.message)
  });
    //window.location.reload(true);
  }



    return (
      
     <body className="newpostBody">
       <div className="newpostPage">
       {postError === "Request failed with status code 401" && <div className='alert alert-danger' role = 'alert'>You Can Not Post Anything without Logging In. <Link to={"/login"}>Log In</Link> </div>}
         <form  className="newpost" onSubmit={e => e.preventDefault()}>
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
                <option value="questions">Questions</option>
                <option value="entertainment">Entertainment</option>
                <option value="experiences">Experiences</option>
              </select>
            </div>
            
            </div>
            
            <div class="bton">
            <button className="postButton" onClick = {post}><i className='fa fa-paper-plane' id="iconleft"/><b>Post</b></button>
            </div>
            </form> 
      </div>
       </body>
    );
  }
  
  export default NewPost;