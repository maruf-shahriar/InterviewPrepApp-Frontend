import './css/postReport.css';
import axios from 'axios';
import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
function PostReport(){
    const[type, setType] = useState("");
    const[error, setError] = useState("")
    const{post_id} = useParams();
    const Access = localStorage.accessToken
    const navigate = useNavigate();
    const report = (e) => {
        e.preventDefault();
        
        
        const link = "https://interviewapp.pythonanywhere.com/admin/post/post/" + post_id + "/change/";
        const formdata = new FormData();
        formdata.append("postLink", link)
        formdata.append("type", type)
        axios({
            method: "post",
            url : "https://interviewapp.pythonanywhere.com/api/post/report/",
            data: formdata,
            headers: { "Content-Type": "multipart/form-data", Authorization: `JWT ${Access}`},
        })
        .then((res)=> {
            console.log(res)
            alert("Post Reported")
            navigate('/post')
        })
        .catch((error)=>setError(error.message));
    }
    return(
        <body className='reportBody'>
            <div className='reportCard'>
            <h1 >{error}</h1>
            <label className='report'><b>Why Report this post? </b></label>
            <p className='pr'>Please select a problem</p>
            <select class="form-select" id="rprt" onChange={(e)=>setType(e.target.value)}>
                
                <option value="hate"><b>Hate Speech</b></option>
                <option value="spam"><b>Spam</b></option>
                <option value="irrelevant"><b>Irrelevant</b></option>
            </select>
            <button className="rprtbton" onClick={report}><b>Report</b></button>
            </div>
        </body>
    )
}
export default PostReport;