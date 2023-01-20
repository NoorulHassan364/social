import React,{useState, useEffect} from "react";
import { useSelector , useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Progress from "./Progress";
import "./styles/Fundraise.css";
import BG from "./assets/Back.png"

import { setUser } from "../features/crowdfunduserSlice";

function  FundraiserCom (props) {
  console.log("cardItem")
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  var progressbar = "0";
  console.log("invest amount : ", props.item_data?.investamount);
  if(props?.item_data?.investamount ==null || props?.item_data?.investamount ==  undefined || props?.item_data?.investamount ==  NaN) 
    progressbar = "0";
  else if(props.item_data?.investamount/props.item_data?.goalAmount*100 >= 100) progressbar = 100
    else
      progressbar = "" + props.item_data?.investamount/props.item_data?.goalAmount*100;


  const handleClick = (id) => {
    var crowdfunduser =  users.find((data) => data._id === id);
    dispatch(setUser(crowdfunduser));
    console.log(crowdfunduser);
    navigate(`/crowdfunduser/${crowdfunduser?._id}`);
  }

  // return (
  //   <>
  //   {users?.map((data ) => {
        //  {console.log("props : ", data)}
        {console.log("data.props>>> ",props)}
         return (
          <> 
           
                <div className="Box">
                  <img className="Banner" src={BG} />
                  <img className="profileP" src={props.item_data?.picture} />
                  <div className="contentWrap">
                  <div className="NameBox">
                    <b>
                      {console.log("props : ", props.item_data)}``
                      {props.item_data?.companyName
                        ? `${props.item_data?.companyName}`
                        : "New User"}
                    </b>
                    <i className="button">
                    <a  onClick = { () => handleClick(props.item_data?._id)}>See more </a>   
                    </i>
                  </div>
                  <div>
                    <Progress done={progressbar} />
                  <span className="Amount"> $0 raised</span>  
                  </div>
    
                <span className="CardBio"><i>  {props.item_data?.bio || ""}</i></span>
                  </div>
                </div>
            
          </>);
    //     })
    // }
    // </>
  // );
}

export default FundraiserCom;