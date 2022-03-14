import { useState, useEffect } from "react";
import axios from "axios";

//Custom hooks to store data from database
//And update database with interview details
//This will be used in the Appointment component (./Appointment/index.js)

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  /**
   * Function updates the spots in state.days
   * @param {numer} num
   * @returns updated days object
   */
  const updateSpots = (num) => {
    let days = state.days.map((day) => {
      if (day.name === state.day) {
        return {...day, spots: day.spots + num}
      } else {
        return day;
      }
    });

    return days;
  };

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
      if (!state.appointments[id].interview) {
        const days = updateSpots(-1);
        setState((prev) => ({
          ...prev,
          appointments,
          days,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          appointments,
        }));
      }
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
      const days = updateSpots(+1);
      setState((prev) => ({
        ...prev,
        appointments,
        days,
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

  return { state, setDay, bookInterview, cancelInterview };
}
