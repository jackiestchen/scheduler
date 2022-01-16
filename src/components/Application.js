import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const bookInterview = (id, interview) => {
    // console.log(id, interview);

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

  const appointmentRender = Object.values(dailyAppointments).map(
    (appointment) => {
      const interview = getInterview(state, appointment.interview);

      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interviewers={dailyInterviewers}
          bookInterview={bookInterview}
          interview={interview}
        />
      );
    }
  );

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

  //React Application component
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentRender}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
