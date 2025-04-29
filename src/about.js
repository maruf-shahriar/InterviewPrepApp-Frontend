import './css/about.css';
import {Link} from 'react-router-dom';

function About(){
    return(
        <body className="aboutBody">
            <section className='abouti'>
                <div className='content'>
                    <div className='lefti'></div>
                    <div className='text'>
                        <h1>About App</h1>
                        <p>We created Zarcode because we felt the need of a platform where Interviewees can visit and know about the interview procedure of their favorite companies. </p>
                        <p>Zarcode aims to make interview preparation easier and efficient for interview candidates by providing them an easy access to information related to interview procedures.</p>
                        <p>Interview candidates can not only share their own experiences and read other people's experiences but they can also post about their queries and have discussions on topics.</p>
                        <p>So it truly is an all-in-one platform to know about any interview procedures and prep for your interview in the best way possible.</p>
                        
                            <div>
                            <Link to="/signup">
                                <button className='ca'><i class="fa fa-user-plus" id="iconleft" />Create Account</button>
                            </Link>
                            </div>
                        
                        
                    </div>
                </div>
            </section>

        </body>
    )
}
export default About;