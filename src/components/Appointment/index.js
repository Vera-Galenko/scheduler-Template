import React, { Fragment } from "react";
import Header from "../Appointment/Header";
import Show from "../Appointment/Show";
import Empty from "../Appointment/Empty";
import "../Appointment/styles.scss";


export default function Appointment(props) {
    console.log("props :", props);
return (
<article className="appointment">
{!props.interview ?
  (<Fragment>
   <Header time={props.time} />
   <Empty/>
  </Fragment>
) :
( <Fragment>
   <Header time={props.time} />
   <Show student={props.interview.student} interviewer={props.interview.interviewer}/>
  </Fragment>
)}
</article>

);

};