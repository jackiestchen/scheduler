import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  const formatSpots = (spot) => {
    if (spot === 0) {
      return `no spots`;
    }
    if (spot === 1) {
      return `${spot} spot`;
    }
    if (spot > 1) {
      return `${spot} spots`;
    }
  };

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light"> {formatSpots(props.spots)} remaining</h3>
    </li>
  );
}
