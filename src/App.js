import React from 'react';

// Pages
import Home from './components/Home';
import About from './components/About';
import Error from './components/Error';
import Not_Found from './components/Not_Found';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App(){
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/about">
                    <About/>
                </Route>
                <Route path="/error">
                    <Error/>
                </Route>
                <Route path="*">
                    <Not_Found/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;