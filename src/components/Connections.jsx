import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { connect, useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import { Link } from 'react-router-dom'

const Connections = () => {

const connections = useSelector((store)=> store.connections);
const dispatch = useDispatch();
const fetchConnections = async () => {
    try {
 
  const res = await axios.get(BASE_URL+"/user/connections", {
    withCredentials: true,
  });

 dispatch(addConnections(res.data.data));
    }
    catch(err){
console.error(err.message);

    }
}


useEffect(()=>{
    fetchConnections()
    
}, []);


if(!connections) return;
if(connections.length === 0)return (<h1 className='flex justify-center my-10'>No connections found</h1>);


console.log("connections");
    console.log(connections);
  return (
    <div className='text-center justify-center my-10'>
        
        
        <h1 className='text-bold text-3xl text-white'>Connections</h1>
        
    
    {
      connections.map((connection)=>{ 
      
      const {firstName, lastName, photoURL, about, age, gender, _id} = connection;
      
        return (
        
        <div key={_id} className=' mx-auto m-7 md:m-4 p-7 md:p-4 bg-base-300 rounded-lg flex w-full md:w-1/2 md:mx-auto justify-between'>
         <div className='flex flex-row items-center'>
        
         <div><img alt='photo' className='w-20 h-20 rounded-full' src={photoURL}/></div>
          <div className='text-left mx-4'>
          <h2 className='font-bold text-xl'>{firstName +" "+lastName}</h2>
          {age&& gender&& <p>{age+", "+gender}</p>}
          <p>{about.length > 20 ? about.substring(0, 20) + "..." : about}</p>
          </div>

          </div>
          <div className='flex items-center'>
            <Link to={"/chat/"+_id}>
          <button className='btn btn-primary '>Chat</button>
          </Link>
          </div>
          
        </div>



        )
    })
    }
    
    
    </div>
  )
}

export default Connections;