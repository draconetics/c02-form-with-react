import React, {useState} from 'react'

let SimpleForm = ()=>{

    const inputInit = {value:"",touched:false,error:null};
    const [firstName, setFirstName] = useState(inputInit);
    const [lastName, setLastName] = useState(inputInit);
    const [email, setEmail] = useState(inputInit);

    const reset = ()=>{
        setFirstName(inputInit);
        setLastName(inputInit);
        setEmail(inputInit);
    }

    const validateName = ()=>{
        if (firstName.touched && firstName.value.length < 3)
            return "First Name should be >= 3 characters";
        else if (firstName.touched && firstName.value.length > 10)
            return "First Name should be <= 10 characters";
        return "";
    }

    const validateLastName = ()=>{
        if (lastName.touched && lastName.value.length < 3)
            return 'Last Name should be >= 3 characters';
        else if (lastName.touched && lastName.value.length > 10)
            return 'Last Name should be <= 10 characters';

        return "";
    }

    const validateEmail = () =>{
        if (email.touched && email.value.split('').filter(x => x === '@').length !== 1)
            return 'Email should contain a @';
        return "";
    }

    const handleOnChange = (e) =>{
        let error = "";
        switch(e.target.name){
            case "firstName":
                error = validateName();
                setFirstName({...firstName, value:e.target.value, error })
                break;
            case "lastName":
                error = validateLastName();
                setLastName({...lastName, value:e.target.value, error})
                break;
            case "email":
                error = validateEmail();
                setEmail({...email, value:e.target.value, error})
                break;
            default:
        }
    }

    const onBlur = (e)=>{
        switch(e.target.name){
            case "firstName":
                setFirstName({...firstName, touched:true})
                break;
            case "lastName":
                setLastName({...lastName, touched: true})
                break;
            case "email":
                setEmail({...email, touched:true})
                break;
            default:
        }
    }

    const verifyForm = () =>{
        return (firstName.error === '' && lastName.error === '' && email.error === '')?"":"disabled"
    }

    return (
        <div>

            <form>
                <div>
                    <label>First Name</label>
                    
                    <input 
                            type="text" 
                            name="firstName" 
                            value={firstName.value} 
                            onChange={(e)=>handleOnChange(e) }
                            placeholder="First Name"
                            onBlur={(e)=>onBlur(e)}>
                    </input>
                   <span>{firstName.error}</span>

                </div>
                <div>
                    <label>Last Name</label>
                    <input 
                            type="text" 
                            name="lastName" 
                            value={lastName.value} 
                            onChange={(e)=>handleOnChange(e)}
                            placeholder="Last Name"
                            onBlur={(e)=>onBlur(e)}>
                    </input>
                    <span>{lastName.error}</span>
                </div>
                <div>
                    <label>Email</label>
                    <input 
                            type="text" 
                            name="email" 
                            value={email.value} 
                            onChange={(e)=>handleOnChange(e)}
                            placeholder="Email"
                            onBlur={(e)=>onBlur(e)}>
                    </input>
                    <span>{email.error}</span>
                </div>
                <button type="button" disabled={verifyForm()}>Submit</button>
                <button type="button" onClick={()=>reset()}>Reset</button>
            </form>
        </div>
    );
}

export default SimpleForm;