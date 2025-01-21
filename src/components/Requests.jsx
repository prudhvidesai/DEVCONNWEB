import axios from "axios"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests,removeRequests } from "../utils/requestSlice";
import BASE_URL from "../constants/constants";

const Requests = ()=>{
    const requestData = useSelector(store=>store.request)
    const dispatch = useDispatch()
    const fetchRequests = async()=>{
          try {
            const res = await axios.get(BASE_URL + "user/requests", {
              withCredentials: true,
            });
            console.log(res);
            
            dispatch(addRequests(res.data.requests))
            
          } catch (err) {
            console.log(err.message);
          }
    } 
   
    useEffect(()=>{
        fetchRequests()
    },[])

   const handleRequestBtn = async(status,_id)=>{
    const reviewData = await axios.post(
      BASE_URL+"connectionRequest/review/"+_id+"/"+status,{},{withCredentials:true}
    );
     console.log(reviewData);
     dispatch(removeRequests(_id))
   }

    
    //if(!requestData) return

    if(requestData.length===0) return <h1 className="text-center text-green-500 text-xl my-[300px]">No Requests Found!!!!</h1>
   
    return (
      <div className="flex flex-col justify-center  w-[100vw]">
        <h1 className="text-white font-bold text-2xl text-center my-6">
          Requests
        </h1>
        <div>
          {requestData.map((item) => {
            return (
              <div
                key={item._id}
                className="flex justify-between items-center bg-slate-600 m-5 p-5 w-[40%] mx-auto rounded-lg"
              >
                <div>
                  <img
                    className="w-[100px] h-[100px] rounded-xl mr-5"
                    src={item.fromUserId.imageUrl}
                  />
                </div>
                <div>
                  <h1 className="text-white font-bold text-sm">
                    {item.fromUserId.userName}
                  </h1>
                  <p className="text-white">
                    {item.fromUserId.age + " " + item.fromUserId.gender}
                  </p>
                </div>
                <div className="flex">
                  <button
                    className="btn btn-primary mr-3"
                    onClick={() => handleRequestBtn("Ignore", item._id)}
                  >
                    Ignore
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleRequestBtn("Accepted", item._id)}
                  >
                    Accepted
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default Requests