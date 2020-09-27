import React from 'react';
import logo from './logo.svg';
import './App.css';
import FormCode from './components/FormCode';
import SimpleForm from './components/SimpleForm';

function App() {

  const submit = (values) => {
    alert("submitted");
    console.log(values);
  }
  return (
    <div className="App">
        <h3 className="jumbotron">Redux Form Validation</h3>
        <FormCode onSubmit={submit} />
        <hr></hr>
        <SimpleForm/>
    </div>
  );
}

export default App;
