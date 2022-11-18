import { UserType } from "../contexts/UserContext";

interface APIUserData extends UserType {
    password: string,
    account: {id: string, balance: number}
}

export const users : APIUserData[] = [
    {
        id: '0000',
        username: 'admin',
        password: '1234',
        accessToken: '',
        account: {
            id: '000001',
            balance: 10000
        }
    }
]

export const logAllUsers = ()=>{
    console.log(users);
}

export const generateToken = () => {
    return (Math.floor(Math.random() * 1000000)).toString();
}

export function addUser(data : {username: string, password: string}) {
    const newUser = {
        id: (Math.floor(Math.random() * 10000)).toString(),
        username: data.username,
        password: data.password,
        accessToken: generateToken(),
        account: {
            id: generateToken(),
            balance: 10000
        }
    }
    console.log(newUser);
    users.push(newUser);
    return (newUser);
}

export function login(credentials : {username: string, password: string}) {
    const user = users.find(user=>user.username === credentials.username && user.password === credentials.password);
    if (user) {
        const newToken = generateToken();
        user.accessToken = newToken; // modify in db
        return {username: user.username, id: user.id, accessToken: newToken}
    } else {
        throw new Error('Invalid credentials');
    }
}

export function findUser(id : string) {
    return users.find((user)=>user.id === id);
}