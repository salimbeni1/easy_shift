/* eslint-disable @next/next/no-img-element */
"use client"

import { UserInfo } from '@/state/state';
import React, { useRef, useState, useEffect } from 'react';

interface UserInfoProps {
    user: UserInfo;
}
  
export function UserComp ({
    user
} : UserInfoProps ) {
    return (
        <>
            <div className="border bg-white p-5 ">
                
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src={user.image} alt=""/>
                    </div>
                    <div> {user.name} </div>
                </div>
                <div>
                    <div>Skills : {JSON.stringify(user.skills)} </div>
                </div>
            </div>
        </>
    );
}
