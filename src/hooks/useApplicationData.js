import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  /**
   * Send PUT request to server and update DB with appointment information
   * @param {number} id
   * @param {object} interview
   * @returns a promise of PUT request
   */
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const PUT_APPOINTMENT = `http://localhost:8001/api/appointments/${id}`;

    return axios.put(PUT_APPOINTMENT, appointment).then((res) => {
      setState((prev) => ({
        ...prev,
        appointments,
      }));
    });
  };

  /**
   * Send DELETE request to server and set appointment data to null
   * @param {number} id
   * @returns a promise of DELETE request
   */
  const cancelInterview = (id) => {
    const DELETE_APPOINTMENT = `http://localhost:8001/api/appointments/${id}`;
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(DELETE_APPOINTMENT).then((res) => {
      setState((prev) => ({
        ...prev,
        appointments,
      }));
    });
  };

  //useEffect hook to get data asynchronously using axios and set state at the same time using Promise.all
  useEffect(() => {
    const GET_DAYS = `http://localhost:8001/api/days`;
    const GET_APPOINTMENTS = `http://localhost:8001/api/appointments`;
    const GET_INTERVIEWERS = `http://localhost:8001/api/interviewers`;

    Promise.all([
      axios.get(GET_DAYS),
      axios.get(GET_APPOINTMENTS),
      axios.get(GET_INTERVIEWERS),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setState, setDay, bookInterview, cancelInterview };
}
