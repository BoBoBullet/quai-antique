import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

function Editpost()
{
    const navigate = useNavigate();
    const {id} = useParams();

    const [formvalue, setFormvalue] = useState({
        title: '',
        descr: '',
        img: '',
        category: '',
    });

    const [message, setMessage] = useState("");

    const handleInput = (e) => {
        setFormvalue({...formvalue, [e.target.name]: e.target.value});
    }

    useEffect( () => {
        const postRawdata = async() =>{
            const getPostData = await fetch("http://localhost/quai_antique/backend/posts.php/"+id);
            const respostdata = await getPostData.json();
            setFormvalue(respostdata)
        }
        postRawdata()
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formaData = {id:id, title:formvalue.title, descr:formvalue.descr, img:formvalue.img, category:formvalue.category};
        const res = await axios.put("http://localhost/quai_antique/backend/posts.php", formaData);
        console.log(res.data)
        if(res.data.success){
            setMessage(res.data.success);
            setTimeout( () => {
                navigate('/posts');
            }, 2000);
        }
    }
    return(
        <React.Fragment>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 mt-4'>
                    <h5 className='mb-5'>Ajouter une publication</h5>
                    <p className='text-warning'>{message}</p>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Titre</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="title" name="title" value={formvalue.title} onChange={handleInput}/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">descrription</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control pb-5" id="descr" name="descr"value={formvalue.descr} onChange={handleInput}/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Image</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="img" name="img" value={formvalue.img} onChange={handleInput}/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Catégorie</label>
                        <div className="col-sm-10">
                        <select name="category" className="form-select" id="category" value={formvalue.category} onChange={handleInput}>
                             <option >Sélectionnez la catégorie</option>
                            <option value="1">Entrée</option>
                            <option value="2">Plat</option>
                            <option value="3">Dessert</option>
                            <option value="4">Boisson</option>
                            <option value="5">Menu</option>
                        </select>
                    </div>
                    </div>
                        <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                        <button name="submit" className='btn btn-success'>Mettre à jour</button>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Editpost;