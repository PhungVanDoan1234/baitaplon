import { Delete, FiberManualRecord, Update } from "@mui/icons-material";
import { Alert, Button } from "@mui/material";
import { memo, useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

function GameLists({ game, onHandle, onDelete, onUpdate }) {
  const [showHandleGame, setShowHandleGame] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  return (
    <>
      <Alert
        icon={<FiberManualRecord fontSize="inherit" />}
        onClick={() => onHandle(game.idGame)}
      >
        {game.nameGame}
      </Alert>
      <Button
        onClick={() => setShowHandleGame(!showHandleGame)}
        className="buttonHandleGameAndTarget"
        style={{ color: "#000", width: "100%" }}
      >
        Hướng dẫn
      </Button>
      {currentUser.isAdmin && (
        <div className="activeDeletegame">
          <Button onClick={onDelete}>
            <Delete />
          </Button>
          <Button onClick={onUpdate}>
            <Update />
          </Button>
        </div>
      )}
      {showHandleGame && (
        <div style={{ padding: "0 10px" }}>
          <p>{game.target}</p>
          <p>{game.handle}</p>
        </div>
      )}
    </>
  );
}

export default memo(GameLists);
