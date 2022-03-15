import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Roster = (props) => {
  const match = useSelector((state) => state.match);
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    const API_URL = "http://127.0.0.1:5000/api";
    fetch(`${API_URL}/players/${match.match_id}`)
      .then((response) => response.json())
      .then((data) => setPlayerList(data))
      .catch((error) => {
        console.log(error);
      });
  }, [playerList]);

  return (
    <div className={`${props.className} roster`}>
      {playerList.map((player) => (
        <div className='roster__player'>{player.player_name}</div>
      ))}
    </div>
  );
};

export default Roster;
