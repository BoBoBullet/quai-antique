import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

function Home()
{
    const [postData, setPostData] = useState([]);
    
    useEffect( () => {
        getPostData();
        }, []);

    const getPostData = async() => {
        const reqData= await fetch("http://localhost/quai_antique/backend/posts.php");
        const resData= await reqData.json();
        console.log(resData);
        setPostData(resData);
    }


    const [hover, setHover] = useState(false);

    const onHover = (e) => {
      e.preventDefault();
      setHover(true);
    };
  
    const onHoverOver = (e) => {
      e.preventDefault();
      setHover(false);
    };

    return(
        <React.Fragment>
            <div className='container'>
                <div className='posts'>
                {postData && postData.map((pData, index) =>(
                                        <div className="post" key={index}>
                                        <div className='image-wrapper'>
                                        <Link className='link' to={`/post/${pData.id}`}>
                                           <img className="image" src={`http://localhost/quai_antique/images/${pData?.img}`} alt={pData.title} 
                                                onMouseEnter={(e) => onHover(e)}
                                                onMouseLeave={(e) => onHoverOver(e)}>
                                            </img></Link>
                                            {hover && <div className='image-text'><h5 className={hover}>{pData.title}</h5></div>}
                                        </div>
                                </div>
                                    ))
                                }

                </div>
                <div>
                    <button className='button'>Réserver</button>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Home;