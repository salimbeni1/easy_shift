/* eslint-disable @next/next/no-img-element */
"use client"

import { UserInfo } from '@/state/state';
import React, { useRef, useState, useEffect } from 'react';
import { SchedulerGrid } from './SchedulerGrid';
import { TbDoorOff, TbTruckLoading } from 'react-icons/tb';
import { PiFilePdfDuotone } from 'react-icons/pi';
import { LuSend } from 'react-icons/lu';

import { load_schedules_state, shiftsState, usersState } from '@/state/state';
import { useRecoilState } from 'recoil';

export function SchedulePage ( {} ) {

    
    const [users , setUsers] = useRecoilState(usersState)
    const [shifts , setShifts] = useRecoilState(shiftsState)

    const sendSolve = async (e : any) => {
        try {
            const response = await fetch('http://localhost:8080/schedule/solve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Success');
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
          console.error('Error:', error);
        }
    };

    const sendStopSolve = async (e : any) => {
      try {
          const response = await fetch('http://localhost:8080/schedule/stopSolving', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          if (response.ok) {
              load_schedules_state( setUsers , setShifts )
              console.log('Success');
          } else {
              console.error('Error:', response.statusText);
          }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    return (
        <>
        
        <div> <SchedulerGrid/> </div>
        

        <div className='flex pt-6 justify-end gap-3 pr-3'>

        <div onClick={ sendSolve}>
        <TbTruckLoading className='stroke-green-600 w-14 h-14 cursor-pointer'/>
        </div>

        <div onClick={sendStopSolve }>
        <TbDoorOff className='stroke-green-600 w-14 h-14 cursor-pointer'/>
        </div>

        <div onClick={ e => {} }>
        <PiFilePdfDuotone className='fill-green-600 w-14 h-14 cursor-pointer'/>
        </div>
        <div onClick={ e => {} }>
        <LuSend className='stroke-green-600 w-12 h-12 cursor-pointer'/>
        </div>
        </div>

        </>
    );

}
