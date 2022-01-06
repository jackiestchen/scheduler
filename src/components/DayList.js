import React from 'react';
import DayListItem from './DayListItem';

export default function DayList (props) {
  console.log(props.days);

  return (
    <ul>
      <DayListItem />
    </ul>
  );
}