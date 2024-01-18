/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useRef, useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { PiUserPlusBold } from "react-icons/pi";

let users = [
    {
        name:"Etienne",
        image:"profiles/2.png",
        slots : [
            { start: new Date(2024, 0, 17, 9, 0), end: new Date(2024, 0, 17, 11, 0), details:"" ,type:"1" },
            { start: new Date(2024, 0, 1, 13, 0), end: new Date(2024, 0, 2, 15, 0), details:"" ,type:"1" },
        ]
    },
    {
        name:"Milos",
        image:"profiles/1.png",
        slots : [
            { start: new Date(2024, 0, 17, 4, 0), end: new Date(2024, 0, 17, 15, 0), details:"" ,type:"2" },
            { start: new Date(2024, 0, 18, 13, 0), end: new Date(2024, 0, 19, 15, 0), details:"" ,type:"1" },
        ]
    }
    ,
    {
        name:"Renata",
        image:"profiles/3.png",
        slots : [
            { start: new Date(2024, 0, 17, 9, 0), end: new Date(2024, 0, 17, 11, 0), details:"",type:"3"  },
            { start: new Date(2024, 0, 12, 13, 0), end: new Date(2024, 0, 13, 10, 0), details:"",type:"3" },
        ]
    }
    ,
    {
        name:"Paul",
        image:"profiles/4.png",
        slots : [
            { start: new Date(2024, 0, 17, 9, 0), end: new Date(2024, 0, 17, 11, 0), details:"" ,type:"1" },
            { start: new Date(2024, 0, 12, 13, 0), end: new Date(2024, 0, 13, 10, 0), details:"" ,type:"2" },
        ]
    }
    ,
    {
        name:"Eliot",
        image:"profiles/5.png",
        slots : [
            { start: new Date(2024, 0, 17, 9, 0), end: new Date(2024, 0, 17, 11, 0), details:"" ,type:"2" },
            { start: new Date(2024, 0, 12, 13, 0), end: new Date(2024, 0, 13, 10, 0), details:"" ,type:"1" },
        ]
    }
    ,
    {
        name:"Sara",
        image:"profiles/6.png",
        slots : [
            { start: new Date(2024, 0, 17, 9, 0), end: new Date(2024, 0, 17, 11, 0), details:"" ,type:"1" },
            { start: new Date(2024, 0, 12, 13, 0), end: new Date(2024, 0, 13, 10, 0), details:"" ,type:"3" },
        ]
    },
    {
        name:"Ayoub",
        image:"profiles/7.png",
        slots : [
            { start: new Date(2024, 0, 17, 9, 0), end: new Date(2024, 0, 17, 11, 0), details:"" ,type:"2"},
            { start: new Date(2024, 0, 12, 13, 0), end: new Date(2024, 0, 13, 10, 0), details:""  ,type:"2"},
        ]
    }
]


export function SchedulerGrid () {

    const timetableRef = useRef<HTMLDivElement>(null);
    const [timetableWidth, setTimetableWidth] = useState(0);
    const [selectedWeek, setSelectedWeek] = useState<Date>(new Date())
    const [searchName, setSearchName] = useState<string>("")

    const updateWidth = () => {
        if (timetableRef.current) {
            setTimetableWidth(timetableRef.current.offsetWidth);
        }
    };

    useEffect(() => {
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []); 


    const get_users = () => {
        if (searchName == ""){
            return users
        }
        return users.filter( e => e.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()))
    }

    function weekDetailsToString( details:any ){
        return "" + details.firstDayOfWeek.getDate() + "-" + details.lastDayOfWeek.getDate() + " / " + details.month + " / " + details.year
    }

    const totalMinutesInWeek = 7 * 24 * 60;

    const getMinutesFromWeekStart = (date: Date) => {
        const startOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay(), 0, 0, 0);
        return (date.getTime() - startOfWeek.getTime()) / 60000;
    };

    function getWeekDetails(inputDate: Date): { firstDayOfWeek: Date, lastDayOfWeek: Date, month: number, year: number } {
        let date = new Date(inputDate.getTime());
        const dayOfWeek = date.getDay();
        const firstDayOfWeek = new Date(date.setDate(date.getDate() - dayOfWeek));
        date = new Date(inputDate.getTime()); 
        const lastDayOfWeek = new Date(date.setDate(date.getDate() - dayOfWeek + 6));
        const month = inputDate.getMonth() + 1;
        const year = inputDate.getFullYear();
        return { firstDayOfWeek, lastDayOfWeek, month, year };
    }

    const calculateSlotPositionAndWidth = (start: Date, end: Date) => {
        const startMinutes = getMinutesFromWeekStart(start);
        const endMinutes = getMinutesFromWeekStart(end);
        const durationMinutes = endMinutes - startMinutes;
    
        const left = (startMinutes / totalMinutesInWeek) * timetableWidth ;
        const width = (durationMinutes / totalMinutesInWeek)  * timetableWidth;
    
        return { left, width };
    };


    const renderSlots = (slots: any[]) => {
         return slots.map((slot, index) => {
            const { left, width } = calculateSlotPositionAndWidth(slot.start , slot.end);

            return (
                <div key={index} style={{ left, width }} 
                className="absolute bg-green-500 overflow-hidden h-12 p-1 pl-2 text-sm rounded-sm -top-6"
                >
                    {slot.start.toLocaleDateString()} {slot.start.toLocaleTimeString()} - 
                    {slot.end.toLocaleDateString()} {slot.end.toLocaleTimeString()}
                </div>
            );
        });
    };

    return (

        <>
        <div className="border overflow-hidden" >
            <div className="flex flex-row items-center">
                <div  className="
                flex flex-row items-center gap-1 w-48 p-2 border-r overflow-hidden top-full h-12
                "> </div>
                <div
                ref={timetableRef}
                className="border-left w-full relative top-0
                flex flex-row justify-around
                ">
                    <div> <FaAngleLeft className="w-8 h-8 fill-green-600 cursor-pointer"/> </div>
                    <div> { weekDetailsToString(getWeekDetails(selectedWeek)) } </div> 
                    <div> <FaAngleRight className="w-8 h-8 fill-green-600 cursor-pointer"/> </div>                     
                </div>
            </div>

            <div className="flex flex-row items-center">
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
                                    <div className='relative flex justify-center'>
                                        <div> {e} </div>
                                        <div className='absolute border-r-2 right-0 top-0' style={{height:1000}}></div> 
                                    </div> 
                                </>
                            }
                        )
                    }              
                </div>
            </div>

            {
                get_users().map( 
                    u => { 
                        return <div key={u.name+"n"} 
                            className=" hover:bg-green-100 flex flex-row items-center cursor-pointer"
                            >
                            <div  className="
                            flex flex-row items-center gap-4 w-48 p-2 border-r overflow-hidden top-full
                            hover:bg-green-100
                            "> 
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img src={u.image} alt=""/>
                                </div>
                                <div> {u.name} </div>
                            </div>

                            <div
                            ref={timetableRef}
                            className="border-left w-full relative top-0"
                            >
                                {renderSlots(u.slots)}                                
                            </div>

                        </div> } 
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
