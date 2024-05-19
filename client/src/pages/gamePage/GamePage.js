import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Wrapper from "../../components/wrapper/Wrapper";
import ClicktheCircle from "../../components/game/game_ClickTheCircle/ClicktheCircle";
import SnakeGame from "../../components/game/snakeGame/SnakeGame";
import TicTacToe from "../../components/game/ticTacToe/TicTacToe";
import MemoryGame from "../../components/game/memoryGame/MemoryGame";
import RockPaperScissors from "../../components/game/rockPaperScissors/RockPaperScissors";
import WhackAMole from "../../components/game/Whack-a-Mole/WhackAMole";
import Game2048 from "../../components/game/2048/Game2048";
import Minesweeper from "../../components/game/minesweeper/Minesweeper";
import FlappyBird from "../../components/game/FlappyBird/FlappyBird";
import Tetris from "../../components/game/Tetris/Tetris";
import GameLists from "../../components/game/_gameLists/GameLists";
import { Button } from "@mui/material";
import "./gamePage.css";
import axios, { all } from "axios";
import { AuthContext } from "../../context/AuthContext";

function GamePage() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [showAndHide, setShowAndHide] = useState(true);
  const [showInputCreateGame, setShowInputCreateGame] = useState(false);
  const [allGame, setAllGame] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const idGame = useRef();
  const nameGame = useRef();
  const target = useRef();
  const handle = useRef();

  const handleCancel = useCallback(() => {
    setSelectedGame(null);
  }, []);

  useEffect(() => {
    const getAllGame = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/games/allGame`);
        setAllGame(res.data.reverse());
      } catch (err) {
        console.log(err);
      }
    };
    getAllGame();
  }, []);

  const handleCreateGame = async () => {
    const newGame = {
      idGame: idGame.current.value,
      nameGame: nameGame.current.value,
      target: target.current.value,
      handle: handle.current.value,
    };
    try {
      const res = await axios.post(`http://localhost:8800/api/games`, newGame);
      setAllGame([res.data, ...allGame]);
    } catch (err) {
      console.log(err);
    }
    setShowInputCreateGame(false);
  };

  const handleDeleteGame = useCallback(
    async (idGame) => {
      try {
        await axios.delete(`http://localhost:8800/api/games/${idGame}`, {
          data: {
            isAdmin: currentUser.isAdmin,
          },
        });
        setAllGame(allGame.filter((game) => game._id !== idGame));
      } catch (err) {
        console.log(err);
      }
    },
    [allGame, currentUser]
  );

  const handleUpdateGame = useCallback(
    async (id_Game) => {
      if (showInputCreateGame) {
        const newGame = {
          isAdmin: currentUser.isAdmin,
        };
        if (idGame.current.value !== "") newGame.idGame = idGame.current.value;
        if (nameGame.current.value !== "")
          newGame.nameGame = nameGame.current.value;
        if (target.current.value !== "") newGame.target = target.current.value;
        if (handle.current.value !== "") newGame.handle = handle.current.value;
        try {
          await axios.put(
            `http://localhost:8800/api/games/${id_Game}`,
            newGame
          );
          setAllGame(
            allGame.map((game) => {
              if (game._id === id_Game) {
                if (newGame.idGame) game.idGame = newGame.idGame;
                if (newGame.nameGame) game.nameGame = newGame.nameGame;
                if (newGame.target) game.target = newGame.target;
                if (newGame.handle) game.handle = newGame.handle;
              }
              return game;
            })
          );
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("bạn vẫn chưa mở hộp thoại để sửa mà");
      }
    },
    [allGame, currentUser, showInputCreateGame]
  );

  return (
    <Wrapper sologan={"funny game"}>
      <Button
        style={{ display: "flex", margin: "0 auto" }}
        onClick={() => setShowInputCreateGame(!showInputCreateGame)}
      >
        create or update Game
      </Button>
      {showInputCreateGame && (
        <div className="InputListCreateOrUpdateGame">
          <input type="text" placeholder="write id game" ref={idGame} />
          <input type="text" placeholder="write name game " ref={nameGame} />
          <textarea
            type="text"
            placeholder="write target game  "
            ref={target}
          />
          <textarea type="text" placeholder="write handle game " ref={handle} />
          <Button onClick={handleCreateGame}>Submit</Button>
        </div>
      )}
      {!selectedGame ? (
        <ul className="listGame">
          {(showAndHide ? allGame.slice(0, 5) : allGame).map((g) => (
            <li className="ItemListGame" key={allGame.idGame}>
              <GameLists
                game={g}
                onHandle={setSelectedGame}
                onDelete={() => handleDeleteGame(g._id)}
                onUpdate={() => handleUpdateGame(g._id)}
              ></GameLists>
            </li>
          ))}
          <Button onClick={() => setShowAndHide(!showAndHide)}>
            {showAndHide ? "show" : "hide"}
          </Button>
        </ul>
      ) : (
        <>
          {selectedGame === "ClickTheCircle" && <ClicktheCircle />}
          {selectedGame === "SnakeGame" && <SnakeGame />}
          {selectedGame === "TicTacToe" && <TicTacToe />}
          {selectedGame === "MemoryGame" && <MemoryGame />}
          {selectedGame === "RockPaperScissors" && <RockPaperScissors />}
          {selectedGame === "WhackAMole" && <WhackAMole />}
          {selectedGame === "2048" && <Game2048 />}
          {selectedGame === "Minesweeper" && <Minesweeper />}
          {selectedGame === "FlappyBird" && <FlappyBird />}
          {selectedGame === "Tetris" && <Tetris />}
          <Button
            className="IconCancle"
            onClick={handleCancel}
            style={{ position: "absolute", top: "140px", right: "50px" }}
          >
            Cancel
          </Button>
        </>
      )}
    </Wrapper>
  );
}

export default GamePage;

// const gameList = [
//   {
//     id: "ClickTheCircle",
//     name: "🎈 Click the Circle",
//     target:
//       "Nhấp vào các hình tròn xuất hiện trên màn hình càng nhiều càng tốt trước khi hết thời gian.",
//     handle:
//       "Nhấp vào các hình tròn màu đỏ để ghi điểm. \n Mỗi lần nhấp trúng, điểm số sẽ tăng lên và hình tròn sẽ xuất hiện ở vị trí ngẫu nhiên khác. \n Game kết thúc khi hết thời gian.  ",
//   },
//   {
//     id: "SnakeGame",
//     name: "🐍 Snake Game",
//     target:
//       "Điều khiển con rắn ăn các điểm thức ăn để lớn lên, tránh va chạm vào tường hoặc vào chính mình.",
//     handle:
//       "Sử dụng các phím mũi tên (trên, dưới, trái, phải) để điều khiển hướng di chuyển của rắn. \n Rắn sẽ dài ra mỗi khi ăn thức ăn, và tốc độ di chuyển cũng sẽ tăng dần. \nGame kết thúc khi rắn va vào tường hoặc chính mình. ",
//   },
//   {
//     id: "TicTacToe",
//     name: "✏ Tic Tac Toe",
//     target:
//       "Đạt được ba ký hiệu (X hoặc O) liên tiếp theo hàng ngang, hàng dọc hoặc đường chéo.",
//     handle:
//       "Trò chơi dành cho hai người chơi. \n Người chơi đầu tiên sử dụng X, người chơi thứ hai sử dụng O. \n  Nhấp vào một ô trống trên bảng để đặt ký hiệu của bạn. \n  Trò chơi sẽ kiểm tra xem có ai đạt được ba ký hiệu liên tiếp hay chưa. Nếu có, người đó sẽ thắng. \n  Nếu tất cả các ô đều được điền mà không có ai thắng, trò chơi sẽ kết thúc hòa. ",
//   },
//   {
//     id: "MemoryGame",
//     name: "📦 Memory Game",
//     target: "Tìm và ghép đôi các cặp thẻ giống nhau.",
//     handle:
//       "Bắt đầu trò chơi với tất cả các thẻ úp xuống. \n  Nhấp vào hai thẻ để lật chúng lên.\n Nếu hai thẻ giống nhau, chúng sẽ được giữ lật. Nếu không, chúng sẽ tự động lật lại sau một khoảng thời gian ngắn. \n  Tiếp tục lật thẻ cho đến khi tất cả các cặp thẻ được tìm thấy. \n  Trò chơi kết thúc khi tất cả các cặp thẻ được ghép đôi chính xác.",
//   },
//   {
//     id: "RockPaperScissors",
//     name: "⚔ Rock Paper Scissors",
//     target:
//       "Chọn một trong ba lựa chọn (Rock, Paper, Scissors) và đánh bại máy tính theo quy tắc Rock thắng Scissors, Scissors thắng Paper, Paper thắng Rock.",
//     handle:
//       "Nhấp vào một trong ba nút tương ứng với Rock (Đá), Paper (Giấy), hoặc Scissors (Kéo). \n Máy tính sẽ tự động chọn ngẫu nhiên một lựa chọn. \n Kết quả sẽ hiển thị trên màn hình và điểm số sẽ được cập nhật.  ",
//   },
//   {
//     id: "WhackAMole",
//     name: "♦ Whack-a-Mole",
//     target:
//       "Nhấp vào những con chuột chũi xuất hiện ngẫu nhiên từ các lỗ để ghi điểm.",
//     handle:
//       " Nhấp vào các con chuột chũi khi chúng xuất hiện từ các lỗ trên bảng. \n Mỗi lần nhấp trúng, điểm số sẽ tăng lên. \n Game kết thúc khi hết thời gian. ",
//   },
//   {
//     id: "2048",
//     name: "✖ 2048",
//     target:
//       "Trượt các ô số để ghép các ô cùng số lại với nhau, tạo ra ô số 2048.",
//     handle:
//       "Sử dụng các phím mũi tên (trên, dưới, trái, phải) để di chuyển các ô số. \n Khi hai ô số giống nhau gặp nhau, chúng sẽ hợp lại thành một ô có giá trị gấp đôi. \nGame kết thúc khi không còn di chuyển nào hợp lệ.",
//   },
//   {
//     id: "Minesweeper",
//     name: "💣 Minesweeper",
//     target: "Mở hết các ô không có mìn mà không bị nổ mìn.",
//     handle:
//       "Nhấp chuột trái để mở các ô. \n Nhấp chuột phải để đặt hoặc gỡ bỏ cờ, đánh dấu ô nghi ngờ có mìn.\n Game kết thúc khi bạn mở trúng ô có mìn hoặc mở hết các ô không có mìn.",
//   },
//   {
//     id: "FlappyBird",
//     name: "🐤 Flappy Bird",
//     target:
//       "Điều khiển chú chim bay qua các ống mà không va chạm vào chúng. \n",
//     handle:
//       "Nhấp chuột trái hoặc nhấn phím Space để làm cho chú chim bay lên. Chú chim sẽ rơi tự do nếu không nhấp chuột. \nGame kết thúc khi chú chim va vào ống hoặc rơi xuống đất.",
//   },
//   {
//     id: "Tetris",
//     name: " 🟦 Tetris",
//     target:
//       "Xếp các khối hình sao cho tạo thành các hàng ngang đầy đủ để chúng biến mất.",
//     handle:
//       "Sử dụng các phím mũi tên trái và phải để di chuyển khối hình. /n Sử dụng phím mũi tên lên để xoay khối hình. /n Sử dụng phím mũi tên xuống để tăng tốc độ rơi của khối hình. /nGame kết thúc khi các khối hình chạm đến đỉnh của bảng chơi.",
//   },
// ];
