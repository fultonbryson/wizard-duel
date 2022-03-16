import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setMatchPlayerList } from "../../slices/matchSlice";

const Roster = (props) => {
  const dispatch = useDispatch();

  const inMatch = props.inMatch;

  const match = useSelector((state) => state.match);

  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    const API_URL = "http://127.0.0.1:5000/api";
    fetch(`${API_URL}/players/${match.match_id}`)
      .then((response) => response.json())
      .then((data) => {
        setPlayerList(data);
        dispatch(setMatchPlayerList(playerList));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [playerList]);

  return (
    <div className={`${props.className} roster`}>
      {inMatch
        ? playerList.map((player) => (
            <div className='roster__player player'>
              <div className='player__name'>{player.player_name}</div>
              <div className='player__health'>{player.player_health_total}</div>
            </div>
          ))
        : playerList.map((player) => (
            <div className='roster__player player'>
              <div className='player__name'>{player.player_name}</div>
            </div>
          ))}
    </div>
  );
};

export default Roster;
