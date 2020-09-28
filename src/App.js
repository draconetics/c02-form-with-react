import React from 'react';
import './App.css';
import FormCode from './components/FormCode';
import SimpleForm from './components/SimpleForm';
import Menu from './components/Menu';

import { Switch, Route, BrowserRouter} from 'react-router-dom';

function App() {

  const submit = (values) => {
    alert("submitted");
    console.log(values);
  }
  return (
    <BrowserRouter>
    <div className="App">
        <Menu></Menu>
        <Switch>
          <Route exact path="/">
              <FormCode onSubmit={submit} />
          </Route>
          <Route path="/simple-form">
              <SimpleForm/>    
          </Route>
        
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
