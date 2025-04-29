import "./css/activate.css";
import { Link} from 'react-router-dom';
function Activate() {
    return(
        <body className="activateBody">
        <div className = "activate">
            <h1 className='logo'>Zar<span>Code</span></h1>
            <hr></hr>
            <h1 className="dl">We've sent an email to your account. Please check your email and activate your account.</h1>
            <h1 className="dli">If you activated your account, Try to <Link className="lg" to="/login">Log In.</Link></h1>
            
                            
                         
        </div>
        </body>
    );
}
export default Activate;