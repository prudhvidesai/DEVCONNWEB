
import axios from "axios"
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = ()=>{

    const feedData = useSelector(store=>store.feed)

    const dispatch = useDispatch()

    const fetchFeed = async()=>{
        try{
           const feed = await axios.get("/api/user/feed",{withCredentials:true});
           //console.log(feed)
           dispatch(addFeed(feed.data))
        }catch(err){
           // console.log(err.message)
        }
       
    }

useEffect(()=>{
fetchFeed()
},[])
if(!feedData) return
if(feedData.length===0) return <h1 className="text-center text-xl text-white">No more users found!!!</h1>
return(
    <div className="flex justify-center mt-6">
        {feedData&&<UserCard user={feedData[0]}/>}
    </div>
)
}

export default Feed