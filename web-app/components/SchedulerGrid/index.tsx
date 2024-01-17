/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useRef, useState, useEffect } from 'react';

export function SchedulerGrid () {

    const timetableRef = useRef<HTMLDivElement>(null);
    const [timetableWidth, setTimetableWidth] = useState(0);

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


    let users = [
        {
            name:"Etienne",
            image:"profiles/2.png",
            slots : [
                { start: new Date(2024, 0, 17, 9, 0), end: new Date(2024, 0, 17, 11, 0) },
                { start: new Date(2024, 0, 1, 13, 0), end: new Date(2024, 0, 2, 15, 0) },
            ]
        },
        {
            name:"Milos",
            image:"profiles/1.png",
            slots : [
                { start: new Date(2024, 0, 17, 4, 0), end: new Date(2024, 0, 17, 15, 0) },
                { start: new Date(2024, 0, 18, 13, 0), end: new Date(2024, 0, 19, 15, 0) },
            ]
        }
        ,
        {
            name:"Renata",
            image:"profiles/3.png",
            slots : [
                { start: new Date(2024, 0, 17, 9, 0), end: new Date(2024, 0, 17, 11, 0) },
                { start: new Date(2024, 0, 12, 13, 0), end: new Date(2024, 0, 13, 10, 0) },
            ]
        }
        ,
        {
            name:"Paul",
            image:"profiles/4.png",
            slots : [
                { start: new Date(2024, 0, 17, 9, 0), end: new Date(2024, 0, 17, 11, 0) },
                { start: new Date(2024, 0, 12, 13, 0), end: new Date(2024, 0, 13, 10, 0) },
            ]
        }
        ,
        {
            name:"Eliot",
            image:"profiles/5.png",
            slots : [
                { start: new Date(2024, 0, 17, 9, 0), end: new Date(2024, 0, 17, 11, 0) },
                { start: new Date(2024, 0, 12, 13, 0), end: new Date(2024, 0, 13, 10, 0) },
            ]
        }
        ,
        {
            name:"Sara",
            image:"profiles/6.png",
            slots : [
                { start: new Date(2024, 0, 17, 9, 0), end: new Date(2024, 0, 17, 11, 0) },
                { start: new Date(2024, 0, 12, 13, 0), end: new Date(2024, 0, 13, 10, 0) },
            ]
        },
        {
            name:"Ayoub",
            image:"profiles/7.png",
            slots : [
                { start: new Date(2024, 0, 17, 9, 0), end: new Date(2024, 0, 17, 11, 0) },
                { start: new Date(2024, 0, 12, 13, 0), end: new Date(2024, 0, 13, 10, 0) },
            ]
        }
    ]


    const totalMinutesInWeek = 7 * 24 * 60;

    const getMinutesFromWeekStart = (date: Date) => {
        const startOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay(), 0, 0, 0);
        return (date.getTime() - startOfWeek.getTime()) / 60000; // Convert milliseconds to minutes
    };

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
        <div className="border" >

            {
                users.map( 
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
        </div>
    );
}
