import React, {useState, useContext} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../context/UserContext';


const Login = () => {

    const [data, setData] = useState({
        useremail: '',
        password: '',
        usercovers: '',
        userallergies: '',
    });

    const handleChange= (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
      
        const res = await axios.post("http://localhost/quai_antique/backend/login.php");
        console.log(res)
    }

    return(
        <React.Fragment>
            <div className='container'>
                <div className='row'>
                <div className='col-md-6 mt-4'>
                    <h5 className='mb-5'>Créer un compte</h5>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                        <input type="email" className="form-control" id="useremail" value={data.useremail} name="useremail" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                        <input type="password" className="form-control" id="inputPassword" name="password" value={data.password} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                        <input type="submit" name="submit" value="Se connecter"></input>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </React.Fragment>
    
    )
}

export default Login;