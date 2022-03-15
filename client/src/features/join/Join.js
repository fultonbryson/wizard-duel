import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Field } from "react-final-form";
import axios from "axios";

import { API_URL } from "../../apiData/apiData";
import { setPlayerMatchId } from "../../slices/playerSlice";

import { PageHeader, PageTitle, PageFooter } from "../pageHelpers/pageHelpers";
import { setMatchDetails } from "../../slices/matchSlice";

const Join = () => {
  const player = useSelector((state) => state.player);

  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    const data = JSON.parse(JSON.stringify(values));
    fetch(`${API_URL}/player-match/${player.player_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(setPlayerMatchId(data.player_match_id));
        history.push(`/lobby/${data.player_match_id}`);
      })
      .catch((error) => {
        console.log(error);
      });

    // try {
    //   const response = await axios.put(
    //     `${API_URL}/player-match/${player.player_id}`,
    //     {
    //       player_match_id: values.player_match_id,
    //     }
    //   );
    //   const data = await response.data;
    //   dispatch(setPlayerMatchId(data.player_match_id));
    // } catch (error) {
    //   console.log(error);
    // }
    //   .then((response) => {
    //     const player = { ...response.data };
    //     const match_id = player.player_match_id;
    //     dispatch(setPlayerMatchId(match_id));
    //     // console.log(match_id)
    //   })
    //   .then((match_id) => {
    //     history.push(`/lobby/${match_id}`);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

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
