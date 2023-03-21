import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Postslist()
{

    const [postData, setPostData] = useState([]);
    const [message, setMessage] = useState("");
    
    useEffect( () => {
        getPostData();
        }, []);

    const getPostData = async() => {
        const reqData= await fetch("http://localhost/quai_antique/backend/posts.php");
        const resData= await reqData.json();
        console.log(resData);
        setPostData(resData);
    }

    const handleDelete = async(id) => {
        const res = await axios.delete("http://localhost/quai_antique/backend/posts.php/"+id)
        setMessage(res.data.success);
        getPostData()
    }

    return(
        <React.Fragment>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <h5>Bienvenue au restaurant Quai Antique</h5>
                        <p className='text-warning'>{ message }</p>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Image</th>
                                <th scope="col">Catégorie</th>
                                <th scope="col">Prix</th>
                                <th scope="col">Gérer le post</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    postData && postData.map((pData, index) =>(
                                        <tr key={index}>
                                <td>{index+1}</td>
                                <td>{pData.title}</td>
                                <td>{pData.descr}</td>
                                <td><img className="image" src={`http://localhost/quai_antique/images/${pData?.img}`}></img></td>
                                <td>{pData.category}</td>
                                <td>{pData.price}</td>
                                <td>
                                    <Link to={"/editpost/"+pData.id} className='btn btn-success mx-2 m-1'>Editer</Link>
                                    <button className='btn btn-danger mx-2 m-1' onClick={() => handleDelete(pData.id)}>Supprimer</button>
                                </td>
                                </tr>
                                    ))
                                }
                                
                            </tbody>
                            </table>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Postslist;