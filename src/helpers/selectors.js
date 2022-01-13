
/** 
 * Appointments selector function
 * @param {object} state - an object contains appoinments and days
 * @param {string} name - day 
 * @returns an array of appointments for specific day
 */

const getAppointmentsForDay = (state, name) => {

  if (state.days.length < 1) {
    return [];
  }

  const appointmentDay = state.days.filter((day) => day.name === name);

  if (appointmentDay.length < 1) {
    return [];
  }

  return appointmentDay[0].appointments.map(id => state.appointments[id]);

}

module.exports = {getAppointmentsForDay};
