import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


import "../Appointment/styles.scss";


export default function Form(props) {
    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);

    const reset = function(){
        setName("")
        setInterviewer(null)
    }

    const cancel = function(){
        reset();
        props.onCancel();
    }

return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={event => setName(event.target.value)}
    />
    </form>
    <InterviewerList
    interviewers={props.interviewers}
    value={interviewer} 
    onChange={setInterviewer} 
    // setInterviewer={event => props.setInterviewer(props.interviewer.id)} 
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger
      onClick={() => cancel()}
      >Cancel</Button>
      <Button confirm
      onClick={() => props.onSave(name, interviewer)}
    //   onClick={props.onSave}
      >Save</Button>
    </section>
  </section>
</main>
)}