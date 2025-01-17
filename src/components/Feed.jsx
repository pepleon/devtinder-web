import React, { useEffect } from 'react';
import {BASE_URL} from "../utils/constants.js"
import {useDispatch, useSelector} from "react-redux"
import axios from 'axios';
import { addFeed } from '../utils/feedSlice.js';
import UserCard from './UserCard.jsx';
import { useNavigate } from 'react-router-dom';
const Feed = () => {

const navigate = useNavigate();
const dispatch = useDispatch();
const feed = useSelector((store)=> store.feed);

const getFeed = async () => {
  
   if(feed) return;
  try {const res = await axios.get(BASE_URL+"/feed", {
    withCredentials: true
  });
  dispatch(addFeed(res.data));}



  catch(err){
    console.error(err.message);
    navigate("/login");
  }

}



useEffect(()=>{
  getFeed();
},[])


if(!feed || feed.length === 0) return <h1  className="flex justify-center my-10">No User left</h1>;

  return feed && (
    <div className='flex justify-center my-10'>
      < UserCard user={feed[0]}/>
    </div>
  )
}

export default Feed;