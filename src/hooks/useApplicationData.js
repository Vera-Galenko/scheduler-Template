import React, { useState, useEffect} from "react";
import axios from 'axios';


export default function useApplicationData () {

const [state, setState] = useState({ day: "Monday", days: [], appointments: {} })

   
    const setDay = day => setState(prev => ({ ...prev, day}));

    //block for updating the spots
   
    const appointmentsForDay = (day, state) =>
    state.days.find(d => d.name === day).appointments;
    
    const getDayIndex = state.days.findIndex(day => day.name === state.day);

    const getNewSpotsCount = (day, state) => {
        let spots = 0;
        appointmentsForDay(day, state).forEach(id => {
          if (!state.appointments[id].interview) {
            spots = spots + 1;
          }
        });
        return spots;
      };
    
      const updateSpotsCount = state => {
        const stateCopy = { ...state };
        stateCopy.days = [...stateCopy.days];
        stateCopy.days[getDayIndex] = {
          ...stateCopy.days[getDayIndex],
          spots: getNewSpotsCount(state.day, state),
        };
        return stateCopy;
      };

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

    
    const bookInterview = function (id, interview) {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
   
        const updateData = Promise.resolve(
         axios.put(`http://localhost:8001/api/appointments/${id}`, {
              interview: {
                student: interview.student,
                interviewer: interview.interviewer,
              },
            }),
          );
          updateData
            .then(() => {
              setState({
                ...state,
                appointments,
              });
              setState(prev => ({
                ...updateSpotsCount(prev),
              }));
            })
            .catch(error => console.log("update", error));
          return updateData;
      };
  
  

      const cancelAppointment = function(id){

        const appointment = {
            ...state.appointments[id],
            interview: null,
          };
      
          const appointments = {
            ...state.appointments,
            [id]: appointment,
          };
          const cancelAppointment = Promise.resolve(
            axios.delete(`http://localhost:8001/api/appointments/${id}`),
          );
          cancelAppointment
            .then(() => {
              setState(prev => ({ ...prev, appointments }));
              setState(prev => ({ ...updateSpotsCount(prev) }));
            })
            .catch(error => console.log("delete", error));
      
          return cancelAppointment;
        };

  


    return { state, setDay, cancelAppointment, bookInterview }

}




