import { SchedulerGrid } from '@/components/SchedulerGrid'
import Image from 'next/image'

import { LuSend } from "react-icons/lu";
import { PiFilePdfDuotone } from "react-icons/pi";
import { BsPlus } from "react-icons/bs";

export default function Home() {

  const general_rules = [
    { 
      name : "Max 10h consecutives"
    },
    { 
      name : "Min 2h de pause"
    }
  ]

  return (
      <main className= "m-10 w-100vw h-100vh overflow-hidden ">
      
          <div className='flex justify-between'>

              <h1 className= "text-green-600 font-bold text-3xl pb-6"> Easy Shift </h1>

              <div className= "font-bold text-2xl pb-6 cursor-pointer" >
                login
              </div>

          </div>

          <div>

            <SchedulerGrid/>

          </div>

          <div className='flex pt-6 justify-end gap-3 pr-3'>
            
            <div>
              <PiFilePdfDuotone className='fill-green-600 w-14 h-14 cursor-pointer'/>
            </div>

            <div>
              <LuSend className='stroke-green-600 w-12 h-12 cursor-pointer'/>
            </div>

          </div>

          <div>
            <h1 className= "text-green-600 font-bold text-3xl pb-6"> Regles Generales </h1>
            {general_rules.map( ( r , idx ) => {
              return <div key={idx} className="flex gap-2 items-center" >
                <div className="w-3 h-3 bg-green-300" ></div>
                <p>{r.name}</p>
              </div>
            })}
            <div className="flex w-max items-center cursor-pointer border pr-2 mt-2 ">
              <BsPlus className='fill-green-600 w-12 h-12'/> 
              <div> New Rule </div>
            </div>
          </div>
      </main>
  )
}
