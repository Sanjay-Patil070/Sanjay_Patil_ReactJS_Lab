import { ChangeEvent, ChangeEventHandler, Component, FormEvent, FormEventHandler } from "react"
import { pushDataToServer } from "../service/DataService"

type Props={
 onTrue:any,
 onClose:any
}

type State={
payeeName:string,
expenseDescription:string,
price:number,
date:string
}

class  Expensetracker extends Component<Props, State>{
   

  
   constructor(props:Props){
    super(props)
    this.state={
        payeeName:"",
        expenseDescription:"",
        price:0,
        date:this.setDeafaultDate()
    }
    this.setPayee=this.setPayee.bind(this)
    this.setexpenseDescription=this.setexpenseDescription.bind(this)
    this.setPrice=this.setPrice.bind(this)
    this.entryDate=this.entryDate.bind(this)
   }

   setDeafaultDate=()=>{
    const today=new Date();
    return today.getFullYear() +"-"+today.getMonth()+"-"+today.getDay()
   }

   setPayee=(e:ChangeEvent<HTMLSelectElement>)=>{
    this.setState({
        payeeName:e.target.value
    }) 
   }

   setPrice=(e:ChangeEvent<HTMLInputElement>)=>{
    this.setState({
        price:parseInt(e.target.value)
    })
    }

    setexpenseDescription=(e:ChangeEvent<HTMLInputElement>)=>{
        this.setState({
            expenseDescription:e.target.value
        })   
    }

    entryDate=(e:ChangeEvent<HTMLInputElement>)=>{
        this.setState({
            date:e.target.value
        })   
    }
    submitForm=async(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const finalData={
            ...this.state
        }
        const res=await pushDataToServer(finalData)
        this.props.onTrue()
    }
   render(){
    const elem=(
        <>
            <section>
                <header>
                    <h1>Add New Item</h1>
                    <p>Read the below Instrutions before proceeding:</p>
                    <p>Make Sure you fill all the fields where * is provided</p>
                </header>

                <form onSubmit={this.submitForm}>
                <article>
                        <p>Name</p>
                             <select name="" id="" required value={this.state.payeeName} onChange={this.setPayee}>
                                    <option value="" defaultChecked>Choose</option>
                                    <option value="Rahul">Rahul</option>
                                    <option value="Ramesh">Ramesh</option>
                             </select>
                        
                    </article>
                    <article>
                        <p>Product Purchased</p>
                          <input type="text" required value={this.state.expenseDescription} onChange={this.setexpenseDescription    }/>
                        
                    </article>

                    <article>
                        <p>Price</p>
                          <input type="number" required value={this.state.price} onChange={this.setPrice}/>   
                    </article>

                    <article>
                        <p>Date</p>
                          <input type="date" required value={this.state.date} onChange={this.entryDate}/>   
                    </article>

                    <button className="form-button" onClick={this.props.onClose}>Close</button>
                    <button className="form-button" type="submit">Submit</button>
                </form>
            </section>
        </>
    )
    return elem;
   }
}
export default Expensetracker