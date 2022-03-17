import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Counter from "../counter/counter";
import Roster from "../roster/Roster";

import { PageHeader, PageFooter } from "../pageHelpers/pageHelpers";

import { API_URL } from "../../apiData/apiData";

const Match = () => {
  const player = useSelector((state) => state.player);
  const match = useSelector((state) => state.match);
  const history = useHistory();
  const [rosterToggle, setRosterToggle] = useState(false);

  function handleRosterToggle() {
    if (rosterToggle) {
      setRosterToggle(false);
    } else {
      setRosterToggle(true);
    }
  }

  function handleEndMatch() {
    fetch(`${API_URL}/players/${player.player_match_id}`, {
      method: "DELETE",
    }).then(() => {
      fetch(`${API_URL}/matches/${match.match_id}`, { method: "DELETE" }).then(
        () => {
          console.log("Match Ended");
          history.push("/");
        }
      );
    });
  }

  return (
    <div className='match'>
      <PageHeader className='match__header' header={`${player.player_name}`} />

      {rosterToggle ? (
        <div className='match__subscreen subscreen'>
          <Roster className='subscreen__roster' inMatch={true} />
          <div
            className='subscreen__end-match'
            onClick={() => handleEndMatch()}>
            End Match
          </div>
        </div>
      ) : (
        <Counter className='match__counter' player={player} />
      )}

      <div
        className='match__roster-toggle'
        onClick={() => handleRosterToggle()}>
        Toggle Roster
      </div>
      <PageFooter className='match__footer' />
    </div>
  );
};

export default Match;