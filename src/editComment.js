import './css/postDetails.css'
import './css/editComment.css'
import {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
function EditComment(){
    const{post_id} = useParams();
    const{comment_id} = useParams();
    const[commentText, setCommentText] = useState("");
    const[commentImage, setCommentImage] = useState("");
    const[commentAuthor, setCommentAuthor] = useState("");
    const[commentAuthorName, setCommentAuthorName] = useState("");
    const navigate = useNavigate();
    const Access = localStorage.accessToken
    useEffect(()=>{
        axios
        .get("https://interviewapp.pythonanywhere.com/api/post/post/" + post_id + "/comment/" + comment_id + "/")
        .then((res)=>{
            setCommentText(res.data.text)
            setCommentAuthorName(res.data.author_name)
            setCommentAuthor(res.data.author)
        })
    }, [])
    const handleCommentImage = (e) => {
        console.log(e.target.files)
        setCommentImage(e.target.files[0])
      }
  
      const commentHandler = (e) => {
        e.preventDefault();
        const commentUrl = "https://interviewapp.pythonanywhere.com/api/post/post/" + post_id + "/comment/" + comment_id + "/"
  
        axios.interceptors.request.use(
          config => {
            config.headers.authorization = `JWT ${Access}`;
            return config;
          },
          error => {
            return Promise.reject(error); 
          }
        )
  
        const formdata = new FormData();
        formdata.append('text', commentText)
        formdata.append('author', commentAuthor)
        formdata.append('image', commentImage)
        formdata.append('author_name', commentAuthorName)
        axios({
          method: "put",
          url : commentUrl,
          data: formdata,
          headers: { "Content-Type": "multipart/form-data"},
        })
        .then(res => {
          console.log(res.data)
          navigate(`/post/details/${post_id}`)
          
        })
        .catch((error) => alert("You're not logged in!"));
        //window.location.reload();
      }
    return(
        <body className='edtbody'>
        <div className='editi'>
        <div className='edt'>
            <h2 className='writeComment'>Edit Comment</h2>
                <label for="comment" className='cmnt'><b>Comment: </b></label>
                <input type="text" class="form-control" id="hlw" value={commentText} onChange={(e)=>setCommentText(e.target.value)}/>
                <div className='cmntimg'>
                  <label for="formFile" class="form-label">Comment image:</label>
                  <input class="form-control" type="file" id="formFile" accept = "image/*" onChange={handleCommentImage}/>
                </div>
                <button className="cmntbton" onClick = {commentHandler}><i className="fa fa-paper-plane" id="iconleft"/><b>Edit</b></button>
        </div>
        </div>
        </body>
    )
}
export default EditComment;