import { atom ,selector } from "recoil";

type UserSlot = {
    start: Date;
    end: Date;
    details: string;
    type: string;
};

type UserInfo = {
    id: string;
    name: string;
    image: string;
    skills : string[];
    availabilities: UserSlot[];

};

type ShiftInfo = {
    employee : string;
    requiredSkill : string;
    details: string;
    date : UserSlot;
};

type UserInfoWithShifts = UserInfo & {
    shifts: ShiftInfo[];
};

const usersState = atom<UserInfo[]>({
    key: 'usersState',
    default: [], 
});

const shiftsState = atom<ShiftInfo[]>({
    key: 'shiftsState',
    default: [], 
});

const allUsersSelector = selector<UserInfoWithShifts[]>({
    key: 'allUsersSelector',
    get: ({get}) => {
        const users = get(usersState);
        const shifts = get(shiftsState);
        return users.map(user => ({
            ...user,
            shifts: shifts.filter(shift => shift.employee === user.name),
        }));
    },
});

export function load_schedules_state ( setUsers : any , setShifts:any ) {

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:8080/schedule');
        const data = await response.json();
        const users: UserInfo[] = data.employees.map((employee: { name: any; skills: any; }) => {
            const availabilities: UserSlot[] = data.availabilities
                .filter((avail: { employee: { name: any; }; }) => avail.employee.name === employee.name)
                .map((avail: { date: string | number | Date; availabilityType: any; }) => ({
                    start: new Date(avail.date),
                    end: new Date(new Date(avail.date).setHours(20, 59, 59, 999)),
                    details: avail.availabilityType,
                    type: 'Availability',
                }));

            return {
                id: employee.name, 
                name: employee.name,
                image: "profiles/2.png",
                skills: employee.skills,
                availabilities,
            };
        });
        const shifts: ShiftInfo[] = data.shifts
                .map((shift: any) => (
                {
                employee : shift.employee?.name,
                requiredSkill : shift.requiredSkill,
                details: shift.location,
                 date:  {
                        start: new Date(shift.start),
                        end: new Date(shift.end),
                        details: "",
                        type: "",
                    }
                }
                ));
        setUsers(users)
        setShifts(shifts)

    };
    fetchUsers().catch(console.error);
} 

export { usersState, allUsersSelector , shiftsState };
export type { UserInfo, UserSlot , ShiftInfo };
