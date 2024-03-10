'use client';
import { SchedulerGrid } from '@/components/SchedulePage/SchedulerGrid'

import { LuSend } from "react-icons/lu";
import { PiFilePdfDuotone } from "react-icons/pi";
import { TbTruckLoading , TbDoorOff  } from "react-icons/tb";
import { BsPlus } from "react-icons/bs";
import { useRecoilState } from 'recoil';
import { load_schedules_state, shiftsState, usersState } from '@/state/state';
import { useState } from 'react';
import { SchedulePage } from '@/components/SchedulePage';
import { RulesPage } from '@/components/RulesPage';

export default function Home() {

  const [selectedPage, setSelectedPage] = useState("Schedule")

  const pages = [
    { name: 'Schedule', id: 'Schedule' , component : <></>},
    { name: 'Requests', id: 'Requests' , component : <></> },
    { name: 'Rules', id: 'Rules' , component : <></>},
    { name: 'Employee', id: 'Employee' , component : <></> }
  ];
  
  return (
        <main className="m-10 mt-0 w-100vw h-100vh">
        
        <div className='flex justify-between pt-4'>
            <h1 className="text-green-600 font-bold text-3xl pb-4">Easy Shift</h1>
            <div className="font-bold text-2xl pb-6 cursor-pointer text-gray-300">
              login
            </div>
        </div>
      
        <div className='flex flex-row rounded gap-2 bg-green-100 mb-3 top-0 sticky z-50 p-1'>
          {pages.map((page) => (
            <div 
              key={page.id}
              className={`hover:bg-green-300 hover:font-semibold cursor-pointer p-2 rounded ${selectedPage === page.id ? 'bg-green-400 font-semibold' : 'text-gray-800'}`}
              onClick={() => setSelectedPage(page.id)}
            >
              {page.name}
            </div>
          ))}
        </div>
      
        {selectedPage == "Schedule" ? <><SchedulePage/></> : <></>}
        {selectedPage == "Rules" ? <><RulesPage/></> : <></>}

      </main>
  )
}
