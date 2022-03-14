import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";
import axios from "axios";

import { createPlayer, setPlayerMatchId } from "../../slices/playerSlice";
import { createMatch } from "../../slices/matchSlice";

import { PageHeader, PageTitle, PageFooter } from "../pageHelpers/pageHelpers";

const Host = () => {
  const dispatch = useDispatch();

  const player = useSelector((state) => state.player);

  function onSubmit(values) {
    const API_URL = "http://127.0.0.1:5000/api";
    const data = JSON.parse(JSON.stringify(values));

    console.log(data);

    axios
      .post(`${API_URL}/match`, {
        match_format: data.match_format,
        match_start_health: data.match_start_health,
      })
      .then((response) => {
        const match = { ...response.data };
        dispatch(createMatch(match));
        dispatch(setPlayerMatchId(match.id));
      })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className='host'>
      <PageHeader className='host__header' header='HOST' />

      <PageTitle className='host__title' title={`${player.player_name}`} />

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className='host__form form'>
              <div className='form__format-select'>
                <label>Format</label>
                <Field name='match_format' component='select'>
                  <option></option>
                  <option value='Standard'>Standard</option>
                  <option value='Commander'>Commander</option>
                </Field>
              </div>

              <div className='form__health-select'>
                <label>Start Health</label>
                <Field name='match_start_health' component='select'>
                  <option></option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                  <option value={50}>50</option>
                  <option value={60}>60</option>
                </Field>
              </div>

              <button type='submit'>Create Match</button>
            </div>
          </form>
        )}
      />

      <PageFooter className='host__footer' />
    </div>
  );
};

export default Host;
