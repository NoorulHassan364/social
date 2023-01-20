import React from 'react'

export default function ClaimCard(props) {
  return (

    <div className="Box">
              <img className="Banner" src={BG} />
              <img className="profileP" src={data.picture} />
              <div className="contentWrap">
              <div className="NameBox">
                <b>
                  {props?.companyName
                    ? `${props?.companyName}`
                    : "New User"}
                </b>
                <i className="button">
                <a  onClick = { () => handleClick(props?._id)}>See more </a>   
                </i>
              </div>
              <div>
                <Progress done="0" />
               <span className="Amount"> $0 raised</span>  
              </div>

            <span className="CardBio"><i>  {props?.bio || ""}</i></span>
              </div>
    </div>
  );
}