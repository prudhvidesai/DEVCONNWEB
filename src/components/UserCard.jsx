import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = (props) => {
  const { user } = props;
  const { _id, userName, age, gender, about, imageUrl } = user;

  const dispatch = useDispatch();

  const handleSendRequest = async (id, status) => {
    const res = await axios.post(
      "/api/connectionRequest/send/" + id + "/" + status,
      {},
      { withCredentials: true }
    );
    dispatch(removeFeed(id));
  };
  return (
    <div>
      <div className="card bg-black w-96 shadow-xl">
        <figure>
          <img src={imageUrl} alt="user image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-green-500">{userName}</h2>
          <p className="text-green-500">{age + " " + gender}</p>
          <p className="text-green-500">{about}</p>
          <div className="card-actions justify-start">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest(_id, "Ignored")}
            >
              Ignored
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest(_id, "Interested")}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
