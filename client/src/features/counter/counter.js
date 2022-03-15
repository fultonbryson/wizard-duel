import React from "react";
import { useSelector } from "react-redux";

const Counter = (props) => {
  const player = props.player;

  function handleDecrement() {
    console.log("Decremented!");
  }

  function handleIncrement() {
    console.log("Incremented!");
  }

  return (
    <div className={`${props.className} counter`}>
      <div className='counter__decr' onClick={() => handleDecrement()}>
        -
      </div>
      <div className='counter__health'>{player.player_health_total}</div>
      <div className='counter__incr' onClick={() => handleIncrement}>
        +
      </div>
    </div>
  );
};

export default Counter;
