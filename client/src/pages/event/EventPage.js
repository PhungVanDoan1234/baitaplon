import Wrapper from "../../components/wrapper/Wrapper";
import React, { useContext, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import CSS cho lịch
import "./eventPage.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Alert, Button } from "@mui/material";
import dayjs from "dayjs";

function EventPage() {
  const { user: currentUser } = useContext(AuthContext);
  const [dateSchedules, setDateSchedules] = useState([]);
  const [showCreateDateSchedule, setShowCreateDateSchedule] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showAndHide, setShowAndHide] = useState(false);
  const inputRef = useRef();
  const onChange = (newDate) => {
    setDate(newDate);
  };

  useEffect(() => {
    const getDateSchedule = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/calendars/getAll/${currentUser._id}`
        );
        setDateSchedules(res.data.reverse());
      } catch (err) {
        console.log(err);
      }
    };
    getDateSchedule();
  }, [currentUser]);

  console.log(dateSchedules);

  const handleCreateDateSchedule = async () => {
    try {
      const newDateSchedule = {
        userId: currentUser._id,
        date: date,
        text: inputRef.current.value,
      };
      const res = await axios.post(
        `http://localhost:8800/api/calendars/`,
        newDateSchedule
      );
      setDateSchedules([res.data, ...dateSchedules]);
      inputRef.current.value = "";
      setShowCreateDateSchedule(false);
    } catch (err) {
      console.log(err);
    }
  };

  const hanldeUpdateDateSchedule = async (d) => {
    try {
      const newDateSchedule = {
        userId: currentUser._id,
      };
      if (inputRef?.current?.value !== "")
        newDateSchedule.text = inputRef?.current?.value;
      if (date) newDateSchedule.date = date;
      await axios.put(
        `http://localhost:8800/api/calendars/${d._id}`,
        newDateSchedule
      );
      setDateSchedules(
        dateSchedules.map((dateSchedule) => {
          if (dateSchedule._id === d._id) {
            if (newDateSchedule.text) dateSchedule.text = newDateSchedule.text;
            if (newDateSchedule.date) dateSchedule.date = newDateSchedule.date;
            return {
              ...dateSchedule,
            };
          }
          return dateSchedule;
        })
      );
      inputRef.current.value = "";
      setShowCreateDateSchedule(false);
    } catch (err) {
      console.log(err);
    }
  };

  const hanldeDeleteDateSchedule = async (d) => {
    try {
      await axios.delete(`http://localhost:8800/api/calendars/${d._id}`, {
        data: {
          userId: currentUser._id,
        },
      });
      setDateSchedules(
        dateSchedules.filter((dateSchedule) => dateSchedule._id !== d._id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleKey = (e) => {
    if (date !== null) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleCreateDateSchedule();
      }
    } else {
      alert("banj van chua chon ngay ma");
    }
  };

  return (
    <Wrapper sologan={"Calendar"}>
      <div className="calendar">
        <div className="createEvent">
          {" "}
          <Button
            onClick={() => setShowCreateDateSchedule(!showCreateDateSchedule)}
          >
            Create DateSchedule
          </Button>
          {showCreateDateSchedule && (
            <textarea
              type="text"
              ref={inputRef}
              onKeyDown={handleKey}
              className="textDataSchedule"
              placeholder="write noted"
            />
          )}
        </div>
        <Calendar onChange={onChange} value={date} />
        <div className="eventlist">
          <table>
            <tr>
              <th>Thời gian</th>
              <th>Công việc</th>
              <th>Tùy chọn</th>
            </tr>
            {(showAndHide ? dateSchedules : dateSchedules.slice(0, 2)).map(
              (d) => (
                <tr key={d._id}>
                  <td>{dayjs(d.date).format("DD/MM/YYYY ")} </td>
                  <td>{d.text}</td>
                  <td>
                    <div className="buttonHandle">
                      <Button onClick={() => hanldeUpdateDateSchedule(d)}>
                        Update
                      </Button>
                      <Button
                        className="text-danger"
                        onClick={() => hanldeDeleteDateSchedule(d)}
                      >
                        delete
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            )}
            <tr>
              <td colSpan={3}>
                <Button
                  onClick={() => setShowAndHide(!showAndHide)}
                  style={{ color: "#000", textDecoration: " underline" }}
                >
                  {showAndHide ? "<< Ẩn bớt" : "Xem thêm >>"}
                </Button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </Wrapper>
  );
}

export default EventPage;
