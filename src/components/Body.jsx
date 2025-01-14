import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const user = useSelector(store=>store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const fetchUserProfile = async () => {
    try {
      if(!user){
      const res = await axios.get("http://localhost:3030/profile", {
        withCredentials: true,
      });
    
      //console.log(res);
      dispatch(addUser(res.data));
    }
    } catch (err) {
      if(err.status){
        navigate('/login')
      }
      //console.log(err);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <>
      <Navbar />
     
      <Outlet />
    </>
  );
};

export default Body;
