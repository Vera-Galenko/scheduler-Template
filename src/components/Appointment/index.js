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
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const ERROR = "ERROR";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



export default function Appointment(props) {


  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
   if (interviewer !== null && interview.student !== null) {transition(SAVING);}
   else {transition(ERROR)} 
    if(interview.name !== null && interview.interviewer !== null){
      props.bookInterview(props.id, {
        student: name,
        interviewer})
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
    } 
  };

  function cancel(id) {
    transition(DELETING, true);
    props.cancelAppointment(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true))
  }
  


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
      onDelete = {() => {
        return transition(CONFIRM)
      }}
      onEdit={() => {
        return transition(EDIT);
      }}
    />
  )}
   {mode === CREATE && (
     <Form
     name={""}
     interviewer={null}
     interviewers={props.interviewers}
     onSave={save}
     onCancel={back}
     />
   )}
    {mode == EDIT && <Form
     name={props.interview.student}
     interviewer={props.interview.interviewer.id}
     interviewers={props.interviewers}
     onSave={save}
     onCancel={back}
    />}
    {mode == DELETING && <Status message="DELETING..."/>}
    {mode === SAVING && <Status message="SAVING..."/>}
    {mode === CONFIRM && <Confirm
    onConfirm ={cancel}
    onCancel = {back}
    />}
    {mode === ERROR && <Error onClose = {back}/>}
    {mode === ERROR_DELETE && <Error message="Deleting failed..." onClose = {back}/>}
    {mode === ERROR_SAVE && <Error message="Saving failed..." onClose = {back}/>}
 </article>


  )

};