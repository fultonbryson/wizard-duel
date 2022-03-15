import React from "react";
import { useSelector } from "react-redux";

import Counter from "../counter/counter";

import { PageHeader, PageFooter } from "../pageHelpers/pageHelpers";

const Match = () => {
  const player = useSelector((state) => state.player);
  return (
    <div className='match'>
      <PageHeader className='match__header' header={`${player.player_name}`} />
      <Counter className='match__counter' player={player} />
      <PageFooter className='match__footer' />
    </div>
  );
};

export default Match;
