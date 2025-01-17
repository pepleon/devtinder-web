import React, { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import {addUser} from '../utils/userSlice';

const EditProfile = ({user}) => {


const [firstName, setFirstName] = useState(user?.firstName);
 const [lastName, setLastName] = useState(user?.lastName);
 const [age, setAge] = useState(user?.age || "");
 const [gender, setGender] = useState(user?.gender || "");
 const [about, setAbout] = useState(user?.about);
 const [photoURL, setPhotoURL] = useState(user?.photoURL);
const [error, setError] = useState({});
const [mess, setmess] = useState(false);
const dispatch = useDispatch();



const saveProfile = async () => {
    try{
  const res = await axios.patch(BASE_URL+"/profile/edit", {firstName, lastName, age, about, gender, photoURL}, {
    withCredentials: true,
  });
 dispatch(addUser(res?.data?.data));
 setError({});
 setmess(true);

 setTimeout(()=>{
    setmess(false);
 }, 3000);
 
    }
    catch(err){
    setError(err.response.data);
    }
}



  return (
 <> <div className='flex justify-center my-10'>  <div className='flex justify-center mx-10'>
    <div className="card bg-base-300 w-96 shadow-xl">
<div className="card-body">
  <h2 className="card-title justify-center">Edit Profile</h2>
 
 
  <div >
  <label className="form-control w-full max-w-xs my-2">
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
value={lastName}
onChange={(e)=>{setLastName(e.target.value)}}
/>

</label>

<label className="form-control w-full max-w-xs my-2">
<div className="label">
<span className="label-text">Age</span>
</div>
<input type="text" className="input input-bordered w-full max-w-xs" 
value={age}
onChange={(e)=>{setAge(e.target.value)}}
/>

</label>




<label className="form-control w-full max-w-xs my-2">
<div className="label">
<span className="label-text">Gender</span>
</div>
<input type="text" className="input input-bordered w-full max-w-xs" 
value={gender}
onChange={(e)=>{setGender(e.target.value)}}
/>

</label>


<label className="form-control w-full max-w-xs my-2">
<div className="label">
<span className="label-text">Profile Photo</span>
</div>
<input type="text" className="input input-bordered w-full max-w-xs" 
value={photoURL}
onChange={(e)=>{setPhotoURL(e.target.value)}}
/>

</label>







<label className="form-control w-full max-w-xs my-2">
<div className="label">
<span className="label-text">About</span>
</div>
<input type="text" className="input input-bordered w-full max-w-xs" 
value={about}
onChange={(e)=>{setAbout(e.target.value)}}
/>

</label>

<p className='text-red-500'>{error.message}</p>

  </div>

  <div className="card-actions justify-center m-2">
    <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
  </div>
</div>
</div></div>






    <UserCard user = {{firstName, lastName, age, about, gender, photoURL}} edit = {true}  />


</div> 


{mess && <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile Saved successfully.</span>
  </div>
</div>}
</>
  )
}

export default EditProfile;