import React from "react";
import DayListItem from "./DayListItem";

//Daylist component which will send props to DayListItem component. This will display the menu bar on the left regarding remaining spots per day

export default function DayList(props) {
  const days = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={() => props.onChange(day.name)}
      />
    );
  });

  return <ul>{days}</ul>;
}
