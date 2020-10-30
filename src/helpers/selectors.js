
const  getAppointmentsForDay = function(state, day) {
  if(!state.days.length === 0){
    return [];
  }
  const dayObject = state.days.find(d => d.name === day);
  if (!dayObject || dayObject.length === 0) {

      return [];
  }
  return dayObject.appointments.map(id => state.appointments[id]);

  }
 
const getInterview = function(state, interview) {
    if (!interview) {
      return null;
    }
    const foundInterview = {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
      
    };
    return foundInterview;
  };

const getInterviewersForDay = function(state, day) {
  if(!state.days.length === 0){
    return [];
  }
  const dayObject = state.days.find(d => d.name === day);
  if (!dayObject || dayObject.length === 0) {

      return [];
  }
  return dayObject.interviewers.map(id => state.interviewers[id]);

  }

 

export { getAppointmentsForDay, getInterview, getInterviewersForDay };