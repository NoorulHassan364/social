import React from "react";
import Navbar from "./Navbar";
import "./styles/Profile.css";
import ProfilePic from "./assets/Default.png";
import Modal from "./Modal";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import axios from "axios";
import { useCreatePostMutation, useGetPostsMutation } from "../services/appApi";
import { useParams } from "react-router-dom";
import Logo1 from "./assets/Leaf.jpg";
import DummyPosts from "./DummyPosts";
import Checkout from "./Checkout";
import VideoPlayer from "./VideoPlayer";
import DummyPlayer from "./DummyVideo";
const Dummy = () => {
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [getPosts] = useGetPostsMutation();
  const [createPost] = useCreatePostMutation();

  const posts = useSelector((state) => state.posts || []);
  const { _id, picture } = user || {};
  const textAreaEl = useRef(null);

  const onPost = (e) => {
    e.preventDefault();

    createPost({ user: _id, description: textAreaEl.current.value })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="Container">
      <Navbar />

      <div className="MainContent">
        <div className="Header">
          <div>Profile</div>
          <input className="Search" placeholder="Search" />
        </div>
        <div className="innerColumns">
          <div className="profileColumn">
            <div className="postBox">
              <div className="profileContainer">
                <img className="profilePic" src={Logo1} />
              </div>
              <div className="textWrap">
                <div className="buttonsWrap">
                  <div></div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg">
                <div className="picContainer"></div>
                <div className="textWraped">
                  <div className="NameBox">
                    <b>Shake & Bait</b>
                    <i className="position">
                      {" "}
                      {user?.position || ""}
                      <span className="ProfilePosition">
                        {user?.work || ""}
                      </span>
                    </i>
                    <div onClick={() => setIsOpen(true)} className="Invest">
                      Invest Now
                    </div>
                  </div>
                  Garden commerce company. Currently doing 140k in revenue per
                  year.
                  {<Checkout open={isOpen} onClose={() => setIsOpen(false)} />}
                  <div className="buttonsWraper">
                    <span className="selectors">
                      <b>Recent Posts</b>
                    </span>
                    <span className="selectors">
                      <b>Tags</b>
                    </span>
                    <span className="selectors">
                      <b>Data</b>
                    </span>
                    <span className='selector'  ><a className='selector'  target="_blank" rel="noopener noreferrer" href='https://docs.google.com/presentation/d/e/2PACX-1vTmsdyVXDykMMK45xSBGSrjxCb-l6Jllb1Imv64PaeA8UkZw7osk2wpvBhl_L_O-HUJJpYYbUkhgfZw/pub?start=true&loop=true&delayms=3000'>PitchDeck</a></span>
                    
                  </div>
                </div>
              </div>
              <div className="flexWrap">
                <DummyPosts/>
                <div className="intro">Intoductions
              
                <DummyPlayer className = "VideoPlayer"/>
        
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dummy;
