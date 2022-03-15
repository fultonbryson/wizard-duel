import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import Roster from "../roster/Roster";
import { PageHeader, PageTitle, PageFooter } from "../pageHelpers/pageHelpers";

import { setMatchDetails } from "../../slices/matchSlice";
import {
  setPlayerMatchId,
  setPlayerHealthTotal,
} from "../../slices/playerSlice";
import { API_URL } from "../../apiData/apiData";

const Lobby = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const match = useSelector((state) => state.match);
  const player = useSelector((state) => state.player);

  const [matchFound, setMatchFound] = useState(false);

  function handleLeaveLobby() {
    dispatch(setPlayerMatchId(0));
    history.push("/directory");
  }

  function handleEnterMatch() {
    fetch(`${API_URL}/player-health/${player.player_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player_health_total: match.match_start_health }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setPlayerHealthTotal(data.player_health_total));
        history.push(`/match/${match.match_id}`);
      });
  }

  useEffect(() => {
    const API_URL = "http://127.0.0.1:5000/api";

    fetch(`${API_URL}/matches/${player.player_match_id}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setMatchDetails(data));
        setMatchFound(true);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className='lobby'>
      <PageHeader className='lobby__header' header='LOBBY' />
      <PageTitle className='lobby__match-format' title={match.match_format} />
      <PageTitle
        className='lobby__match-id'
        title={matchFound ? `${match.match_id}` : "No Match Found"}
      />
      <Roster className='lobby__roster' />
      <div className='lobby__leave' onClick={() => handleLeaveLobby()}>
        Leave Lobby
      </div>

      <div className='lobby__enter-match' onClick={() => handleEnterMatch()}>
        Enter Match
      </div>
      <PageFooter />
    </div>
  );
};

export default Lobby;
