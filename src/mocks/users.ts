export const users = [
    {
        id: '0000',
        username: 'admin',
        password: '1234',
        accessToken: '',
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
        accessToken: generateToken()
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