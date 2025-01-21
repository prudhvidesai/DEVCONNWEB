import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import BASE_URL from '../constants/constants'

const Connections = () => {
  const connectionData = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL+"user/connections", {
        withCredentials: true,
      });
      //console.log(res);
      dispatch(addConnection(res.data.data));
    } catch (err) {}
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connectionData) return;
  if (connectionData.length === 0)
    return (
      <h1 className="text-green-500 text-center text-xl my-10">
        No Connections to show!!!!
      </h1>
    );

  return (
    <div className="flex flex-col justify-center  w-[100vw]">
      <h1 className="text-white font-bold text-2xl text-center my-6">
        Connections
      </h1>
      <div>
        {connectionData.map(item=>{
          return (
            <div key={item._id} className="flex bg-slate-600 m-5 p-5 w-[30%] mx-auto rounded-lg">
              <div>
                <img
                  className="w-[100px] h-[100px] rounded-xl mr-5"
                  src={item.imageUrl}
                />
              </div>
              <div>
                <h1 className="text-white font-bold text-sm">{item.userName}</h1>
                <p className="text-white">{item.age + " " + item.gender}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
