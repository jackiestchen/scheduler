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
