import React, { useState, useEffect} from "react";
import axios from 'axios';


import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({ day: "Monday", days: [], appointments: {} })
 
  // const dailyAppointments =  getAppointmentsForDay(state, state.day);

    const appointments = getAppointmentsForDay(state, state.day);

    const setDay = day => setState(prev => ({ ...prev, day}));

 

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
      <section className="schedule"> {    
        appointments.map((appointment) => {
         const interview = getInterview(state, appointment.interview);
         return (
         <Appointment
         key={appointment.id}
         id={appointment.id}
         time={appointment.time}
         interview={interview}
       />
       );
       })}
 
      </section>
    </main>
  );
}