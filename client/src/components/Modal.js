import React, { useEffect } from "react";
import "./styles/Modal.css";
import ProfilePic from "./assets/Default.png";
import PlusIcon from "./assets/plus.png";
import { useState, useCallback } from "react";
import {
  useGetUserMutation,
  useUpdateUserMutation,
  useUploadUserPictureMutation,
} from "../services/appApi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CropModal from "./CropModal";

const Modal = ({ open, onClose }) => {
  const userData = useSelector((state) => state.user);
  const { _id, picture } = userData || {};
  const [cropImage, setCropImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setIsBio] = useState("");
  const [position, setIsPosition] = useState("");
  const [work, setIsWork] = useState("");
  const [updatePic, setUpdatedPic] = useState(null);
  const [user, setUser] = useState(null);
  const [updateUser] = useUpdateUserMutation();
  const [uploadUserPicture] = useUploadUserPictureMutation();
  const [getUser] = useGetUserMutation();
  const [picPrev, setPicPrev] = useState(null);

  const getUserData = () => {
    axios.get(`/user/${_id}`).then(({ data }) => {
      setUser(data.user);
    });
  };
  useEffect(() => {
    getUserData();
  }, [_id]);
  // useEffect(() => {
  //   setFirstName(user?.firstName);
  //   setIsBio(user?.bio);
  //   setIsPosition(user?.position);
  //   setIsWork(user?.work);
  // }, [_id, user]);

  function handleSubmit(e) {
    e.preventDefault();
    // update logic
    console.log("updatePic", updatePic);
    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("firstName", user?.firstName);
    formData.append("lastName", user?.lastName);
    formData.append("bio", user?.bio);
    formData.append("position", user?.position);
    formData.append("work", user?.work);
    if (updatePic) {
      formData.append("pic", updatePic);
    }
    axios.patch(`/user/updatedProfile/${_id}`, formData).then(({ data }) => {
      // setProfile(data.profile);
      getUserData();
      onClose();
    });
    // updateUser(formData).then(({ data }) => {
    //   if (data) {
    //     console.log("profile updated");
    //     onClose();
    //   }
    // });
  }

  function onCropModalClose(picture) {
    if (!(picture && picture.length)) {
      setIsOpen(false);
      setCropImage(null);
      return;
    }
    setCropImage(picture);
    // updateUser({ _id, picture }).then(({ data }) => {
    //   setIsOpen(false);
    //   setCropImage("");
    // });
  }

  function onEditPic(e) {
    e.preventDefault();
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = function () {
      if (input.files.length === 0) return;
      const picture = input.files[0];
      console.log("picture", picture);
      setPicPrev(URL.createObjectURL(picture));
      setUpdatedPic(picture);
      const filereader = new FileReader();
      filereader.readAsDataURL(picture);
      filereader.onload = function (e) {
        const base64 = e.target.result;
        console.log("base64", base64);
        setCropImage(base64);
        setIsOpen(true);
      };
      // uploadUserPicture({ _id, picture }).then(({data}) => {
      //   console.log("picture updated");
      // });
    };
    input.click();
  }

  if (!open) return null;

  return (
    <div className="OverLay">
      <form onSubmit={handleSubmit} className="Modal">
        <button type="closer" onClick={onClose} className="Close">
          x
        </button>

        <div className="picContainer" onClick={onEditPic}>
          <img
            className="modalPic"
            src={picPrev ? picPrev : user?.picture || ProfilePic}
            alt="imgg"
          />
          <img className="editPic" src={PlusIcon} alt="imgg" />
        </div>
        <div className="inputWrap">
          <input
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            value={user?.firstName}
            className="modalInput"
            placeholder="Name"
          />
          <input
            value={user?.bio}
            onChange={(e) => setUser({ ...user, bio: e.target.value })}
            className="modalInput"
            placeholder="Bio"
          />
        </div>
        <button type="submit">Save</button>
      </form>

      <CropModal image={cropImage} open={isOpen} onClose={onCropModalClose} />
    </div>
  );
};

export default Modal;
