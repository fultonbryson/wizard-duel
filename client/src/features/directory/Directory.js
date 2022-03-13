import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { PageHeader, PageTitle, PageFooter } from "../pageHelpers/pageHelpers";

const Directory = () => {
  const history = useHistory();
  const player = useSelector((state) => state.player);

  function handleRouteSelect(route) {
    history.push(`${route}`);
  }
  return (
    <div className='directory'>
      <PageHeader className='directory__header' header='WIZARD - DUEL' />

      <PageTitle className='directory__title' title={`${player.player_name}`} />

      <div
        className='directory__join'
        onClick={() => handleRouteSelect("/join")}>
        JOIN
      </div>

      <div
        className='directory__host'
        onClick={() => handleRouteSelect("/host")}>
        HOST
      </div>

      <div className='directory__back' onClick={() => history.push("/")}>
        BACK
      </div>

      <PageFooter className='directory__footer' />
    </div>
  );
};

export default Directory;
