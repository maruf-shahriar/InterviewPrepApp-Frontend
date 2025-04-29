import './css/postSearch.css';
import { useNavigate } from "react-router-dom";
import {useState} from "react";
function PostSearch(){
    const[search, setSearch] = useState("");
    const navigate = useNavigate();
    const searchPost = (e) => {
        e.preventDefault();
        navigate(`/post/filter/search=${search}`)
      }
    return(
        <body className="searchBody">
          <div className="wrap">
          <div className="search">
            <input type="text" class="searchTerm" placeholder="What are you looking for?" onChange={(e)=>setSearch(e.target.value)} required />
           <button type="submit" class="searchButton" onClick={searchPost}>
           <i className="fa fa-search"></i>
          </button>
          </div>
          </div>
          </body>
          
    )
}
export default PostSearch;