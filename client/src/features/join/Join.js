import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Field } from "react-final-form";
import axios from "axios";

import { setPlayerMatchId } from "../../slices/playerSlice";

import { PageHeader, PageTitle, PageFooter } from "../pageHelpers/pageHelpers";

const Join = () => {
  const player = useSelector((state) => state.player);

  const history = useHistory();
  const dispatch = useDispatch();

  function onSubmit(values) {
    const API_URL = "http://127.0.0.1:5000/api";

    axios
      .put(`${API_URL}/player-match/${player.player_id}`, {
        player_match_id: values.player_match_id,
      })
      .then((response) => {
        const player = { ...response.data };
        const match_id = player.player_match_id;
        dispatch(setPlayerMatchId(match_id));

        history.push(`/lobby/${player.player_match_id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className='join'>
      <PageHeader className='join__header' header='JOIN' />

      <PageTitle className='join__title' title={`${player.player_name}`} />

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className='join__form'>
              <label>Search for Match</label>
              <Field
                name='player_match_id'
                component='input'
                placeholder='Match ID'
              />

              <button type='submit'>SEARCH</button>
            </div>
          </form>
        )}
      />

      <PageFooter className='join__footer' />
    </div>
  );
};

export default Join;
