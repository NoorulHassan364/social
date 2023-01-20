import React, { useEffect } from "react";
import "./styles/Modal.css";
import Avatar from "./assets/Design.jpg";
import PlusIcon from './assets/plus.png'
import { useState, useCallback } from "react";
import { useUpdateUserMutation, useUploadUserPictureMutation } from "../services/appApi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CropModal from './CropModal';
import Fundraiser from "./Fundraiser";

const RegisterAsInvestorModal = ({ open, onClose }) => {
  const user = useSelector(state => state.user);
  const { _id, picture } = user || {};
  const navigate = useNavigate();

  const [cropImage, setCropImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setIsBio] = useState("");
  const [position, setIsPosition] = useState("");
  const [work, setIsWork] = useState("");
  const [updateUser] = useUpdateUserMutation();
  const [uploadUserPicture] = useUploadUserPictureMutation();

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

  function handleClose(e){
    onClose();
  }

  function handleSignup(e){
    navigate('/register');
  }

  function handleLogin (e) {
    navigate('/login');
  }
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
    <div className="OverLay">
      <form onSubmit={handleSubmit} className="Modal_ReregisterAsInvestor">
        {/* <button type="closer" onClick={onClose} className="Close">
          x
        </button> */}

        <div className="avatarpicContainer">
          <img className="avatarPic" src={Avatar} />
        </div>
        <div className="inputWrap">
        You’re currently not logged into an investor account. 
        <br /> <br/>
        Would you like to make one?

        </div>
        <button type="submit" onClick={handleSignup} >
          Yes sign me up
        </button>
        <button type="submit" onClick={handleClose}>
          No, Not right now
        </button>
        <button type="submit" onClick={handleLogin}>
          I have one. Go to login
        </button>
      </form>

      <CropModal image={cropImage} open={isOpen} onClose={onCropModalClose}/>
    </div>
  );
};

export default RegisterAsInvestorModal;