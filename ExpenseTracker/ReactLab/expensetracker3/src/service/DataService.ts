import axios from "axios"
import IDataList from "../models/IDataList"


const getDataFromServer=()=>{
    return axios.get<IDataList[]>('http://localhost:3000/expenses')
    .then(res=>res.data)
}

const pushDataToServer=(data:Omit<IDataList,'id'>)=>{
    return axios.post<IDataList[]>('http://localhost:3000/expenses',data,{
        headers:{
            'Content-Type':'application/json'
        }
    }
    )
    .then(res=>res.data)
}


export {
    getDataFromServer,
    pushDataToServer
}

