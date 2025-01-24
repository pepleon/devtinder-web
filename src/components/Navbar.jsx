import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import {removeUser} from "../utils/userSlice";
import {removeFeed} from "../utils/feedSlice";



const Navbar = () => {

  const user = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogOut = async () => {

    try{

      await axios.post(BASE_URL+"/logout",{},{
        withCredentials: true,
      })

      dispatch(removeUser());
      dispatch(removeFeed());
      return navigate("/login");
    }
    catch(err){
      console.log(err.message);
    }
  } 
 

  console.log(user);



  return  (
    <div className="navbar bg-base-300">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">☁️ DevTinder</Link>
  </div>
  { user && 
   (<div className="flex-none gap-2">
    
    
      <div className='form-control'>Welcom, {user?.firstName}</div>
      
      <div className="dropdown dropdown-end  mx-5 flex">

      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
   



        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user?.photoURL} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li onClick={handleLogOut}><a>Logout</a></li>
      </ul>
    </div>
  </div>

) 
    
}
</div>
  )
}

export default Navbar;