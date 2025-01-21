import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {addUser} from '../utils/userSlice'
import BASE_URL from "../constants/constants";

const Profile = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch()

  const [userName, setName] = useState(user.userName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [imageUrl, setImage] = useState(user.imageUrl);
  const [error, setError] = useState(" ");
  const [show,setShow]=useState(false)


  // const config = {
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //   },
  // };

  const handleProfileEdit = async () => {
    setError(" ")
    try {
      const res = await axios.patch(
        BASE_URL+"profile/edit",
        { userName, age, gender, about, imageUrl },
        {withCredentials:true}
      );
      dispatch(addUser(res.data))
      setShow(true)
    } catch (err) {
      setError(err.message);
    }
  };

  setTimeout(()=>{
  setShow(false)
  },500)

  return (
    <div className="flex mt-5 justify-center">
      {show&&<div className="toast toast-top toast-start ml-[570px]">
        <div className="alert alert-success">
          <span>Data updated successfully.</span>
        </div>
      </div>}
      <div className="card bg-accent-content w-96 shadow-xl items-center pt-4 pb-4 mr-5">
        <h3 className="text-white text-center text-lg">Login</h3>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-white">Name</span>
          </div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs my-3">
          <div className="label">
            <span className="label-text text-white">Age</span>
          </div>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs my-3">
          <div className="label">
            <span className="label-text text-white">Gender</span>
          </div>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs my-3">
          <div className="label">
            <span className="label-text text-white">About</span>
          </div>
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs my-3">
          <div className="label">
            <span className="label-text text-white">ImageUrl</span>
          </div>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImage(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <p className="text-red-500">{error}</p>
        <div className="card-actions justify-end my-3">
          <button className="btn btn-primary" onClick={handleProfileEdit}>
            Edit Profile
          </button>
        </div>
      </div>
      <div>
        <UserCard user={{ userName, age, gender, about, imageUrl }} />
      </div>
    </div>
  );
};
export default Profile;
