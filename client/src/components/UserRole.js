import React, { useState, useEffect } from "react";
import { useSignupUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import Design from "./assets/Design.jpg"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { useDispatch, useSelector } from "react-redux";
import { addRole, addCrowdfunding } from "../features/NewUserSlice";

function Register() {
  const [userRole, setUserRole] = useState("Other");
  const [lookingcrowdfund, setLookingcrowdfund] = useState(false);
  const newuser = useSelector((state) => state.newuser);

    const [signupUser, { isLoading, error }] = useSignupUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleSignup(e) {
      e.preventDefault();

      // signup the user
      dispatch(addRole( {userRole, lookingcrowdfund} ))
      // dispatch(addCrowdfunding({ lookingcrowdfund }))
      navigate("/userinvestor/");
          
  };
  return (
    <div className="container">
        <div className="TitleWraped">
       <h1 className="MainTitle">Pitchdeck</h1>
       <h3  className="subTitle">Connect with Investors, Startups and More</h3>
       </div>
        <div className="Wrap">
        
            <img className="logo" src={Design}/>
      <h2>Pitchdeck</h2>
      <form  onSubmit={handleSignup}>
        <div>
          <label htmlFor="email">Are you a ...</label>
          <ButtonGroup aria-label="buttonGroub" className="buttonGroub">
            <Button variant="secondary" onClick={() => setUserRole("Investor")} className = {`${userRole == "Investor" && "clicked" }  `}>Investor </Button>
            <Button variant="secondary" onClick={() => setUserRole("Business")} className = {`${userRole == "Business" && "clicked" }  `} >Business</Button>
            <Button variant="secondary" onClick={() => setUserRole("Other")}  className = {`${userRole == "Other" && "clicked" }  `} >Other</Button>
          </ButtonGroup>
        </div>
        { userRole == "Business" &&
          <div>
            <label htmlFor="password">Are you looking to crowdfund your <br/> business on Pitch Connect?</label>
            <ButtonGroup aria-label="buttonGroub" className="buttonGroub">
              <Button variant="secondary" onClick={() => setLookingcrowdfund(true)} className = {`${lookingcrowdfund == true && "clicked" }  `}>Yes </Button>
              <Button variant="secondary" onClick={() => setLookingcrowdfund(false)} className = {`${lookingcrowdfund == false && "clicked" }  `}>No</Button>
            </ButtonGroup>

          </div>
        }
        <div>
        
        </div>
        <button className="Submiter"type="submit">Submit</button>
        
      </form>

      </div>
    </div>
  );
}

export default Register;
