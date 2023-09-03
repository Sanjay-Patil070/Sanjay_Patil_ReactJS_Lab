import { useEffect, useState } from "react"
import IDataList from "../models/IDataList"
import { getDataFromServer } from "../service/DataService"
import Expensetracker from "./Expensetracker"

function ShowList(){
    const[items,setItems]=useState<IDataList[]>([])

    const[error,setError]=useState<Error|null>(null)

    const[sum,setSum]=useState<number|null>(0)
    const[rahulSpent,setrahulSpent]=useState<number>(0)
    const[rameshSpent,setrameshSpent]=useState<number>(0)
    const[showForm,setShowForm]=useState<boolean>(false)

 useEffect(()=>{
    const fetchData=async()=>{
        try{
            const data=await getDataFromServer();
            setItems(data)
           setSum(data.reduce((res,each)=>res=res+each.price,0))
           shares(data)
        }
        catch(error: any){
            setError(error)
        }
    }
    fetchData();
 },[])

let rahulSpent1=0
let rameshSpent1=0

 const shares=(data:IDataList[])=>{
    data.map(
        each=>(
            each.payeeName==="Rahul"?(
                rahulSpent1=rahulSpent1+each.price
            ):(
                rameshSpent1=rameshSpent1+each.price
            )
        )
    )
    setrahulSpent(rahulSpent1/2)
    setrameshSpent(rameshSpent1/2)
    }
    
    const success=()=>{
        setShowForm(false)
    }

    const cancel=()=>{
        setShowForm(false)
    }
 

return(
    <>
    <header id="page-Header">Expense Tracker</header>
    <button id="Add-Button" onClick={()=>{setShowForm(true)}}>Add</button>
    {
        showForm &&(
        <div className="form">
            <Expensetracker onTrue={success} onClose={cancel}></Expensetracker>
        </div>
        )
    }

    <div className="use-inline date header-color">Date</div>
    <div className="use-inline header-color">Expense Description</div>
    <div className="use-inline price header-color">Price</div>
    <div className="use-inline header-color">Payee</div>

    {
        items&&
        items.map((user,ids)=>(
            <div key={ids}>
            <div className="use-inline date ">{user.date}</div>
            <div className="use-inline">{user.expenseDescription}</div>
            <div className="use-inline price ">{user.payeeName}</div>
            <div className="use-inline">{user.price}</div>
            </div>
        )
        )
    }

    <div className="use-inline">Total Sum</div>
    <div className="use-inline total">{sum}</div><hr/>

    <div className="use-inline">Rahul Spent</div>
    <div className="use-inline total Rahul">{rahulSpent}</div><hr/>
    
    <div className="use-inline">Ramesh Spent</div>
    <div className="use-inline total Ramesh">{rameshSpent}</div><hr/>

    <div className="use-inline payable">{ rahulSpent>rameshSpent?"Pay Rahul":"Pay Ramesh"}</div>
    <div className="use-inline payable price">{Math.abs((rahulSpent-rameshSpent))}</div>

    {
        error &&(
            <>
            {error?.message}
            </>
        )
    }

    </>


)
}

export default ShowList 