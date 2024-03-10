/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { PiUserPlusBold } from "react-icons/pi";
import { UserComp } from '../../UserComp';
import { useRecoilState } from 'recoil';
import { LuCalendarSearch } from "react-icons/lu";
import { DateTime , Duration  } from "luxon";
import { UserInfo, ShiftInfo , load_schedules_state, usersState , shiftsState, UserSlot, UserInfoWithShifts } from '../../../state/state'



export function SchedulerGrid () {

    const timetableRef = useRef<HTMLDivElement>(null);
    const [timetableWidth, setTimetableWidth] = useState(0);

    const [selectedWeek, setSelectedWeek] = useState<DateTime>(DateTime.now().startOf('week'));
    const goToPreviousWeek = () => setSelectedWeek(selectedWeek.minus({ weeks: 1 }));
    const goToNextWeek = () => setSelectedWeek(selectedWeek.plus({ weeks: 1 }));

    const [searchName, setSearchName] = useState<string>("")
    
    const [users , setUsers] = useRecoilState(usersState)
    const [shifts , setShifts] = useRecoilState(shiftsState)
    const [selectedUser, setSelectedUser] = useState<string>("")

    const [selectedShift, setSelectedShift] = useState<ShiftInfo | undefined>(undefined);

    useEffect(() => {
        load_schedules_state( setUsers , setShifts)
    }, [setShifts, setUsers]);

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            const entry = entries[0];
            setTimetableWidth(entry.contentRect.width);
        });
        if (timetableRef.current) {
            observer.observe(timetableRef.current);
        }
        return () => {
            if (timetableRef.current) {
                observer.unobserve(timetableRef.current);
            }
            observer.disconnect();
        };
    }, []);

    const get_users = () : UserInfoWithShifts[] => {
        if (searchName == ""){
            return users.map(
                user => ({
                    ...user,
                    availabilities : user.availabilities.filter( a => inCurrentWeek(a.start) ),
                    shifts: shifts.filter(shift => shift.employee === user.name).filter(
                        shift => inCurrentWeek(shift.date.start)
                    ),
                })
            )
        }
        return users.filter( e => e.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())).map(
            user => ({
                ...user,
                availabilities : user.availabilities.filter( a => inCurrentWeek(a.start) ),
                shifts: shifts.filter(shift => shift.employee === user.name).filter(
                    shift => inCurrentWeek(shift.date.start)
                ),
            })
        )
    }

    function weekDetailsToString( day:DateTime ){
        return "" + day.startOf('week').day + " - " + day.endOf('week').day + " / " + day.month + " / " + day.year
    }

    const inCurrentWeek = (date: DateTime) => {
        return date >= selectedWeek && date < selectedWeek.plus({ weeks: 1 });
    };

    const calculateSlotPositionAndWidth = (start: DateTime, end: DateTime) => {
        const totalMinutesInWeek = Duration.fromObject({ weeks: 1 }).as('minutes');
        const startMinutes = start.diff(selectedWeek.startOf('week'), 'minutes').minutes;
        const durationMinutes = end.diff(start, 'minutes').minutes;

        return {
            left: (startMinutes / totalMinutesInWeek) * timetableWidth,
            width: (durationMinutes / totalMinutesInWeek) * timetableWidth
        };
    };

    
    const renderShiftInfo = () => {
        return <>
            <div className='w-80 border-gray-200 border-2 rounded bg-white z-20 p-2 overflow-hidden mt-1'>
                <div> Slot Detail </div>
                <div className='grid grid-cols-[1fr_1fr] gap-1 mt-2'> 
                    <div> Employee</div>    <div> {selectedShift?.employee} </div>
                    <div> Skills</div>      <div> {selectedShift?.requiredSkill}  </div>
                    <div> Start</div>  <div> {selectedShift?.date.start.toFormat("yyyy-MM-dd HH:mm")}  </div>
                    <div> End</div>    <div> {selectedShift?.date.end.toFormat("yyyy-MM-dd HH:mm")} </div>
                    <div> Details</div>     <div> {selectedShift?.details} </div>
                </div>
            </div>
        </>
    }   

    const renderSlots = (shifts: ShiftInfo[]) => {
         return shifts.map((shift, index) => {
            const slot = shift.date
            const { left, width } = calculateSlotPositionAndWidth(slot.start , slot.end);
            return (<>
                <div key={index} style={{ left, width }} 
                className="absolute overflow-hidden bg-green-500 h-12 p-1 pl-2 text-sm rounded -top-6 z-10"
                onClick={() => setSelectedShift(shift === selectedShift ? undefined : shift)}>
                    { shift.details }
                
                </div>
                {selectedShift == shift ? <div style={ timetableWidth / 2 > left ? { left: left } : {right: timetableWidth - left - width}} className='absolute z-20 top-6 '> {renderShiftInfo()} </div> : <></>}
                </>
            );
        });
    };

    const renderAvailabilities = (slots: UserSlot[]) => {
        const bgColorMap = new Map<string, string>([
            ["DESIRED", "bg-blue-500/50"],
            ["UNDESIRED", "bg-yellow-500/50"],
            ["UNAVAILABLE", "bg-red-500/50"],
            ["default", "bg-gray-500/50"] // Default color
        ]);
        return slots.map((slot, index) => {
            const { left, width } = calculateSlotPositionAndWidth(slot.start, slot.end);
            const bgColor = bgColorMap.get(slot.details) ?? bgColorMap.get("default") ;
            return (
                <div key={index} style={{ left, width }} 
                className={`absolute ${bgColor} rounded overflow-hidden h-12 p-1 pl-2 text-sm -top-6`}>
                    {slot.details}
                </div>
            );
        });
    };

    const renderMouse = () => {
        return <>
            <div className='absolute border-2 border-red-100 h-12 -top-6'>
                
            </div>
        </>
    }

    interface IMyProps {
        user: UserInfoWithShifts,
    }
    const RenderLine: React.FC<IMyProps> = ( {user} ) => {
        return <>
            <div key={user.name+"n"} 
                className=" hover:bg-green-100 flex flex-row items-center cursor-pointer"
                >
                <div className="flex flex-row items-center gap-4 w-48 p-2 border-r overflow-hidden top-full hover:bg-green-100"
                    onClick={() => setSelectedUser(user.id === selectedUser ? "" : user.id)}>
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={user.image} alt={user.name} />
                </div>
                <div> {user.name} </div>
                </div>
                <div
                    ref={timetableRef}
                    className="border-left w-full relative top-0"
                    >
                        {renderSlots(user.shifts)}  
                        {renderAvailabilities(user.availabilities)}   
                        {renderMouse()}
                </div>
            </div>
        </>
    }

    const [selectedRangeMode, setSelectedRangeMode] = useState("Week");

    return (

        <>
        <div className="border overflow-hidden rounded" >
            <div className="flex flex-row items-center">
                <div  className="
                flex flex-row items-center gap-1 w-48 p-2 border-r overflow-hidden top-full h-12
                "> </div>
                <div ref={timetableRef}
                     className="border-left w-full relative top-0
                     grid grid-cols-[15fr_55fr_15fr_15fr] items-center"
                    >
                    <div className="flex justify-center items-center"> 
                        <FaAngleLeft className="w-6 h-6 fill-green-600 cursor-pointer" onClick={goToPreviousWeek}/> 
                    </div>


                    <div className="flex justify-center items-center mt-1"> 
                        <div className='flex flex-row gap-2 items-center p-1 border cursor-pointer rounded'> 
                            <div>{ weekDetailsToString(selectedWeek) } </div>
                            <div> <LuCalendarSearch className='w-6 h-6 stroke-green-500/80 '/> </div>
                        </div>
                    </div>


                    <div className="flex justify-center items-center"> 
                        <FaAngleRight className="w-6 h-6 fill-green-600 cursor-pointer" onClick={goToNextWeek}/> 
                    </div>
                    <div className="flex flex-row gap-2 justify-center items-center mr-1"> 
                        {["Day", "Week", "Month"].map(mode => (
                            <div key={mode}
                                className={`border-2 rounded p-1 cursor-pointer
                                            ${selectedRangeMode === mode ? 'text-green-600 border-green-200 bg-green-100 font-semibold' : 'text-gray-400 border-gray-200'}
                                            hover:text-green-600 hover:border-green-200 hover:font-semibold`}
                                onClick={() => setSelectedRangeMode(mode)}>
                                {mode}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-row items-center ">
                <div  className="
                flex flex-row items-center gap-1 w-48 p-2 border-r overflow-hidden top-full
                "> 
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <IoSearch className="w-10 h-10 fill-green-600" />
                    </div>
                    <div> 
                        <input 
                        className='w-28 border-b-green-600 border-b-2 focus:outline-none' 
                        placeholder="Chercher.."
                        onChange={e => {setSearchName(e.target.value)}} value={searchName}/>    
                    </div>
                </div>
                <div ref={timetableRef}
                className="border-left w-full relative top-0 grid grid-cols-7">
                    {
                        ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"].map(
                            e => {
                                return <>
                                    <div className='relative flex justify-center' key={e}>
                                        <div className=' pt-4' > {e} </div>
                                        <div className={`absolute border-green-50 border-2 w-full -z-10 right-0 top-0`} style={{height: "1000px"}}></div>
                                    </div> 
                                </>
                            }
                        )
                    }              
                </div>
            </div>

            {
                get_users().map( 
                    u => { return <>
                    <RenderLine user={u}/>
                    { selectedUser == u.id && <UserComp user={ u }/> }
                    </> } 
                )
            }
            <div className="flex flex-row items-center">
                <div  className="
                flex flex-row items-center gap-4 w-48 p-2 border-r overflow-hidden top-full cursor-pointer
                "> 
                    <div className="pl-2 w-12 h-12 rounded-full overflow-hidden">
                        <PiUserPlusBold className="w-10 h-10 fill-green-600" />
                    </div>
                    <div> ajouter</div>  
                </div>

                <div
                ref={timetableRef}
                className="border-left w-full relative top-0
                flex flex-row justify-around
                ">                        
                </div>
            </div>
        </div>
        </>
    );
}
