import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_URL } from "../../apiData/apiData";

import { setMatchPlayerList } from "../../slices/matchSlice";

const Roster = (props) => {
  const dispatch = useDispatch();

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
