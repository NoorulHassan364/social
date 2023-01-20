import React from 'react'
import "./styles/Home.css"
import Profile from './assets/Default.png'
import Like from './assets/like.png'
import Smile from './assets/smile.png'
import Celebrate from './assets/confetti.png'
import Koi from './assets/Floor.png'
import Tech from './assets/Leaf.jpg'
import Leaf from './assets/Koi.png'
import Bond from './assets/bond.png'
import Share from './assets/Share.png'
import Comment from './assets/Comment.png'
import Navbar from "./Navbar";
import ReactPaginate from 'react-paginate';


import Post from "./Post";
import { useState, useNavigate, useEffect, useRef } from 'react'
import { useSelector} from 'react-redux'
import { useCreatePostMutation, useGetPostsMutation , useGetUserMutation} from "../services/appApi";
import Fundraiser from './Fundraiser'

const HomeScreen = () => {
  const [createPost] = useCreatePostMutation();
  const [getPosts] = useGetPostsMutation();
  const [getUser] = useGetUserMutation();
  

  const posts = useSelector((state) => state.posts || []);
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const { _id, picture } = user || {};
  const textAreaEl = useRef(null);

  const onPost = (e) => {
    e.preventDefault();

    createPost({ user: _id, description: textAreaEl.current.value })
      .then((res) => { console.log(res); })
      .catch((err) => console.log(err));
  };
  
  useEffect(() => {
    getPosts();
    getUser();
  }, [])

  useEffect(() => {
    getUser();
  },[1])
  
  return (
    <div className='Container'>
      <Navbar/>

      <div className='MainContent'>
      
        <div className='Header'>
          <div>Home</div>
          <input className='Search' placeholder='Search'/>
        </div>
        <div className='TitleWrap'>
          <div>
        <h2 className='Title'>Companies raising funding now</h2></div>
        <select placeholder='Filter by catagory'> 
          <option>Filter by catagory</option>
        </select>
             </div>
        <div className='innerColumns'>
        

        <div className="BoxContainer">
          {/* <p>sdf</p> */}
          <Fundraiser/>
     
        </div>
        
        
          </div>
               {/* Post */}
        
        </div>
      </div>

 
  )
}

export default HomeScreen
