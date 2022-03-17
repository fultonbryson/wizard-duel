import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  decrementPlayerHealthTotal,
  incrementPlayerHealthTotal,
} from "../../slices/playerSlice";

import { API_URL } from "../../apiData/apiData";

const Counter = (props) => {
  const player = props.player;

  const dispatch = useDispatch();

  const [healthTotal, setHealthTotal] = useState(player.player_health_total);

  function handleDecrement() {
    fetch(`${API_URL}/player-health/${player.player_id}`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player_health_total: healthTotal - 1 }),
    })
      .then((response) => response.json())
      .then((data) => {
        setHealthTotal(healthTotal - 1);
        dispatch(decrementPlayerHealthTotal(healthTotal));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleIncrement() {
    fetch(`${API_URL}/player-health/${player.player_id}`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player_health_total: healthTotal + 1 }),
    })
      .then((response) => response.json())
      .then((data) => {
        setHealthTotal(healthTotal + 1);
        dispatch(incrementPlayerHealthTotal(healthTotal));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className={`${props.className} counter`}>
      <div className='counter__decr' onClick={() => handleDecrement()}>
        -
      </div>
      <div className='counter__health'>{healthTotal}</div>
      <div className='counter__incr' onClick={() => handleIncrement()}>
        +
      </div>
    </div>
  );
};

export default Counter;
