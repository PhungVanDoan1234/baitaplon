import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import "./groupPage.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import GroupAler from "../../components/groupAlert/GroupAlert";

function GroupPage() {
  const [groups, setGroups] = useState([]);
  const [showAndHide, setShowAndHide] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  const inputRef = useRef();
  useEffect(() => {
    const getAllGroup = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/groupMessages");
        setGroups(res.data.reverse());
      } catch (err) {
        console.log(err);
      }
    };
    getAllGroup();
  }, []);

  const handleCreateGroup = async () => {
    const newGroup = {
      userId: currentUser._id,
      text: inputRef.current.value,
    };
    try {
      const res = await axios.post(
        "http://localhost:8800/api/groupMessages/createGroup",
        newGroup
      );
      setGroups([res.data, ...groups]);
      inputRef.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  const hanldeDelete = useCallback(
    async (group) => {
      try {
        await axios.delete(
          `http://localhost:8800/api/groupMessages/${group._id}`,
          {
            data: {
              userId: currentUser._id,
            },
          }
        );
        setGroups(groups.filter((g) => g._id !== group._id));
      } catch (err) {
        console.log(err);
      }
    },
    [groups, currentUser]
  );

  return (
    <>
      <Topbar />
      <p className="sologan">
        <i>write something to every other </i>😉😉😉
      </p>

      <div className="groupPageContainer">
        <div className="groupPageWrapper">
          <ul className="listGroup">
            {(showAndHide ? groups.slice(0, 6) : groups).map((group) => (
              <li className="itemGroup">
                <GroupAler
                  group={group}
                  onDelete={() => hanldeDelete(group)}
                ></GroupAler>
              </li>
            ))}
          </ul>
          <input
            type="text"
            className="inputNameGroup"
            placeholder="write name group"
            ref={inputRef}
          />
          <button
            className="buttonHandleCreateGroup"
            onClick={handleCreateGroup}
          >
            submit
          </button>
          <button
            className="showAndHideGroup"
            onClick={() => setShowAndHide(!showAndHide)}
          >
            {showAndHide ? "show" : "hide"}
          </button>
        </div>
      </div>
    </>
  );
}

export default GroupPage;
