import React, { useState, useEffect } from "react";
import { useSignupUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfilePic from "./assets/Default.png";
import PlusIcon from './assets/plus.png'
import Design from "./assets/Design.jpg"
import CropModal from './CropModal';


function Register() {
  const newuser = useSelector((state) => state.newuser.newuser);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [goalAmount, setGoalAmount] = useState("");
    const [pitchDeckURL, setPitchDeckURL] = useState("");
    const [picture, setPicture] = useState(null);
    const [cropImage, setCropImage] = useState("");
    // const [userRoles, setUserRole] = useState(newuser.userRole);

    const [userRole, setUser_Role] =useState(newuser.userRole);
    const [lookingcrowdfund, setLookingcrowdfund] =useState(newuser.lookingcrowdfund);
    // const [lookingcrowdfund, setLookingcrowdfund] = useState(newuser.lookingcrowdfund);

    const [signupUser, { isLoading, error }] = useSignupUserMutation();
    const navigate = useNavigate();
    console.log("newuser : ",  newuser);
    console.log("nweuser.newsuer : ", newuser.newuser);
    console.log("userRole : ", userRole, "  : lookingcrowdfund : ", lookingcrowdfund);
    async function handleSignup(e) {
      console.log(":::singup");
      e.preventDefault();
      // signup the user
      signupUser({email, password, firstName, lastName, userRole,lookingcrowdfund, companyName, goalAmount, pitchDeckURL, picture}).then(({ data }) => {
        console.log("1:::",data);
          if (data) {
              console.log(":::",data);
              navigate("/");
          }
      });
  };


  function onCropModalClose(picture) {
    if (!(picture && picture.length)) {
      setIsOpen(false);
      setCropImage("");
      return;
    }
    setPicture(picture);
  
  };


  function onEditPic(e) {
    e.preventDefault();
    const input = document.createElement('input');
    input.type = 'file';
    input.accept= "image/*";
    input.onchange = function () {
      if (input.files.length === 0) return;
      const picture = input.files[0];
      console.log('picture', picture);
      const filereader = new FileReader();
      filereader.readAsDataURL(picture);
      filereader.onload = function (e) {
         const base64 = e.target.result;
         //console.log('base64', base64);
         setCropImage(base64);
         setIsOpen(true);
      }

      // uploadUserPicture({ _id, picture }).then(({data}) => {
      //   console.log("picture updated");
      // });
    }
    input.click();
  }
  
  return (
    <div className="container">
    <div className="TitleWraped">
  <h1 className="MainTitle">Pitch Connect</h1>
  <h3  className="subTitle">Connect with Investors, Startups and More</h3>
  </div>
  {/* <div className="Wrap">
            <h2>Welcome!</h2>
            <img className="logo" src={Design}/>
      <h2>Login to your Account</h2>
      <form >
        <div>
          <label htmlFor="email">Email</label>
          {error && <p className="alert-danger">{error.data}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setEmail(e.target.value)} value={email} required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setPassword(e.target.value)} value={password} required />
        </div>
        <button type="submit" className="Submiter">Submit</button>
        <span>
          Don't have an account? <a className="authRoute" href="/register"> Sign up</a>
        </span>
      </form>
  </div> */}
    <div className="OverLay">
    <form  className="Modal" onSubmit={handleSignup}>
        <button className="Close">
        <a href="/register"> x</a> 
        </button>

        <div className="picContainer" onClick={onEditPic}>
        <img className="modalPic" src={picture || ProfilePic} />
          <img className='editPic' src={PlusIcon}/>
        </div>
        <div className="flexwrap">
        <div className="inputWrap">
          <label>First Name <span>*</span></label>
          <input
            name = "firstname"
            className="modalInput"
            placeholder="First Name"
            onChange={(e) =>
              setFirstName(e.target.value)} value={firstName} required 
          />
              <label>Email<span>*</span></label>
          <input
         
            name = "email"
            className="modalInput"
            onChange={(e) =>
              setEmail(e.target.value)} value={email} required 
            placeholder="Email"
          />
              <label>Set goal amount <span>*</span></label>
          <input
            className="modalInput"
            placeholder="Set goal amount"
            name = "goalAmount"
            onChange={(e) =>
              setGoalAmount(e.target.value)} value={goalAmount} required 
          />

            <label>Password <span>*</span></label>
          <input
         
            name="password"
            className="modalInput"
            placeholder="password"
            onChange={(e) =>
              setPassword(e.target.value)} value={password} required 
          />

        </div>

        <div className="inputWrap">
        <label>Last Name <span>*</span></label>
          <input
            name="lastname"
            className="modalInput"
            placeholder="Last Name"
            onChange={(e) =>
              setLastName(e.target.value)} value={lastName} required 
          />
              <label>Company Name <span>*</span></label>
          <input
         
            name="companyName"
            className="modalInput"
            placeholder="CompanyName"
            onChange={(e) =>
              setCompanyName(e.target.value)} value={companyName} required 
          />
              <label>Pitchdeck URL <span>*</span></label>
        <input
          name="pitchDeckURL"
          className="modalInput"
          placeholder="PitchDeck URL"
          onChange={(e) =>
            setPitchDeckURL(e.target.value)} value={pitchDeckURL} required 
        />

            
              <label>Confirm Password * <span></span></label>
        <input
          name="confirmPassword"
          className="modalInput"
          placeholder="Confirm Password "
          onChange={(e) =>
            setConfirmPassword(e.target.value)} value={confirmPassword} required 
        />
        </div>
        </div>
        <button type="submit">
            Save
          </button>
      </form>


  </div>
  <CropModal image={cropImage} open={isOpen} onClose={onCropModalClose}/>
  </div>
  );
}

export default Register;
