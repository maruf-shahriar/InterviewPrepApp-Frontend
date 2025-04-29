import './css/postDetails.css'
import Navbar from './navbar';
import { Link, useParams, useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';
const baseUrl = "https://interviewapp.pythonanywhere.com/api/post/post/"
const user = "https://interviewapp.pythonanywhere.com/auth/users/me/"

const Access = localStorage.accessToken
function PostDetailPage() {
    //                                                                             Post
    const {post_id} = useParams()
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    const [author, setAuthor] = useState("");
    const [bump, setBump] = useState("");
    const[authorName, setAuthorName] = useState("");
    const[category, setCategory] = useState("");

    //                                                                             Comment
    const [commentData, setComment] = useState([]);
    const[commentTitle, setCommentTitle] = useState("");
    const[commentAuthor, setCommentAuthor] = useState("");
    const[commentAuthorName, setCommentAuthorName] = useState("");
    const[commentImage, setCommentImage] = useState("");
    

    //                                                                              Image
    const[image, setImage]= useState([]);
    const[coverImage, setCoverImage] = useState([]);
    const[postImage, setPostImage] = useState([]);
    //                                                                          Error Handling
    const [isError, setIsError] = useState("");
    const[commentError, setCommentError] = useState("");
    const[commentPostError, setCommentPostError] = useState("");
    const[bumpError, setBumpError] = useState("");

    //                                                                          currently logged in
    const[currentUser, setCurrentUser] = useState("");
    const[currentUserID, setCurrentUserID] = useState("");

    const navigate = useNavigate();
    useEffect(() => {

      //                                                     AUTHOR that is CURRENTLY LOGGED IN (INTERCEPTOR AND .GET)                        


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
        setCurrentUserID(res.data.id)
        setCommentAuthor(res.data.id)
        setCommentAuthorName(res.data.username)
        setCurrentUser(res.data.username)
        //console.log(res.data.id)
      })
      //console.log(author)



      //                                                                   POST DETAILS of the CURRENT POST (.GET)


        axios
          .get(baseUrl + post_id + '/')
          .then((response) => {
              //console.log(baseUrl + post_id + '/')
              setText(response.data.text)
              setTitle(response.data.title)
              setDate(response.data.date)
              setAuthor(response.data.author)
              setBump(response.data.bump)
              setCoverImage(response.data.cover)
              setAuthorName(response.data.author_name)
              setCategory(response.data.category)
              
            })
            .catch((error) => {
              setIsError(error.message)
              if (error.message == "Request failed with status code 401"){
                navigate('/login')
              }
            });



          //                                                                 COMMENTS of CURRENT POST (.GET)

          axios
          .get(baseUrl + post_id + '/comment/')
          .then((res) => {
              //console.log(res)
              setComment(res.data)
              
              
            })
          .catch((error) =>setCommentError(error.message));
          //                                                                    Getting Images of Current Post

          axios
          .get(baseUrl + post_id + '/postImage/')
          .then((res) => {
            //console.log(res.data)
            setImage(res.data)
          })



      }, []);
      
    

    //                                                                      POSTING COMMENT WITH HEADER (.POST)

    const handleCommentImage = (e) => {
      console.log(e.target.files)
      setCommentImage(e.target.files[0])
    }

    const commentHandler = (e) => {
      e.preventDefault();
      const commentUrl = baseUrl + post_id + '/comment/'

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
      formdata.append('text', commentTitle)
      formdata.append('author', commentAuthor)
      formdata.append('image', commentImage)
      formdata.append('author_name', commentAuthorName)
      axios({
        method: "post",
        url : commentUrl,
        data: formdata,
        headers: { "Content-Type": "multipart/form-data"},
      })
      .then(res => {
        console.log(res.data)
        window.location.reload();
        
      })
      .catch((error) => {
        if (error.response.text == "This field may not be blank."){
          alert("You cannot leave the text field empty")
        }
      });
      //window.location.reload();
    }


    //                                                               updating BUMP (.PUT)
    const bumpHandler = (e) => {
      axios
      .put(baseUrl + post_id + '/', {
        bump : bump + 1,
        author : author,
        text : text,
        title : title,
        category : category
      })
      .then(res => {
        console.log(res.data.bump)
        window.location.reload();
      })
      .catch((error) => setBumpError(error.message));
      
    }

    //                                                   Posting More Images with Add more Image (.POST)

    const handleImage = (e) => {
        console.log(e.target.files)
        setPostImage(e.target.files[0])
    }

    

    const imagehandle = (e) => {
      e.preventDefault();
      const formdata = new FormData()
      formdata.append('image', postImage)
      formdata.append('parent', post_id)
      const post = baseUrl + post_id + '/postImage/'
      
    axios({
      method: "post",
      url: post,
      data: formdata,
      headers: { "Content-Type": "multipart/form-data", Authorization: `JWT ${Access}` },
    })
    
      .then((res)=>{
        console.log(res)
        window.location.reload();
    })
    //window.location.reload();
    };

    const deletePost = (e) => {
      e.preventDefault();
      axios
      .delete(baseUrl + post_id + '/')
      .then(() => {
        alert("post deleted")
        navigate('/post')
      })
    }

    const deleteComment = (e, pk) => {
      e.preventDefault();
      axios
      .delete(baseUrl + post_id + '/comment/' + pk + '/')
      .then(() => {
        alert("comment deleted")
        window.location.reload();
      })
    }

    const editPost = (e) => {
      e.preventDefault();
      navigate(`/post/edit/${post_id}`)
    }

    const reportPost = (e) => {
      e.preventDefault();
      navigate(`/post/report/${post_id}`)
    }
    const editComment = (e, pk) => {
      e.preventDefault();
      navigate(`/post/${post_id}/comment/${pk}/edit`)
    }
    return (
        
            <body className='detailBody'>
                <Navbar/>
                <div className="PostDetailPage">
                {isError === "Request failed with status code 401" && <div className='alert alert-danger' role = 'alert'>You are not Logged in. <Link to={"/login"}>Log In</Link> </div>}
                
                <div className = "detailsCard">
                  
                  <div className = "grid-c">
                    <div className="grid-items1"><h1 className="titl">{title}</h1></div>
                    <div className="grid-items2">
                      <a target="_blank" href = {coverImage}><img className = "cardImg" src={coverImage}/></a>
                    </div>
                    
                  </div>
                  <div className='t'>
                  <p className="txti">{text}</p>
                  </div>
                  <div className="idn">
                  <p>Posted on - {date}</p>
                  {commentAuthorName !== authorName &&
                  <p>Posted by - <Link className="pro" to = {'/profile/user/' + author + '/' + authorName}>{authorName}</Link></p>}
                  {commentAuthorName === authorName && <p>Posted by - <Link className="pro" to = {'/profile/'}>{authorName}</Link></p>}
                  <p>Likes - {bump}</p>
                  
                  </div>
                  <div className='b'>
                  <button className="like" onClick = {bumpHandler}><i className="fa fa-thumbs-up" id="iconleft"/>Like</button>
                  {commentAuthorName === authorName && 
                  <button className="editPost" onClick = {editPost}><i className='fa fa-edit' id="iconleft"/>Edit</button>
                  }
                   {commentAuthorName === authorName &&
                  <button className="deletePost" onClick={deletePost}><i className='fa fa-trash' id="iconleft"/>Delete</button>}

                  {commentAuthorName !== authorName &&
                  <button className="deletePost" onClick={reportPost}><i className='fa fa-ban' id="iconleft"/>Report</button>}  
                  </div>
                  
                </div>



                {commentAuthorName === authorName && <div className='addcard'>
                
                  <label for="formFile" class="form-label">Add more images</label>
                  <input class="form-control" type="file" id="formFile" accept = "image/*" onChange={handleImage}/>
                  
                <button className='bi' onClick = {imagehandle}><i className='fa fa-upload' id="iconleft"/><b>Upload Image</b></button>
                
                </div>}
                {image.length != 0 && <h1 className="more" >More Images</h1>}
                {image.map((images) => {
                      const {image} = images;
                      return(
                        <div className='icard'>
                        <div className = "image">
                          <a target="_blank"  href ={image}><img className='ci' src={image} /></a>
                          
                        
                          </div>
                        </div>

                      )
                })}

                <div className='cp'>
                <h2 className='writeComment'>Post Comment</h2>
                
                  
                  <label for="comment" className='cmnt'><b>Comment: </b></label>
                  <input type="text" class="form-control" id="hlw" onChange={(e)=>setCommentTitle(e.target.value)}/>
                
                <div className='cmntimg'>
                  <label for="formFile" class="form-label">Comment image:</label>
                  <input class="form-control" type="file" id="formFile" accept = "image/*" onChange={handleCommentImage}/>
                </div>
                <button className="cmntbton" onClick = {commentHandler}><i className="fa fa-paper-plane" id="iconleft"/><b>Comment</b></button>
                </div>

                
                {commentData.length != 0 && <h2 className='com'>Comments</h2>}
                {commentData.map((comments) => {
                const {text, author_name, image, pk} = comments;
                
                return(
                <div className="Comment">
                    
                    <p className='cmnttxt'>{text}</p>
                    <p className='authortxt'> - {author_name} </p>
                    { image != null && <div className='cmntimgiiicard'>
                     <div className = "imagei">
                         <a target="_blank" href={"http://127.0.0.1:8000" + image}><img className='imagi' src = {"http://127.0.0.1:8000" + image} /></a>
                          
                        
                          </div>
                          
                        </div>}
                        {commentAuthorName === author_name && <div className='cbton'>
                          <button className="editcmnt" onClick = {(e) => editComment(e, pk)}><i className='fa fa-edit' id="iconleft"/>Edit</button>
                          <button className="deletecmnt" onClick={(e) => deleteComment(e, pk)}><i className='fa fa-trash' id="iconleft"/>Delete</button>
                        </div>}
                </div>
            )
        
        })}
                </div>
                </body>
    );
  }
  
  export default PostDetailPage;