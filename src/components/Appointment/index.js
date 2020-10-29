import React, { Fragment, useEffect } from "react";
import Header from "../Appointment/Header";
import Show from "../Appointment/Show";
import Empty from "../Appointment/Empty";
import Form from "../Appointment/Form";
import Confirm from "../Appointment/Confirm";
import Error from "../Appointment/Error";
import Status from "../Appointment/Status";
import "../Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

   


  return(
    <article data-testid="appointments" className="appointment">
    <Header time={props.time} />

    {mode === EMPTY && (
        <Empty
          onAdd={() => {
            return transition(CREATE);
          }}
        />
      )}
    {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}

    />
  )}
   {mode === CREATE && (
     <Form
     name={""}
     interviewer={null}
     interviewers={props.interviewers}
    //  onSave={action("onSave")}
     onCancel={back}
     />
   )}
  

 </article>
  )

};