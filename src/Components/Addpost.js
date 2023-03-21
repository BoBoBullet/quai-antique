import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Addpost()
{
    const navigate = useNavigate();
    const[title, setTitle] = useState('');
    const[descr, setDescr] = useState('');
    const[img, setImg] = useState('');
    const[category, setCategory] = useState('');
    const[price, setPrice] = useState('');
    
    const uploadPost = async() => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('descr', descr);
        formData.append('img', img);
        formData.append('category', category);
        formData.append('price', price);

        const response = await axios.post("http://localhost/quai_antique/backend/addpost.php", formData, {
            headers:{'Content-Type':"multipart/form-data"},
        });

        if(response.data.success){
            setMessage(response.data.success);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }

    const [message, setMessage] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        await uploadPost();


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
                        <input type="text" className="form-control" id="title" name="title" onChange={ (e)=>setTitle(e.target.value)}/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">description</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control pb-5" id="descr" name="descr" onChange={ (e)=>setDescr(e.target.value)}/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">prix</label>
                        <div className="col-sm-10">
                        <input type="number" min="0" step="0.01" max="999" className="form-control pb-5" id="price" name="price" onChange={ (e)=>setPrice(e.target.value)}/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Image</label>
                        <div className="col-sm-10">
                        <input type="file" className="form-control" id="img" name="img" onChange={ (e)=>setImg(e.target.files[0])}/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Catégorie</label>
                        <div className="col-sm-10">
                        <select name="category" className="form-select" id="category" onChange={ (e)=>setCategory(e.target.value)}>
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
                        <button name="submit" className='btn btn-success'>Soumettre</button>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Addpost;