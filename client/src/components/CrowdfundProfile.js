import React from "react";
import Navbar from "./Navbar";
import "./styles/Profile.css";
import ProfilePic from "./assets/Default.png";
import Modal from "./Modal";
import RegisterAsInvestorModal from "./RegisterAsInvestor";
import Checkout from "./Checkout";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import axios from "axios";
import {
  useCreatePostMutation,
  useGetPostsMutation,
  useGetUserMutation,
  useUpdateUserMutation,
} from "../services/appApi";
import { useParams } from "react-router-dom";
import UploadIMG from "./assets/imgup.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Upload from "./assets/upload.png";
import Img from "./assets/Img.png";

import VideoPlay from "./VideoPlayer";
const CrowdfundProfile = () => {
  const crowduser = useSelector((state) => state.crowdfunduser.crowdfunduser);

  const [investModalOpen, setInvestModalOpen] = useState(false);
  const [nonInvestModalOpen, setNonInvestModalOpen] = useState(false);
  const [value, setValue] = useState("");

  console.log("crowdfund : ", crowduser?.lookingcrowdfund);

  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [getPosts] = useGetPostsMutation();
  const [createPost] = useCreatePostMutation();
  const [profile, setProfile] = useState(null);
  const { id } = useParams();
  const [getUser] = useGetUserMutation();
  const [intro, setIntro] = useState(null);
  const [values, setValues] = useState("");
  const [show, setShow] = useState(true);
  const [showing, setShowing] = useState(true);
  const [showings, setShowings] = useState(true);

  const [cropImage, setCropImage] = useState("");
  const [updateUser] = useUpdateUserMutation();
  const posts = useSelector((state) => state.posts || []);
  const { _id, picture } = crowduser || {};
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
    axios.get(`/user/${id}`).then(({ data }) => {
      setProfile(data.profile);

      console.log(data);
    });
  }, [id]);

  const closer = () => {
    setShow(false);
  };

  const closing = () => {
    setShowing(false);
  };

  const opener = () => {
    setShow(true);
  };

  const [vid, setVid] = useState(null);

  const handleChange = (event) => {
    setVid(URL.createObjectURL(event.target.files[0]));
  };
  const handleInvest = (e) => {
    if (user.userRole == "Investor") {
      setInvestModalOpen(true);
    } else {
      setNonInvestModalOpen(true);
    }
  };
  const [pic, setPic] = useState(null);
  const [uploadingPic, setUploadingPic] = useState(null);
  const [picPreview, setPicPreview] = useState(null);
  const [pic2Preview, setPic2Preview] = useState(null);
  const [pic2, setPic2] = useState(null);

  function handlePicUpload(e) {
    const file = e.target.files[0];
    if (file.size == 1897868) {
      return alert("Max");
    } else {
      setPic(file);
      setPicPreview(URL.createObjectURL(file));
      setShowings(false);
    }
  }

  // uploadUserPicture({ _id, picture }).then(({data}) => {
  //   console.log("picture updated");
  // });

  function getData(val) {
    setIntro(val.target.value);
  }

  function getValue(vals) {
    setValues(vals.target.value);
  }

  useEffect(() => {
    axios.get(`/user/${id}`).then(({ data }) => {
      setProfile(data.profile);

      console.log(data);
    });
  }, [id]);

  useEffect(() => {
    // getPosts();
  }, []);
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="Container">
      <Navbar />

      <div className="MainContent">
        <div className="Header">
          <div>Profile</div>
          <input className="Search" placeholder="Search" />
        </div>
        <div className="innerProColumns">
          <div className="profileContainer">
            <img className="profilePic" src={picture || ProfilePic} />
          </div>
          <div className="textWrap">
            <div className="buttonsWrap"></div>

            <div className="bg">
              <div className="BannerContainer">.</div>
              <div className="textWraped">
                <div className="ProNameBox">
                  <b>
                    {crowduser?.companyName
                      ? `${crowduser?.companyName} `
                      : "New User"}
                  </b>
                  <i className="position">
                    {" "}
                    {crowduser?.position || ""}
                    <span className="ProfilePosition">
                      {crowduser?.work || ""}
                    </span>
                  </i>
                  {/* <div onClick={() => setIsOpen(true)} className="Edit">
                    Edit Profile
                  </div> */}
                </div>
                {crowduser?.bio || ""}
                {
                  <RegisterAsInvestorModal
                    open={nonInvestModalOpen}
                    onClose={() => setNonInvestModalOpen(false)}
                  />
                }
                {
                  <Checkout
                    open={investModalOpen}
                    onClose={() => setInvestModalOpen(false)}
                  />
                }
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
                  <>
                    <span className="selector">
                      <a
                        className="selector"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleInvest}
                        // href="https://docs.google.com/presentation/d/e/2PACX-1vQc3Shpfv0Pddc-tWPqLwZpUmpWfGEkqVspaBX-_8p3F3aPm_t9u-bLWF2d6QT-HFUK_rDAfG11ARLD/pub?start=false&loop=false&delayms=3000"
                      >
                        Invest
                      </a>
                    </span>
                    <span className="selector">
                      <a
                        className="selector"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://docs.google.com/presentation/d/e/2PACX-1vQc3Shpfv0Pddc-tWPqLwZpUmpWfGEkqVspaBX-_8p3F3aPm_t9u-bLWF2d6QT-HFUK_rDAfG11ARLD/pub?start=false&loop=false&delayms=3000"
                      >
                        PitchDeck
                      </a>
                    </span>
                  </>
                </div>
              </div>
            </div>
            <div className="flexWrap">
              <div className="profilePosts">
                {user._id == crowduser._id && (
                  <div className="postBox">
                    <div className="PostWrapper">
                      <div className="picContainer">
                        <img className="profile" src={picture || ProfilePic} />
                      </div>
                      <div className="textWrap">
                        <textarea ref={textAreaEl} placeholder="What's new?" />
                        <div className="buttonsWrap">
                          <div></div>
                          <div onClick={onPost} className="PostButton">
                            Post
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="posts">
                  {posts.map(function (post, i) {
                    return (
                      <>
                        {" "}
                        {crowduser._id == post.user._id && (
                          <Post post={post} key={post._id || i} />
                        )}{" "}
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="profileColumn">
            <div className="introWrap">
              <div className="intro">
                Campaign
                <>
                  {" "}
                  {!show && <button onClick={opener}>edit</button>}
                  <div>
                    <label htmlFor="vid-upload" onClick={closing}>
                      {showing && (
                        <i className="button">
                          {" "}
                          <span className="uploadWrap">
                            <img className="Upload" src={Upload} />
                            Upload a video
                          </span>
                        </i>
                      )}{" "}
                    </label>

                    <input
                      id="vid-upload"
                      type="file"
                      accept="mp4"
                      hidden
                      onChange={handleChange}
                    />
                  </div>
                  <iframe className="video" src={vid}></iframe>
                </>
              </div>
            </div>

            <div>
              <div className="textInputwrap">
                {!show && <h1 className="inputLabel">Intro</h1>}
                {show && (
                  <>
                    <p className="inputLabel">Talk about our intro</p>
                    <textarea
                      className="textinput"
                      onChange={getData}
                      placeholder="Hi this is our company, We have over __ years experience doing this thing. We know a thing or ..."
                    />{" "}
                  </>
                )}

                {!show && <h3>{intro}</h3>}
                <div className="picwrap">
                  {showings && (
                    <label htmlFor="pic-upload" className="picBoxUpload">
                      <i htmlFor="pic-upload"></i>
                      <div className="innerWrapper">
                        <img src={Img} />
                        <p className="ptaged">upload a picture</p>
                      </div>
                    </label>
                  )}{" "}
                  <img className="campaign-pic" src={picPreview} />
                </div>
                <input
                  hidden
                  type="file"
                  onChange={handlePicUpload}
                  id="pic-upload"
                  className="form-control"
                />

                <div>
                  <h1>Investor Rewards</h1>
                  <div className="Reward">
                    <div className="Price">
                      <h1>$250</h1>
                    </div>
                    <div className="description"> Early access</div>
                  </div>
                  <div className="Reward">
                    <div className="Price">
                      <h1>$500</h1>
                    </div>
                    <div className="description">
                      {" "}
                      Early access + 1 gift set
                    </div>
                  </div>
                  <div className="Reward">
                    <div className="Price">
                      <h1>$1000</h1>
                    </div>
                    <div className="description">
                      {" "}
                      Early access + 1 gift set + tour of bottling plant
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="BottomLabel">Some reasons why you're great</h2>
              {show && (
                <div>
                  <textarea
                    placeholder="We've develped relationships with over 30 different large beverage vendors and distributors. We offer free shipping from our store and are currently doing over 100k per year in revenue"
                    className="texteditor"
                    onChange={getValue}
                  />
                </div>
              )}{" "}
              {!show && <h3> {values}</h3>}
              <div className="Wraped">
                <h1 className="innertag">Team</h1>
                <h3 className="invitetag">+ Invite Team Members</h3>
              </div>
              {show && <button onClick={closer}>Save Changes</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrowdfundProfile;
