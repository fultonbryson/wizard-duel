import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { API_URL } from "../../apiData/apiData";

const Roster = (props) => {
  const inMatch = props.inMatch;

  const match = useSelector((state) => state.match);

  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/players/${match.match_id}`, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setPlayerList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [playerList]);

  return (
    <div className={`${props.className} roster`}>
      {inMatch
        ? playerList.map((player) => (
            <div key={player.id} className='roster__player player'>
              <div className='player__name'>{player.player_name}</div>
              <div className='player__health'>{player.player_health_total}</div>
            </div>
          ))
        : playerList.map((player) => (
            <div key={player.id} className='roster__player player'>
              <div className='player__name'>{player.player_name}</div>
            </div>
          ))}
    </div>
  );
};

export default Roster;
