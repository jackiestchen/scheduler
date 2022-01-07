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
  console.log(interviewerClass);

  return (
    <li className={interviewerClass}>
      <img
        className={imgClass}
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  );
}
