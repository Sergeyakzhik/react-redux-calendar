import React from 'react';
import moment from 'moment';
import { MONTH, WEEK, weekdays } from '../constants/constants';

export const getListOfEvents = (events, date) => {
  const eventsList = [];

  events.forEach((event) => {
    if (moment(event.startDate).startOf('day').toString() === moment(date).startOf('day').toString()) {
      eventsList.push(event);
    }
  });

  return eventsList;
};

export const sortEvents = property => (a, b) => -((a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0);

export const fillDatesArrayWeek = (period) => {
  const array = [];
  const now = moment(period);
  const startOfWeek = moment(period).startOf('week');
  const startOfWeekDate = startOfWeek.date();
  const endOfWeek = moment(period).endOf('week');
  const endOfWeekDate = endOfWeek.date();
  const curYear = moment(period).year();
  let month = startOfWeek.month();
  const daysInCurMonth = moment(period).startOf('week').daysInMonth();

  if (startOfWeekDate > endOfWeekDate) {
    for (let i = startOfWeekDate; i <= daysInCurMonth; i += 1) {
      array.push(now.year(curYear).month(month).date(i).startOf('day')
        .toDate());
    }

    month += 1;

    for (let i = 1; array.length < 7; i += 1) {
      array.push(now.year(curYear).month(month).date(i).startOf('day')
        .toDate());
    }
  } else {
    for (let i = startOfWeekDate; i <= endOfWeekDate; i += 1) {
      array.push(now.year(curYear).month(month).date(i).startOf('day')
        .toDate());
    }
  }
  return array;
};

export const fillDatesArrayMonth = (period) => {
  const array = [];
  const now = moment(period);
  const startOfMonth = now.startOf('month');
  const firstCell = startOfMonth.startOf('week');
  const firstCellDate = startOfMonth.startOf('week').date();
  const curYear = moment(period).year();
  let month = firstCell.month();
  let daysInCurMonth = firstCell.daysInMonth();
  const daysInNextMonth = now.year(curYear).month(month + 1).daysInMonth();

  for (let i = firstCellDate; array.length < 42; i += 1) {
    if (i > daysInCurMonth) {
      i = 1;
      daysInCurMonth = daysInNextMonth;
      month += 1;
    }
    array.push(now.year(curYear).month(month).date(i).startOf('day')
      .toDate());
  }

  return array;
};

export const createTableHeader = (table) => {
  const thead = [];

  if (table === WEEK) {
    const datesArray = fillDatesArrayWeek();

    for (let i = 0; i < 7; i += 1) {
      thead.push(<th key={`THWeek${i}`}>
        {weekdays[i]}
        &nbsp;
        {moment(datesArray[i]).date()}
      </th>);
    }

    thead.unshift(<th key="THWeekEmpty" />);
  }

  if (table === MONTH) {
    for (let i = 0; i < 7; i += 1) {
      thead.push(<th key={`THMonth${i}`}>{weekdays[i]}</th>);
    }
  }

  return <tr>{thead}</tr>;
};
