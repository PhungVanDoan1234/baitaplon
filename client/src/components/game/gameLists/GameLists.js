import { FiberManualRecord } from "@mui/icons-material";
import { Alert, Button } from "@mui/material";
import { memo, useState } from "react";

function GameLists({ game, onHandle }) {
  const [showHandleGame, setShowHandleGame] = useState(false);
  return (
    <>
      <Alert
        icon={<FiberManualRecord fontSize="inherit" />}
        onClick={() => onHandle(game.id)}
      >
        {game.name}
      </Alert>
      <Button
        onClick={() => setShowHandleGame(!showHandleGame)}
        className="buttonHandleGameAndTarget"
      >
        +
      </Button>
      {showHandleGame && (
        <>
          <p>{game.target}</p>
          <p>{game.handle}</p>
        </>
      )}
    </>
  );
}

export default memo(GameLists);
