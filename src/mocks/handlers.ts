import { rest } from 'msw';
import { addUser, findUser, generateToken, login } from './users';

export const handlers = [
    rest.post('/api/register', async (req, res, ctx)=> {
        const data : {username: string, password: string} = await req.json()
        const {username, id, accessToken} = addUser({...data});
        return res(ctx.json({ username, id, accessToken }));
    }),
    rest.post('/api/auth', async (req, res, ctx)=> {
        const credentials = await req.json();
        try {
            const payload = login(credentials);
            return res(ctx.json(payload));

        } catch (e) {
            console.error(e);
            return res(ctx.status(401));
        }
    
    }),
    rest.get('/api/:id/:data', (req, res, ctx) => {
        const {id, data} = req.params;
        console.log('id: ', id, 'data req: ', data);
        
        const target = findUser(id as string);
        console.log('target: ', target);
        
        if(req.headers.get('authorization') === target?.accessToken){
            switch(data) {
                case 'cash':
                    return res(ctx.json({balance: target.account.balance}));
                default:
                    return res(ctx.status(404));
            }
        }
        return res(ctx.status(403));
    })
    // rest.post('/api/login', async (req, res, ctx)=>{

    //     const credentials = await req.json();

    //     try {
    //         const payload = login(credentials);
    //         ctx.status(200)
    //         return res(ctx.json(payload));

    //     } catch (e) {
    //         console.error(e);
    //         ctx.status(403);
    //         return res();
    //     }
    //     }),
]