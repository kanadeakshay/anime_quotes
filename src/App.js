import React from 'react';

// Pages
import Home from './components/Home';
import About from './components/About';
import Error from './components/Error';
import NotFound from './components/Not_Found';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/error" element={<Error/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;