import React from "react";
import classnames from 'classnames/bind';

import "components/DayListItem.scss";

export default function DayListItem(props) {
    const dayListItemClass = classnames("day-list__item", {
        "day-list__item--selected": props.selected,
        "day-list__item--full": props.spots === 0
      });
      
      const formatSpots = () => props.spots === 0 ? 'no spots remaining' : props.spots === 1 ? props.spots + ' spot remaining' : props.spots + ' spots remaining';

    return (
        <li className={dayListItemClass}  onClick={() => props.setDay(props.name)}>
          <h2 className="text--regular">{props.name}</h2>
          <h3 className="text--light">{formatSpots()}</h3>
        </li>
      );
}