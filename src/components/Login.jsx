import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';


const Login = () => {
 const [emailId, setEmailId] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState("");
 const [firstName, setFirstName] = useState("");
 const [lastName, setLastName] = useState("");
 const [isLogin, setIsLogin] = useState(true);
 const [rePassword, setRePassword] = useState("");

 const dispatch = useDispatch();
 const navigate = useNavigate();
const handlLogin = async () => {
try{

     
    const res = await axios.post(BASE_URL+"/login" ,{
        emailId,
        password 
    },{
        withCredentials: true
    });

    console.log(res);
    dispatch(addUser(res.data));
    navigate("/");
}
catch(err){
  setError(err?.response?.data || "Something went wrong");
  
}

};


const handleSignup = async () => {
  try{
    if(!verifyRePass()) return;
    const res = await axios.post(BASE_URL+"/signup",{
      firstName, lastName, emailId, password
    }, {
      withCredentials:true,
    });
   
    dispatch(addUser(res.data.data));
    return navigate("/profile");
  }
  catch(err){
    setError(err?.response?.data || "Something went wrong");
    
  }
}

const verifyRePass = () => {
  if (password != rePassword) {
    setError("Passwords do not match");
   return false;
  } else return true;
}
  return (
    <div className='flex justify-center my-10'>
        <div className="card bg-base-300 w-96 shadow-xl">
    <div className="card-body">
      <h2 className="card-title justify-center">{isLogin? "Login" : "SignUp"}</h2>
     
     
      <div >
{  !isLogin &&  ( <><label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">First Name</span>
  </div>
  <input type="text" className="input input-bordered w-full max-w-xs" 
    value = {firstName}
    onChange={(e)=>{setFirstName(e.target.value)}}
  />

</label> 
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Last Name</span>
  </div>
  <input type="text" className="input input-bordered w-full max-w-xs" 
    value = {lastName}
    onChange={(e)=>{setLastName(e.target.value)}}
  />

</label>
</>
)}

      <label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Email ID</span>
  </div>
  <input type="text" className="input input-bordered w-full max-w-xs" 
    value = {emailId}
    onChange={(e)=>{setEmailId(e.target.value)}}
  />

</label>

<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Password</span>
  </div>
  <input type="text" className="input input-bordered w-full max-w-xs" 
  value={password}
  onChange={(e)=>{setPassword(e.target.value)  }}
  />

</label>

{ !isLogin && (<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Password Again</span>
  </div>
  <input type="text" className="input input-bordered w-full max-w-xs" 
  value={rePassword}
  onChange={(e)=>{setRePassword(e.target.value) }}
  />

</label>)}

      </div>
      <p className='text-red-500'>{error}</p>
      <div className="card-actions justify-center m-2">
        <button className="btn btn-primary" onClick={isLogin? handlLogin : handleSignup}>{isLogin? "Login" : "SignUp"}</button>
      </div>
      <p className='m-auto cursor-pointer py-2'
      onClick={()=>setIsLogin(!isLogin)}
      >{isLogin? "New user? SignUp here" : "Existing user? Sign In here "}</p>
    </div>
  </div></div>
  )
}

export default Login;