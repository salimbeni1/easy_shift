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
    slots: UserSlot[];
};

let demoUsers : UserInfo[] = [
    {
        name:"Etienne",
        image:"profiles/2.png",
        id:"0",
        slots : [
            { start: new Date(2024, 0, 17, 9, 0), end: new Date(2024, 0, 17, 11, 0), details:"" ,type:"1" },
            { start: new Date(2024, 0, 1, 13, 0), end: new Date(2024, 0, 2, 15, 0), details:"" ,type:"1" },
        ]
    },
    {
        name:"Milos",
        image:"profiles/1.png",
        id:"1",
        slots : [
            { start: new Date(2024, 0, 17, 4, 0), end: new Date(2024, 0, 17, 15, 0), details:"" ,type:"2" },
            { start: new Date(2024, 0, 18, 13, 0), end: new Date(2024, 0, 19, 15, 0), details:"" ,type:"1" },
        ]
    },
    {
        name:"Renata",
        image:"profiles/3.png",
        id:"2",
        slots : [
            { start: new Date(2024, 0, 17, 9, 0), end: new Date(2024, 0, 17, 11, 0), details:"",type:"3"  },
            { start: new Date(2024, 0, 12, 13, 0), end: new Date(2024, 0, 13, 10, 0), details:"",type:"3" },
        ]
    },
    {
        name:"Paul",
        image:"profiles/4.png",
        id:"3",
        slots : [
            { start: new Date(2024, 0, 17, 9, 0), end: new Date(2024, 0, 17, 11, 0), details:"" ,type:"1" },
            { start: new Date(2024, 0, 12, 13, 0), end: new Date(2024, 0, 13, 10, 0), details:"" ,type:"2" },
        ]
    },
    {
        name:"Eliot",
        image:"profiles/5.png",
        id:"4",
        slots : [
            { start: new Date(2024, 0, 17, 9, 0), end: new Date(2024, 0, 17, 11, 0), details:"" ,type:"2" },
            { start: new Date(2024, 0, 12, 13, 0), end: new Date(2024, 0, 13, 10, 0), details:"" ,type:"1" },
        ]
    },
    {
        name:"Sara",
        image:"profiles/6.png",
        id:"5",
        slots : [
            { start: new Date(2024, 0, 17, 9, 0), end: new Date(2024, 0, 17, 11, 0), details:"" ,type:"1" },
            { start: new Date(2024, 0, 12, 13, 0), end: new Date(2024, 0, 13, 10, 0), details:"" ,type:"3" },
        ]
    },
    {
        name:"Ayoub",
        image:"profiles/7.png",
        id:"6",
        slots : [
            { start: new Date(2024, 0, 17, 9, 0), end: new Date(2024, 0, 17, 11, 0), details:"" ,type:"2"},
            { start: new Date(2024, 0, 12, 13, 0), end: new Date(2024, 0, 13, 10, 0), details:""  ,type:"2"},
        ]
    }
]

const usersState = atom<UserInfo[]>({
    key: 'usersState',
    default: demoUsers, 
});

const allUsersSelector = selector({
    key: 'allUsersSelector',
    get: ({get}) => {
        const users = get(usersState);
        return users;
    },
});

const userByIdSelector = selector({
    key: 'userByIdSelector',
    get: ({get}) => (id: string) => {
        const users = get(usersState);
        return users.find(user => user.id === id);
    },
});

export { usersState, allUsersSelector, userByIdSelector };
export type { UserInfo, UserSlot };

