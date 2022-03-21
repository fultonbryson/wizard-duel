import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PageHeader, PageTitle, PageFooter } from "../pageHelpers/pageHelpers";

const Directory = () => {
  const navigate = useNavigate();
  const player = useSelector((state) => state.player);

  function handleRouteSelect(route) {
    navigate(`${route}`);
  }
  return (
    <div className='directory'>
      <PageHeader className='directory__header' header='WIZARD DUEL' />

      <div className='directory__content content'>
        <PageTitle className='content__title' title={`${player.player_name}`} />

        <div
          className='content__join'
          onClick={() => handleRouteSelect("/join")}>
          JOIN
        </div>

        <div
          className='content__host'
          onClick={() => handleRouteSelect("/host")}>
          HOST
        </div>

        <div className='content__back' onClick={() => navigate("/")}>
          BACK
        </div>
      </div>

      <PageFooter className='directory__footer' />
    </div>
  );
};

export default Directory;
