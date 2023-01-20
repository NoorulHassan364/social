import React, { useEffect } from "react";
import "./styles/Checkout.css";
import ProfilePic from "./assets/Default.png";
import PlusIcon from './assets/plus.png'
import { useState, useCallback } from "react";
import { useUpdateUserMutation, useUploadUserPictureMutation } from "../services/appApi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CropModal from './CropModal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {BsCurrencyDollar, BsCreditCard2Front} from 'react-icons/bs';
import {Audio} from "react-loader-spinner"
const Checkout = ({ open, onClose }) => {
  const user = useSelector(state => state.crowdfunduser.crowdfunduser);
  const { _id, picture } = user || {};

  const [loading, setLoading] = useState(false)
  const [cropImage, setCropImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setIsBio] = useState("");
  const [position, setIsPosition] = useState("");
  const [work, setIsWork] = useState("");
  const [updateUser] = useUpdateUserMutation();
  const [uploadUserPicture] = useUploadUserPictureMutation();
  const [investamount, setInvestamount] = useState(0);


  useEffect(()=> {
    // axios.get('/user/' + _id)
    // .then(({data}) => {
    //   const user = data.user;
    //
    // })
    // .catch((e) => console.log(e))
    setFirstName(user.firstName);
    setIsBio(user.bio);
    setIsPosition(user.position);
    setIsWork(user.work)
  }, [_id])

  const closer = () => {
    updateUser({_id, investamount}).then(({data})=>{
      if(data){
        console.log("invest updated");
      }
    })
    setShow(false)
   }


  useEffect(() => {
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    }, 6000)
  }, [])

  function reset() {
    onClose()
    setShow(true)
  }

  function handleSubmit(e) {
    e.preventDefault();
    // update logic
    updateUser({_id, firstName, lastName, bio, position, work}).then(({ data }) => {
      if (data) {
        console.log("profile updated");
        onClose();
      }
    });
  }

  const [show, setShow] = useState(true);

  function onCropModalClose(picture) {
    if (!(picture && picture.length)) {
      setIsOpen(false);
      setCropImage("");
      return;
    }

  
    updateUser({_id, picture}).then(({ data }) => {
      setIsOpen(false);
      setCropImage("");
    });
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

  if (!open) return null;

  return (
    <div className="OverLay" >

   

{show && ( 
      <form onSubmit={handleSubmit} className="Checkout-Modal">


        <div className="inputWrap">
      
        <button type="closer" onClick={onClose} className="Close">
          x
        </button>
        <label className="label1">Amount</label>
          <div className="Amountinput">
            <BsCurrencyDollar color = "#a4a4a4" size = {19}/>
            <nobr/>
            <input
              onChange={(e) => setInvestamount(e.target.value)}
              value={investamount}
              className="chkmodalInput"
              placeholder="Investment Amount"
              required="true"
            />
          </div>
          
          <Tabs className = "card-tabs">
            <TabList padding = "0px" margin = "0px">
              <Tab><BsCreditCard2Front/> <span className="card">Card</span></Tab>
              <Tab>ACH</Tab>
              <Tab>Wire</Tab>
            </TabList>
              <br/>
            <TabPanel className = "TabPanel">
              <p>Name on Card</p>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={"Andrew Rivera"}
                  className="NameOnCard"
                  placeholder="Name on Card"
                />
              <br />
              <div className="Cardinput">
               
                <nobr/>
                <input
                  onChange={(e) => setIsWork(e.target.value)}
                  value={"1234 1234 1234 1234"}
                  className="CardNumber"
                  placeholder="Card number"
                  required
                />
                <input placeholder="MM / YY"
                  value={"03/25"}
                  required
                className="CardEXP"/>
              </div>
            </TabPanel>
            <TabPanel>
              <h2>Any content 2</h2>
            </TabPanel>
          </Tabs>
     
          <div className = "agreement">
            <input type = "checkbox"     required id = "agree" name = "agree"/>
            <label className="agree" for="agree"> I agree to the <a href="/">Terms & Conditions</a></label>
          </div>
        </div>
   
        <button onClick={closer}>
            Continue
          </button>
       
      </form>
)}


<div  className="success">
{

!show &&  ( loading ? 
  <Audio color="#36d7b7" loading={loading}/>
  :
 
      <div className="success"> <div className="wrap"> <h1 className="successTitle">Success</h1>
      
      
    Your investment has been made!
      <p>You should recieve an email confirmation shortly</p>
      
      </div>
      
      <button type="closer" onClick={ reset} className="Close">
      x
    </button></div>
    
)}
</div>
      <CropModal image={cropImage} open={isOpen} onClose={onCropModalClose}/>

    </div>
  );
};

export default Checkout;
