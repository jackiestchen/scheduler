/**
 * Appointments selector function
 * @param {object} state - a React state object contains appointments and days
 * @param {string} name - day
 * @returns an array of appointments for specific day, returns null if state empty or name not found
 */

const getAppointmentsForDay = (state, name) => {
  if (state.days.length < 1) {
    return [];
  }

  const appointmentDay = state.days.filter((day) => day.name === name);

  if (appointmentDay.length < 1) {
    return [];
  }

  return appointmentDay[0].appointments.map((id) => state.appointments[id]);
};

/**
 * Interviewer selector function
 * @param {interviewers} state -a React state object contains interviewers object
 * @param {student, interviewer} interview - interview object
 * @returns interview object {student: name, interviewer: {id, name, avatar} }
 */

const getInterview = (state, interview) => {
  if (interview === null) {
    return null;
  }
  interview.interviewer = state.interviewers[interview.interviewer];
  return interview;
};

module.exports = { getAppointmentsForDay, getInterview };


