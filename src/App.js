import './Style.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Postlist from './Components/Postslist';
import Footer from './Components/Footer';
import Addpost from './Components/Addpost';
import Posts from './Components/Posts';
import Editpost from './Components/Editpost';
import Register from './Components/Register';
import Login from './Components/Login';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/postslist" element={<Postlist/>}/>
          <Route path="/addpost" element={<Addpost/>}/>
          <Route path="/posts" element={<Posts/>}/>
          <Route path="/editpost/:id" element={<Editpost/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
