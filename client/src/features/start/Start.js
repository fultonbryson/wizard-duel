import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";

import { createPlayer } from "../../slices/playerSlice";

import { PageHeader, PageTitle, PageFooter } from "../pageHelpers/pageHelpers";

const Start = () => {
  const [screenToggle, setScreenToggle] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  function onSubmit(values) {
    const data = JSON.parse(JSON.stringify(values.player_name));
    dispatch(createPlayer(data)).then(history.push("/directory"));
  }

  return (
    <div className='start'>
      <PageHeader className='start__header' header='WIZARD - DUEL' />

      {screenToggle ? (
        <div className='start__menu menu'>
          <PageTitle className='menu__title' title='Welcome, Traveler!' />

          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className='menu__form'>
                  <label>Player Name</label>
                  <Field
                    name='player_name'
                    component='input'
                    placeholder="What's Yer Name?"
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