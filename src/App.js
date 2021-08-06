import React from 'react';

// Pages
import Home from './components/Home';
import About from './components/About';
import Error from './components/Error';
import NotFound from './components/Not_Found';
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
                    <NotFound/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;