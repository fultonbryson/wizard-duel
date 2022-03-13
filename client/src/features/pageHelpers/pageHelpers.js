import React from "react";

const PageHeader = (props) => {
  return (
    <div className={`${props.className} page-header`}>
      <h1>{props.header}</h1>
    </div>
  );
};

const PageTitle = (props) => {
  return (
    <div className={`${props.className} page-title`}>
      <h3>{props.title}</h3>
    </div>
  );
};

const PageFooter = (props) => {
  return (
    <div className={`${props.className} page-footer`}>
      Bryson Fulton | DevCamp Capstone Project
    </div>
  );
};

export { PageHeader, PageTitle, PageFooter };
