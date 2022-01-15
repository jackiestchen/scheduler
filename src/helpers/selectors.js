/**
 * Appointments selector function
 * @param {object} state - a React state object contains appointments and days
 * @param {string} name - day
 * @returns [appointments] - an array of appointments for specific day, returns null if state empty or name not found
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
 * @param {object} state -a React state object contains interviewers object
 * @param {object} interview - interview object
 * @returns interview object {student: name, interviewer: {id, name, avatar} }
 */

const getInterview = (state, interview) => {
  if (interview === null) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];

  const newInterview = Object.assign({}, interview);
  newInterview.interviewer = interviewer;
  
  return newInterview;
};

/**
 * Appointments selector function
 * @param {object} state - a React state object contains appointments and days
 * @param {string} name - day
 * @returns [interviewers] - an array of interviewers for specific day, returns null if state empty or name not found
 */

const getInterviewersForDay = (state, name) => {
  if (state.days.length < 1) {
    return [];
  }

  const todayObject = state.days.filter((day) => day.name === name);

  if (todayObject.length < 1) {
    return [];
  }

  return todayObject[0].interviewers.map((id) => state.interviewers[id]);
};

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };
