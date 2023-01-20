import React from "react";
import Navbar from "./Navbar";
import "./styles/Profile.css";
import ProfilePic from "./assets/Default.png";
import Modal from "./Modal";
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
import CropModal from "./CropModal";
import demo from "./assets/demo.mp4";
const Profile = () => {
  const userData = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
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
  const [show, setShow] = useState(false);
  const [showing, setShowing] = useState(true);
  const [showings, setShowings] = useState(true);
  const [desc, setDesc] = useState("tier 1 description");

  const [cropImage, setCropImage] = useState("");
  const [updateUser] = useUpdateUserMutation();
  // const posts = useSelector((state) => state.posts || []);
  const { _id, picture } = userData || {};
  const textAreaEl = useRef(null);

  const [posts, setPost] = useState([]);
  const [value, setValue] = useState("250");
  const [value1, setValue1] = useState("500");
  const [value2, setValue2] = useState("1000");
  const [value3, setValue3] = useState("tier 2 description");
  const [value4, setValue4] = useState("tier 3 description");
  const [value5, setValue5] = useState("");
  const [value6, setValue6] = useState("");
  const [campaign, setCampaign] = useState(null);

  const getUserData = () => {
    axios.get(`/user/${_id}`).then(({ data }) => {
      setUser(data.user);
    });
  };
  useEffect(() => {
    getUserData();
  }, [_id]);

  const onPost = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("user", userData?._id);
    formData.append("description", textAreaEl?.current?.value);
    if (postPic) {
      formData.append("pic", postPic);
    }
    // axios.post(`/posts`, formData).then(({ data }) => {
    //   setPostPic(null);
    //   console.log(data);
    // });
    createPost(formData)
      .then((res) => {
        console.log(res);
        getUserPosts();
        setPostPic(null);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios.get(`/user/${id}`).then(({ data }) => {
      setProfile(data.profile);

      console.log(data);
    });
  }, [id]);

  // const closer = () => {
  //   setShow(false);
  // };

  const closing = () => {
    setShowing(false);
  };

  const opener = () => {
    setShow(true);
  };

  const [vid, setVid] = useState(null);
  const [vidFile, setVidFile] = useState(null);
  const [postPic, setPostPic] = useState(null);
  const [postPicPrev, setPostPicPrev] = useState(null);

  const handleChange = (event) => {
    setVidFile(event.target.files[0]);
    setVid(URL.createObjectURL(event.target.files[0]));
  };

  const handleChangePostPic = (event) => {
    setPostPic(event.target.files[0]);
    setPostPicPrev(URL.createObjectURL(event.target.files[0]));
  };
  const [pic, setPic] = useState(null);
  const [uploadingPic, setUploadingPic] = useState(null);
  const [picPreview, setPicPreview] = useState(null);
  const [pic2Preview, setPic2Preview] = useState(null);
  const [pic2, setPic2] = useState(null);

  // uploadUserPicture({ _id, picture }).then(({data}) => {
  //   console.log("picture updated");
  // });

  function getData(val) {
    setIntro(val.target.value);
  }

  function getValue(vals) {
    setValues(vals.target.value);
  }

  function getDescription(vauls) {
    setDesc(vauls.target.value);
  }

  function getValues(valuez) {
    setValue(valuez.target.value);
  }
  function getValues1(valuez1) {
    setValue1(valuez1.target.value);
  }
  function getValues2(valuez2) {
    setValue2(valuez2.target.value);
  }
  function getDescription1(valuez3) {
    setValue3(valuez3.target.value);
  }
  function getDescription2(valuez4) {
    setValue4(valuez4.target.value);
  }

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

  const handleSubmitCompaign = () => {
    let campaignData = {
      intro,
      investorRewards: [
        {
          amount: value,
          description: desc,
        },
        {
          amount: value1,
          description: value3,
        },
        {
          amount: value2,
          description: value4,
        },
      ],
      Description: values,
      user: user?._id,
    };
    if (!campaign) {
      if (pic && vidFile) {
        const formData = new FormData();
        for (const key in campaignData) {
          if (Array.isArray(campaignData[key])) {
            formData.append(key, JSON.stringify(campaignData[key]));
          } else {
            if (campaignData[key] !== null)
              formData.append(key, campaignData[key]);
          }
        }
        formData.append("video", vidFile);
        formData.append("pic", pic);
        axios.post(`/user/campaign/add`, formData).then(({ data }) => {
          // setProfile(data.profile);
          console.log(data);
          setShow(false);
        });
      } else {
        window.alert("Please Select the Image/Video");
      }
    } else {
      const formData = new FormData();
      for (const key in campaignData) {
        if (Array.isArray(campaignData[key])) {
          formData.append(key, JSON.stringify(campaignData[key]));
        } else {
          if (campaignData[key] !== null)
            formData.append(key, campaignData[key]);
        }
      }
      if (vidFile) {
        formData.append("video", vidFile);
      }
      if (pic) {
        formData.append("pic", pic);
      }
      axios
        .patch(`/user/campaign/${campaign?._id}`, formData)
        .then(({ data }) => {
          // setProfile(data.profile);
          console.log(data);
          setShow(false);
        });
    }
  };

  const getCampaign = () => {
    axios.get(`/user/getCampaign/${userData?._id}`).then(({ data }) => {
      // setProfile(data.profile);
      console.log(data);
      setCampaign(data);
      setVid(data?.video);
      setIntro(data?.intro);
      setPicPreview(data?.pic);
      setValue(data?.investorRewards[0]?.amount);
      setDesc(data?.investorRewards[0]?.description);
      setValue1(data?.investorRewards[1]?.amount);
      setValue3(data?.investorRewards[1]?.description);
      setValue2(data?.investorRewards[2]?.amount);
      setValue4(data?.investorRewards[2]?.description);
      setValues(data?.Description);
      setShow(false);
    });
  };
  const getUserPosts = () => {
    axios.get(`/posts/getPosts/${userData?._id}`).then(({ data }) => {
      console.log("post is", data);
      setPost(data);
    });
  };
  useEffect(() => {
    getCampaign();
    getUserPosts();
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
            <img className="profilePic" src={user?.picture || ProfilePic} />
          </div>
          <div className="textWrap">
            <div className="buttonsWrap"></div>
            <div className="bg">
              <div className="BannerContainer">.</div>
              <div className="textWraped">
                <div className="ProNameBox">
                  <b>{user?.companyName ? `${user?.companyName}` : ""}</b>
                  <i className="position">
                    {" "}
                    {/* {user?.position || ""} */}
                    {user?.position && user?.position !== "undefined"
                      ? user?.position
                      : ""}
                    <span className="ProfilePosition">
                      {user?.work && user?.work !== "undefined"
                        ? user?.work
                        : ""}
                    </span>
                  </i>
                  <div onClick={() => setIsOpen(true)} className="Edit">
                    Edit Profile
                  </div>
                </div>
                {user?.bio || ""}
                {
                  <Modal
                    open={isOpen}
                    onClose={() => {
                      getUserData();
                      setIsOpen(false);
                    }}
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
                  {user?.userRole == "Investor" && (
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
                  )}
                </div>
              </div>
            </div>
            <div className="flexWrap">
              <div className="profilePosts">
                <div className="postBox">
                  <div className="PostWrapper">
                    <div className="picContainer">
                      <img
                        className="profile"
                        src={user?.picture || ProfilePic}
                      />
                    </div>
                    <div className="textWrap">
                      <textarea ref={textAreaEl} placeholder="What's new?" />
                      <div style={{ display: "flex" }}>
                        <label
                          htmlFor="postImg"
                          onClick={closing}
                          style={{ width: "6rem", marginTop: "1rem" }}
                        >
                          <i>
                            <span>
                              <img src={Upload} style={{ width: "2rem" }} />
                              <div>Upload Pic</div>
                            </span>
                          </i>
                        </label>

                        <input
                          id="postImg"
                          type="file"
                          accept="image/"
                          hidden
                          onChange={handleChangePostPic}
                        />
                        {postPic ? (
                          <img
                            src={postPicPrev}
                            style={{ width: "9rem", marginTop: "1rem" }}
                            alt="imgg"
                          />
                        ) : null}
                      </div>
                      <div className="buttonsWrap">
                        <div></div>
                        <div onClick={onPost} className="PostButton">
                          Post
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="posts">
                  {posts.map(function (post, i) {
                    return (
                      <>
                        {" "}
                        {_id == post.user._id && (
                          <Post post={post} key={post._id || i} user={user} />
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
                <div className="introWraped">
                  Campaign{" "}
                  {!show && (
                    <div className="btn1" onClick={opener}>
                      Edit
                    </div>
                  )}
                </div>
                <div>
                  {vid && show == false ? null : (
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
                  )}

                  <input
                    id="vid-upload"
                    type="file"
                    accept="video/mp4"
                    hidden
                    onChange={handleChange}
                  />
                </div>
                {campaign?.video && !show ? (
                  <video width="500" controls>
                    <source src={vid} type="video/mp4" />
                    {/* <source src="mov_bbb.ogg" type="video/ogg" /> */}
                    Your browser does not support HTML video.
                  </video>
                ) : null}
                {!showing && vid && show ? (
                  <video width="500" controls>
                    <source src={vid} type="video/mp4" />
                    {/* <source src="mov_bbb.ogg" type="video/ogg" /> */}
                    Your browser does not support HTML video.
                  </video>
                ) : null}
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
                      value={intro}
                    />{" "}
                  </>
                )}

                {!show && <h3>{intro}</h3>}
                <div className="picwrap">
                  {showings && (
                    <label htmlFor="pic-upload" className="picBoxUpload">
                      <i htmlFor="pic-upload"></i>
                      <div className="innerWrapper">
                        <img className="iconImg" src={Img} />
                        <p className="ptaged">
                          <i>Upload a picture</i>
                        </p>
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
                      {" "}
                      {!show && (
                        <>
                          <span className="iputPrice">{value}</span>
                          <div>{desc}</div>
                        </>
                      )}
                      {show && (
                        <>
                          <span className="iputPrice"></span>{" "}
                          <input
                            type="number"
                            required
                            value={value}
                            className="iputPrice"
                            onChange={getValues}
                          ></input>
                        </>
                      )}
                    </div>
                    {show && (
                      <>
                        {" "}
                        <textarea
                          rows="4"
                          onChange={getDescription}
                          maxLength="50"
                          className="inputDesc"
                          value={desc}
                        />{" "}
                      </>
                    )}
                  </div>
                  <div className="Reward">
                    <div className="Price">
                      {" "}
                      {!show && (
                        <>
                          <span className="iputPrice">{value1}</span>
                          <div>{value3}</div>
                        </>
                      )}
                      {show && (
                        <>
                          {" "}
                          <span className="iputPrice"></span>{" "}
                          <input
                            type="number"
                            required
                            value={value1}
                            className="iputPrice"
                            onChange={getValues1}
                          ></input>
                        </>
                      )}
                    </div>{" "}
                    {show && (
                      <>
                        {" "}
                        <textarea
                          rows="4"
                          onChange={getDescription1}
                          maxLength="50"
                          className="inputDesc"
                          value={value3}
                        />{" "}
                      </>
                    )}
                  </div>
                  <div className="Reward">
                    <div className="Price">
                      {" "}
                      {!show && (
                        <>
                          <span className="iputPrice">{value2}</span>
                          <div>{value4}</div>
                        </>
                      )}
                      {show && (
                        <>
                          <span className="iputPrice"></span>{" "}
                          <input
                            type="number"
                            required
                            value={value2}
                            className="iputPrice"
                            onChange={getValues2}
                          ></input>
                        </>
                      )}
                    </div>
                    {show && (
                      <>
                        {" "}
                        <textarea
                          rows="4"
                          onChange={getDescription2}
                          maxLength="50"
                          className="inputDesc"
                          value={value4}
                        />{" "}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <h2 className="BottomLabel">Some reasons why you're great</h2>
              {show && (
                <div>
                  <textarea
                    placeholder="We've develped relationships with over 30 different large beverage vendors and distributors."
                    className="texteditor"
                    onChange={getValue}
                    value={values}
                  />
                </div>
              )}{" "}
              {!show && <h3> {values}</h3>}
              <div className="Wraped">
                <h1 className="innertag">Team</h1>
                {show && <h3 className="invitetag">+ Invite Team Members</h3>}
              </div>
              {show && (
                <button onClick={handleSubmitCompaign}>Save Changes</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
