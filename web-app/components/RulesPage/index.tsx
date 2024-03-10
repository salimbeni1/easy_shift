/* eslint-disable @next/next/no-img-element */
"use client"

import { UserInfo } from '@/state/state';
import React, { useRef, useState, useEffect } from 'react';
import { BsPlus } from 'react-icons/bs';

export function RulesPage ({}) {

    const general_rules = [
        {
          "name": "Missing required skill",
          "type": "hard",
          "description": "constraintFactory.forEach(Shift.class).filter(shift -> !shift.getEmployee().getSkills().contains(shift.getRequiredSkill())).penalize(HardSoftScore.ONE_HARD).asConstraint(\"Missing required skill\")"
        },
        {
          "name": "Overlapping shift",
          "type": "hard",
          "description": "constraintFactory.forEachUniquePair(Shift.class, Joiners.equal(Shift::getEmployee), Joiners.overlapping(Shift::getStart, Shift::getEnd)).penalize(HardSoftScore.ONE_HARD, EmployeeSchedulingConstraintProvider::getMinuteOverlap).asConstraint(\"Overlapping shift\")"
        },
        {
          "name": "At least 10 hours between 2 shifts",
          "type": "hard",
          "description": "constraintFactory.forEachUniquePair(Shift.class, Joiners.equal(Shift::getEmployee), Joiners.lessThanOrEqual(Shift::getEnd, Shift::getStart)).filter((firstShift, secondShift) -> Duration.between(firstShift.getEnd(), secondShift.getStart()).toHours() < 10).penalize(HardSoftScore.ONE_HARD, (firstShift, secondShift) -> { int breakLength = (int) Duration.between(firstShift.getEnd(), secondShift.getStart()).toMinutes(); return (10 * 60) - breakLength; }).asConstraint(\"At least 10 hours between 2 shifts\")"
        },
        {
          "name": "Max one shift per day",
          "type": "hard",
          "description": "constraintFactory.forEachUniquePair(Shift.class, Joiners.equal(Shift::getEmployee), Joiners.equal(shift -> shift.getStart().toLocalDate())).penalize(HardSoftScore.ONE_HARD).asConstraint(\"Max one shift per day\")"
        },
        {
          "name": "Unavailable employee",
          "type": "hard",
          "description": "constraintFactory.forEach(Shift.class).join(Availability.class, Joiners.equal((Shift shift) -> shift.getStart().toLocalDate(), Availability::getDate), Joiners.equal(Shift::getEmployee, Availability::getEmployee)).filter((shift, availability) -> availability.getAvailabilityType() == AvailabilityType.UNAVAILABLE).penalize(HardSoftScore.ONE_HARD, (shift, availability) -> getShiftDurationInMinutes(shift)).asConstraint(\"Unavailable employee\")"
        },
        {
          "name": "Desired day for employee",
          "type": "soft",
          "description": "constraintFactory.forEach(Shift.class).join(Availability.class, Joiners.equal((Shift shift) -> shift.getStart().toLocalDate(), Availability::getDate), Joiners.equal(Shift::getEmployee, Availability::getEmployee)).filter((shift, availability) -> availability.getAvailabilityType() == AvailabilityType.DESIRED).reward(HardSoftScore.ONE_SOFT, (shift, availability) -> getShiftDurationInMinutes(shift)).asConstraint(\"Desired day for employee\")"
        },
        {
          "name": "Undesired day for employee",
          "type": "soft",
          "description": "constraintFactory.forEach(Shift.class).join(Availability.class, Joiners.equal((Shift shift) -> shift.getStart().toLocalDate(), Availability::getDate), Joiners.equal(Shift::getEmployee, Availability::getEmployee)).filter((shift, availability) -> availability.getAvailabilityType() == AvailabilityType.UNDESIRED).penalize(HardSoftScore.ONE_SOFT, (shift, availability) -> getShiftDurationInMinutes(shift)).asConstraint(\"Undesired day for employee\")"
        }
      ]

      
    return (
        <>
            <div>
            <h1 className= "text-green-600 font-bold text-3xl pb-6"> Regles Generales </h1>
            {general_rules.map( ( r , idx ) => {
              return <div key={idx} className="flex gap-2 items-center" >
                <div className="w-3 h-3 bg-green-300" ></div>
                <p className={r.type == "hard" ? "text-red-500/50" : "text-orange-500/50" }>{r.type}</p> <p>{r.name}</p>
              </div>
            })}
            <div className="flex w-max items-center cursor-pointer border pr-2 mt-2 ">
              <BsPlus className='fill-green-600 w-12 h-12'/> 
              <div> New Rule </div>
            </div>
          </div>
        </>
    );
}
