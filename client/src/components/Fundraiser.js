import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Progress from "./Progress";
import "./styles/Fundraise.css";
import Logo1 from "./assets/Leaf.jpg";
import Logo2 from "./assets/Floor.png";
import Logo3 from "./assets/Mint.png";
import Logo4 from "./assets/A.png";
import Logo5 from "./assets/Go.png";
import Logo6 from "./assets/Floor.png";
import BG from "./assets/Back.png";
import BG2 from "./assets/Back2.png";
import BG3 from "./assets/Back3.png";
import BG4 from "./assets/Back4.png";
import BG5 from "./assets/Back5.png";
import BG1 from "./assets/Back1.png";
import { setUser } from "../features/crowdfunduserSlice";
import FundraiserCom from "./FundraiserCom";

// function  CardItem (props) {
//   console.log("cardItem")
//   // const user = useSelector((state) => state.user);
//   // const users = useSelector((state) => state.users);
//   // const dispatch = useDispatch();
//   // const navigate = useNavigate();

//   // const handleClick = (id) => {
//   //   var crowdfunduser =  users.find((data) => data._id === id);
//   //   dispatch(setUser(crowdfunduser));
//   //   console.log(crowdfunduser);
//   //   navigate(`/crowdfunduser/${crowdfunduser?._id}`);
//   // }

//   // return (
//   //   <>
//   //   {users?.map((data ) => {
//         //  {console.log("props : ", data)}
//         {console.log("data.props>>> ",props.item_data)}
//          return (
//           <>

//                 <div className="Box">
//                   <img className="Banner" src={BG} />
//                   <img className="profileP" src={props.item_data?.picture} />
//                   <div className="contentWrap">
//                   <div className="NameBox">
//                     <b>
//                       {console.log("props : ", props.item_data)}``
//                       {props.item_data?.companyName
//                         ? `${props.item_data?.companyName}`
//                         : "New User"}
//                     </b>
//                     <i className="button">
//                     {/* <a  onClick = { () => handleClick(data?._id)}>See more </a>    */}
//                     </i>
//                   </div>
//                   <div>
//                     <Progress done="0" />
//                   <span className="Amount"> $0 raised</span>
//                   </div>

//                 <span className="CardBio"><i>  {props.item_data?.bio || ""}</i></span>
//                   </div>
//                 </div>

//           </>);
//     //     })
//     // }
//     // </>
//   // );
// }

function consol() {
  console.log("test>>>>>>>>>>>>>>>>>>>>>>>>");
}

const Fundraiser = () => {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("users:::", users);
  // const posts = props.Posts;
  // const { _id, picture } = user || {};

  /////////////////////////////////
  const [changeButton, setChangeButton] = useState("monthly");
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  //get current post
  const indexOflastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOflastPost - postsPerPage;
  const currentPosts = users?.slice(indexOfFirstPost, indexOflastPost);

  // pagination
  let maxPages = Math.ceil(users?.length / postsPerPage);
  let items = [];
  let leftSide = currentPage - 2;
  if (leftSide <= 0) leftSide = 1;
  let rightSide = currentPage + 2;
  if (rightSide > maxPages) rightSide = maxPages;
  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <div
        key={number}
        className={
          number === currentPage ? "round-effect active" : "round-effect"
        }
        onClick={() => {
          setCurrentPage(number);
        }}
      >
        {number}
      </div>
    );
  }

  useEffect(() => {}, [currentPosts]);

  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  ///////////////////////////////

  return (
    <>
      {/* {console.log("users : ", users)} */}
      {currentPosts?.map((data, i) => {
        console.log("i >>> ", data);
        {
          return <FundraiserCom item_data={data} />;
        }
        consol();
      })}
      <div className="flex-container paginate-ctn">
        <div className="round-effect" onClick={prevPage}>
          {" "}
          &lsaquo;{" "}
        </div>
        {items}
        <div className="round-effect" onClick={nextPage}>
          {" "}
          &rsaquo;{" "}
        </div>
      </div>
    </>
  );
};

export default Fundraiser;
