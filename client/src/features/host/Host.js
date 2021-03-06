import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router";

import { setPlayerMatchId } from "../../slices/playerSlice";
import { setMatchDetails } from "../../slices/matchSlice";

import { API_URL } from "../../apiData/apiData";

import { PageHeader, PageTitle, PageFooter } from "../pageHelpers/pageHelpers";

const Host = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const player = useSelector((state) => state.player);

  function onSubmit(values) {
    const data = JSON.parse(JSON.stringify(values));

    fetch(`${API_URL}/match`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const match = { ...data };

        dispatch(setMatchDetails(match));

        fetch(`${API_URL}/player-match/${player.player_id}`, {
          method: "PUT",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            player_match_id: match.id,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            dispatch(setPlayerMatchId(data.player_match_id));
            navigate(`/lobby/${match.id}`);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className='host'>
      <PageHeader className='host__header' header='HOST' />

      <div className='host__content content'>
        <PageTitle
          className='content__player-name'
          title={`${player.player_name}`}
        />

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
      </div>

      <PageFooter className='host__footer' />
    </div>
  );
};

export default Host;
