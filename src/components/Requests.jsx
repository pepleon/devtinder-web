import React, { useEffect, useState } from 'react';
import {BASE_URL} from "../utils/constants";
import { useDispatch,useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';
import axios from 'axios';
import RequestToast from './RequestToast';

const Requests = () => {
const requests = useSelector((store)=> store.requests);
const dispatch = useDispatch();
const [mess, setMess] = useState(false);
const [status,setStatus] = useState("");


const reviewRequest =  async(status,ID) =>{
  try{

    const res = await axios.post(BASE_URL+'/request/review/'+status+'/'+ID,{}, {
      withCredentials: true,
    });
    
  setMess(true); 
  setTimeout(() => setMess(false), 3000);

    return true;

  }
  catch(err){
    console.error(err.message);
  }
}


const fetchRequests = async() => {
  try{

    const res = await axios.get(BASE_URL+"/user/requests/received",{
      withCredentials: true,
    })

  dispatch(addRequests(res.data?.data));
  
  
  
  }
  catch(err){
    console.error(err.message);
  }
}



useEffect(()=>{
  fetchRequests();
},[]);

//if(!requests) return;
//if(requests.length ===0) return <div><h1 className='flex justify-center my-10'>No requests</h1>

//</div>;

  return (
    <div className='text-center justify-center my-10'>
<RequestToast mess={mess} status={status}/>


{
  (!requests || requests.length === 0) ? (
    <h1 className="flex justify-center my-10">No requests</h1>
  ) : (

<>

<h1 className='text-bold text-3xl text-white'>Requests</h1>
      {
      requests.map((request)=>{ 
      const ID = request._id;
      const {firstName, lastName, photoURL, about, age, gender, _id} = request.fromUserId;
      if(!(request?.status === "interested")) return;
      
        return (
        
        <div key={_id} className='m-7 p-3  md:m-4 md:p-4 bg-base-300 rounded-lg flex w-full md:w-2/3  md:mx-auto mx-auto justify-between items-center'>
          <div className='flex items-center'> 
          <div><img alt='photo' className='w-20 h-20 rounded-full' src={photoURL}/></div>
          <div className='text-left mx-4'>
          <h2 className='font-bold text-xl'>{firstName +" "+lastName}</h2>
          {age&& gender&& <p>{age+", "+gender}</p>}
          <p>{about.length > 20 ? about.substring(0, 20) + "..." : about}</p>
          </div>
          </div>
        <div>
        <button className="btn btn-primary md:mx-2 size-13  md:size-max m-5"
        onClick={()=>{ reviewRequest("rejected", ID);
          dispatch(removeRequest(request._id));
          setStatus("Rejected");
        }
          }
        >Reject</button>
        <button className="btn btn-secondary md:mx-2 size-13  md:size-max"
        
        onClick={() => {reviewRequest("accepted", ID);
          dispatch(removeRequest(request._id));
          setStatus("Accepted");
  
        }
        }
        >Accept</button>
          </div>  

  


        </div>



        )
    }
 ) 
    }

</>
  )
}
    </div>

  
  ) 



}

export default Requests;