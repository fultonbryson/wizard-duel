import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";

import { API_URL } from "../../apiData/apiData";

import { createPlayer } from "../../slices/playerSlice";

import { PageHeader, PageTitle, PageFooter } from "../pageHelpers/pageHelpers";

const Start = () => {
  const [screenToggle, setScreenToggle] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  function onSubmit(values) {
    const data = JSON.parse(JSON.stringify({ ...values }));

    fetch(`${API_URL}/player`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(createPlayer(data));
        history.push("/directory");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className='start'>
      <PageHeader className='start__header' header='WIZARD DUEL' />
      <PageTitle className='start__version' title='v1.0.0 Beta' />

      {screenToggle ? (
        <div className='start__menu menu'>
          <PageTitle className='menu__title' title='Welcome, Traveler!' />

          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className='menu__form'>
                  <label>What's Yer Name?</label>
                  <Field
                    name='player_name'
                    component='input'
                    placeholder='Player Name'
                  />

                  <button type='submit'>Continue</button>
                </div>
              </form>
            )}
          />

          <div className='start__back' onClick={() => setScreenToggle(false)}>
            Back
          </div>
        </div>
      ) : (
        <div className='start__start' onClick={() => setScreenToggle(true)}>
          START
        </div>
      )}

      <PageFooter className='start__footer' />
    </div>
  );
};

export default Start;
