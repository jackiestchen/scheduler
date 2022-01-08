import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";


export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  const imgClass = classNames("interviewers__item", {
    "interviewers__item-image": props.avatar,
  });
  return (
    <li className={interviewerClass} onClick={() => props.setCurrentInterviewerID(props.id)}>
      <img
        className={imgClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
