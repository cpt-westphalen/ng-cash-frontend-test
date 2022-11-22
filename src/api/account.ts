import axios from "axios";

export const getBalance = (credentials : {id: string, accessToken: string}) => {
    return axios.get(`/api/${credentials.id}/cash`, {headers: {'Authorization': credentials.accessToken}})
        .then((res)=>res.data)
        .catch((err)=>{throw new Error(err.status + ", não foi possível receber os dados.")});
}