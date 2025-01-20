import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3030/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      //console.log(res);
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      setError(err.response.data);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        "/api/signup",
        { userName, password, email, age, gender },
        { withCredentials: true });
        console.log(res)
        dispatch(addUser(res.data.data))
        navigate('/profile')
    } catch (err) {}
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="card bg-accent-content w-96 shadow-xl items-center pt-4 pb-4">
        <h3 className="text-white text-center text-lg">
          {isLogin ? "Login" : "Sign Up"}
        </h3>
        {!isLogin && (
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-white">User Name</span>
            </div>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        )}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-white">Email</span>
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs my-3">
          <div className="label">
            <span className="label-text text-white">Password</span>
          </div>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        {!isLogin && (
          <label className="form-control w-full max-w-xs">
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
        )}
        {!isLogin && (
          <label className="form-control w-full max-w-xs mb-3">
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
        )}
        <p className="text-red-600"> {error} </p>
        <p
          className="text-green-500 cursor-pointer"
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {isLogin
            ? "Not a User? Please SignUp"
            : "Already User!! Please Login"}
        </p>
        <div className="card-actions justify-end my-3">
          <button
            className="btn btn-primary"
            onClick={isLogin ? handleLogin : handleSignUp}
          >
            {isLogin ? "Login" : "SignUp"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
