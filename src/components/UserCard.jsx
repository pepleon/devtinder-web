import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import {removeUserFromFeed} from "../utils/feedSlice";

const UserCard = ({user, edit}) => {
if(!user) return;

const {firstName, lastName, photoURL, age, gender, about } = user;
const dispatch = useDispatch();

const handleSendRequest = async (status, _id) => {
try{

const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,{ },{
  withCredentials: true,
});

dispatch(removeUserFromFeed(_id));

}catch(err){


}

}

  return (
    <div className="card bg-base-300 w-80 shadow-xl">
  <figure>
    <img
      src={photoURL}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    <p>{(age || " ") + (age && gender ? ", " : "") + (gender || " ")}</p>
    <p>{about}</p>
   { !edit && (<div className="card-actions justify-center my-4">
      <button className="btn btn-primary"
      onClick={()=> handleSendRequest("ignored",user._id)
      }>Ignore</button>
      <button className="btn btn-secondary"
      onClick={()=> handleSendRequest("interested",user._id)
      }
      
      >Interested</button>
    </div>)
    }

    { edit &&  (<div className="card-actions justify-center my-4">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div> )
    }
  </div>
</div>
  )
}

export default UserCard;