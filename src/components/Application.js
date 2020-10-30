import React, { useState, useEffect} from "react";
import axios from 'axios';


import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({ day: "Monday", days: [], appointments: {} })
 
    const appointments = getAppointmentsForDay(state, state.day);

    const interviewersForDay = getInterviewersForDay(state, state.day);

    const setDay = day => setState(prev => ({ ...prev, day}));


    const bookInterview = function (id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({
        ...state,
        appointments
      });
    
      return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    };

    const cancelAppointment = function(id){
      return axios.delete(`http://localhost:8001/api/appointments/${id}`)

    }

  
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => ({...prev, days, appointments, interviewers}));
    });
}, []);
let schedule=[];
if (appointments && appointments[0] && state.interviewers){
    schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
    <Appointment
    key={appointment.id}
    id={appointment.id}
    time={appointment.time}
    interviewers={interviewersForDay}
    interview={interview}
    bookInterview={bookInterview}
    cancelAppointment={cancelAppointment}
  />
  );
  })
}


  

  return (
    <main className="layout">
      <section className="sidebar">
      
          <img
          className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
         <DayList
         days={state.days}
         day={state.day}
         setDay={setDay}
         />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule"> { schedule}
 
      </section>
    </main>
  );
}