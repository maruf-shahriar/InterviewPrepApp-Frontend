import './css/newPost.css';
import './css/editPost.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate, Link, useParams } from "react-router-dom";
const user = "https://interviewapp.pythonanywhere.com/auth/users/me/"
function EditPost(){
    const{post_id} = useParams()
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

      //                                                                      Current Post Infos

      axios
      .get( "https://interviewapp.pythonanywhere.com/api/post/post/" + post_id + "/")
      .then((response) => {
        setText(response.data.text)
        setTitle(response.data.title)
        setCategory(response.data.category)
        
      })
    .catch((error) => {
      if (error.message == "Request failed with status code 401"){
        navigate('/login')
      }
    });
    }, [])
  
  
    //                                                                           IMAGE HANDLING AND POSTING (.POST)
  
    const  handleImage = (e) => {
        console.log(e.target.files)
        setImage(e.target.files[0])
    }
  
  
    //                                                                             Editing POST (.PUT)
    const edit = (e) =>
    {
      e.preventDefault();
      console.log(image)
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
        method: "put",
        url : "https://interviewapp.pythonanywhere.com/api/post/post/" + post_id + "/",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data"},
      })
      
        .then((res)=>{
          console.log(res)
          navigate(`/post/details/${post_id}`)
      })
      .catch((error)=>{
          setPostError(error.message)
      });
      //window.location.reload(true);
    }
  
  
  
      return (
        
       <body className="editBody">
         <div className="newpostPage">
           {postError === "Request failed with status code 401" && <div className='alert alert-danger' role = 'alert'>You Can Not Post Anything without Logging In. <Link to={"/login"}>Log In</Link> </div>}
           <form  className="newpost" onSubmit={e => e.preventDefault()}>
              <h1 className="heading"><b>Edit Post</b> </h1>
              
              <form className='newposti'>
                  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Title" value = {title} onChange={(e)=>setTitle(e.target.value)} required/>
                  
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter Text" value={text} onChange={(e)=>setText(e.target.value)} required/>
                 
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
              <button className="postButton" onClick = {edit}><i className='fa fa-edit' id="iconleft"/><b>Edit</b></button>
              </div>
              </form> 
        </div>
         </body>
      );
}
export default EditPost;