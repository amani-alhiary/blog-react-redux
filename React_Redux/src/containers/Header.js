import React from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";

const Header = () => {

  let navigate=useNavigate();
  
  function logout() {
   sessionStorage.clear();
    navigate('/')
  }



  return (
    <div className="ui fixed menu">
     

 
        {sessionStorage.getItem("username")!== null?<><li><Link className="navbar-brand" to='/blogs'>Blogs</Link></li>
        {/* {sessionStorage.getItem('role')==="admin"?<li><Link className="navbar-brand" to='/Admindashboard'>Dashbord</Link></li>
        :<> </>} */}
        <li>Hello, {sessionStorage.getItem('username')}</li><li><button className="btn btn-outline-danger btn-sm" onClick={logout} >LOGOUT</button></li></>
        :<><li><Link  className="navbar-brand" to='/'>Login</Link></li></>}


  
   
     
    </div>
  );
};

export default Header;
