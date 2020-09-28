import React, {useState} from 'react'
var FA = require('react-fontawesome')

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

    const validateName = (first_name)=>{
        if (firstName.touched && first_name.length <= 3)
            return "First Name should be > 3 characters";
        else if (firstName.touched && first_name.length > 10)
            return "First Name should be <= 10 characters";
        return "";
    }

    const validateLastName = (last_name)=>{
        if (lastName.touched && last_name.length < 3)
            return 'Last Name should be >= 3 characters';
        else if (lastName.touched && last_name.length > 10)
            return 'Last Name should be <= 10 characters';

        return "";
    }

    const validateEmail = (_email) =>{
        if (email.touched && !_email.includes("@")){
            return 'Email should contain a @';
        }
        return "";
    }

    const handleOnChange = (e) =>{
        let error = "";
        console.log(e.target.value, e.target.value.length)
        const inputName = e.target.name;
        const inputValue = e.target.value;
        switch(inputName){
            case "firstName":
                error = validateName(inputValue);
                setFirstName({...firstName, value:inputValue, error })
                break;
            case "lastName":
                error = validateLastName(inputValue);
                setLastName({...lastName, value:inputValue, error})
                break;
            case "email":
                error = validateEmail(inputValue);
                setEmail({...email, value:inputValue, error})
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

    const getMessage = (inputName) =>{
        if(inputName.touched && inputName.error != null && inputName.error.length > 0)
            return (<span className="text-danger">{inputName.error}</span>);
        if(inputName.touched && inputName.error === ''){
            console.log("correct!")
            return (<span className="text-success">{"Correct!"}
                        <FA className="thumbs-up-icon" name="thumbs-up" />
                    </span>);
        }
            
        return "*";
    }

    return (
        <div>
            <form className="form-container">
                <h3 >Simple Form Validation</h3>
                <div className="form-group">
                    <label>First Name({getMessage(firstName)})</label>
                    
                    <input 
                            className="form-control"
                            type="text" 
                            name="firstName" 
                            value={firstName.value} 
                            onChange={(e)=>handleOnChange(e) }
                            placeholder="First Name"
                            onBlur={(e)=>onBlur(e)}>
                    </input>
                   

                </div>
                <div className="form-group">
                    <label>Last Name({getMessage(lastName)})</label>
                    <input 
                            className="form-control"
                            type="text" 
                            name="lastName" 
                            value={lastName.value} 
                            onChange={(e)=>handleOnChange(e)}
                            placeholder="Last Name"
                            onBlur={(e)=>onBlur(e)}>
                    </input>
                    <span>{lastName.error}</span>
                </div>
                <div className="form-group">
                    <label>Email({getMessage(email)})</label>
                    <input 
                            className="form-control"
                            type="text" 
                            name="email" 
                            value={email.value} 
                            onChange={(e)=>handleOnChange(e)}
                            placeholder="Email"
                            onBlur={(e)=>onBlur(e)}>
                    </input>
                    <span>{email.error}</span>
                </div>
                <div className="form-group">
                    <button type="button" className={"btn btn--primary "+verifyForm()}>Submit</button>
                    <button type="button" className="btn btn--secondary" onClick={()=>reset()}>Reset</button>
                </div>
                
            </form>
        </div>
    );
}

export default SimpleForm;