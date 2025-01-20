import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
const Navbar = ()=>{
  const user = useSelector((store)=>store.user)
  //console.log(user)
  const dispatch = useDispatch()
 const navigate = useNavigate()
  const handleLogout = async()=>{
    try{
      axios.post("/api/logout",{},{withCredentials:true})
      dispatch(removeUser()) 
      navigate('/login')
    }catch(err){
      //console.log(err.message)
    }
    
  }

return (
  <div className="navbar bg-neutral-900">
    <div className="flex-1">
      <Link to={"/feed"} className="btn btn-ghost text-xl text-green-500">
        ❇️     DEVCONN
      </Link>
    </div>
    <div className="flex-none gap-2">
      {user && (
        <div className="flex dropdown dropdown-end mx-4">
          <span className="text-green-500 mt-3 mr-2">
            Welcome:: {user.userName}
          </span>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={user.imageUrl} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-14 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/profile"} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to={"/requests"}>Requests</Link>
            </li>
            <li>
              <Link to={"/connections"}>Connections</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  </div>
);
}
export default Navbar