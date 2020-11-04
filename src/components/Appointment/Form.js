import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


import "../Appointment/styles.scss";


export default function Form(props) {
    const [name, setName] = useState(props.name || "");
    const [error, setError] = useState("");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);

    const reset = function(){
        setName("")
        setInterviewer(null)
    }

    const cancel = function(){
        reset();
        props.onCancel();
    }

    function validate() {
      if (name === "") {
        setError("Student name cannot be blank");
        return;
      }
      if (interviewer === null) {
        setError("Select an interviewer please.");
        return;
      }
      setError("");
      props.onSave(name, interviewer);
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
        data-testid="student-name-input"
    />
    <section className="appointment__validation">{error}</section>
    </form>
    <InterviewerList
    interviewers={props.interviewers}
    value={interviewer} 
    onChange={setInterviewer} 
    setInterviewer={event => props.setInterviewer(props.interviewer.id)} 
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger
      onClick={() => cancel()}
      >Cancel</Button>
      <Button confirm
      onClick={e => validate()}
      >Save</Button>
    </section>
  </section>
</main>
)}