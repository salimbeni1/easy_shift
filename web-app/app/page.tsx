import { SchedulerGrid } from '@/components/SchedulerGrid'
import Image from 'next/image'

export default function Home() {
  return (
    

      <main className= "m-10 w-100vw h-100vh overflow-hidden ">
      
          <div>

              <h1 className= "text-green-600 font-bold text-2xl pb-6"> Easy Shift </h1>

          </div>

          <div>

            <SchedulerGrid/>

          </div>
      
      </main>
  )
}
