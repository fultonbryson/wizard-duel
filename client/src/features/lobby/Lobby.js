import React from "react";

import { PageHeader, PageTitle, PageFooter } from "../pageHelpers/pageHelpers";

const Lobby = () => {
  return (
    <div className='lobby'>
      <PageHeader className='lobby__header' header='LOBBY' />
      <PageTitle className='lobby__title' title='Match ID goes here' />
      <PageFooter />
    </div>
  );
};

export default Lobby;
