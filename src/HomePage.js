import './css/HomePage.css';
import About from "./about";
function HomePage() {
    return (
      <body className='homeBody'>
        <div className='nav'>
           <h1 className='logo1'>Zar<span>Code</span></h1>
           <ul>
           <li><a href = '/'><i class="fa fa-home" id="iconleft" />Home</a></li>
           <li><a href = "#gi"><i class="fa fa-info-circle" id="iconleft" />About</a></li>
           <li><a href = "/post"><i class="fa fa-newspaper" id="iconleft"/>Feed</a></li>
           <li><a href="/signup"><i class="fa fa-user-plus" id="iconleft" />Sign Up</a></li>
           <li><a href = '/login'><i class="fa fa-share" id="iconleft"/>Sign In</a></li>
           </ul>
        </div>

        {/*<div className='bigger'>
          <div className='big'>
          <h1 className='bigtitle'>A New Platform to Prepare</h1>
          <div className='cntnt'>
            
          <div className='small'>
          <p>ZarCode is the all-in-one platform to know about Interview Information. Users can post about their interview experiences, gain knowledge about interview procedures of top tech companies, ask their questions and have discussions on trending tech topics.</p>
          </div>
          <div className='lft'></div>
          </div>
          </div>
          </div>*/}
          <div className='x'>
          <section className='homei'>
                <div className='contenti'>
                    
                    <div className='txtii'>
                        <h1>A New Platform to Prepare</h1>
                        <p>ZarCode is the all-in-one platform to know about Interview Information. Users can post about their interview experiences, gain knowledge about interview procedures of top tech companies, ask their questions and have discussions on trending tech topics.</p>
                    </div>
                    <div className='leftii'></div>        
                  </div>        
                            
                        
                        
                    
                
            </section>
            </div>
          
          <div id="gi">
          <About/>
          </div>

        

      </body>
        
      
                
           
        
      
    );
  }
  
  export default HomePage;