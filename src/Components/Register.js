import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();
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
        const sendData = {
            useremail:data.useremail,
            password:data.password,
            usercovers:data.usercovers,
            userallergies:data.userallergies,
            
        }
        const res = await axios.post("http://localhost/quai_antique/backend/user.php", sendData);
        console.log(res.data)
        if(res.data.success){
            setMessage(res.data.success);
            navigate('/');
        }
    }

    const [message, setMessage] = useState("");

    return(
        <React.Fragment>
            <div className='container'>
                <div className='row'>
                <div className='col-md-6 mt-4'>
                    <h5 className='mb-5'>Créer un compte</h5>
                    <p className='text-warning'>{message}</p>
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
                        <label className="col-sm-2 col-form-label">Nombre de couvert(s)</label>
                        <div className="col-sm-10">
                        <input type="number" min="0" max="40"  className="form-control" id="usercovers" name="usercovers" value={data.usercovers} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Allergies</label>
                        <div className="col-sm-10">
                        <input type="text"  className="form-control pb-5" id="userallergies" value={data.userallergies} name="userallergies" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                        <input type="submit" name="submit" value="S'enregistrer"></input>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Register;