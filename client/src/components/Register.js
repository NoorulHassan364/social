import React, { useState, useEffect } from "react";
import { useSignupUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import Design from "./assets/Design.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addEmail } from "../features/NewUserSlice";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  async function handleSignup(e) {
    e.preventDefault();
    dispatch(addEmail({ email  , password }))
    navigate("/userrole/");
  };
  return (
    <div className="container">
      <div className="TitleWraped">
        <h1 className="MainTitle">Pitchdeck</h1>
        <h3 className="subTitle">Connect with Investors, Startups and More</h3>
      </div>
      <div className="Wrap">
        <h2>Start for Free</h2>
        <img className="logo" src={Design} />
        <h2>Create an Account</h2>
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)} value={email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)} value={password} />

          </div>
          <div>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              placeholder=" Confirm Password"
              name="password"

            />
          </div>
          <button className="Submiter" type="submit">Submit</button>
          <span>
            Already have an account ?<Link to="/login">Login</Link>
          </span>
        </form>

      </div>
    </div>
  );
}

export default Register;
