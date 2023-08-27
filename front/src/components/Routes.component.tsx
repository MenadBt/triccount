import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainForm from './forms/MainForm.component';

class MainRoutes extends React.Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<MainForm/>}/>
                    <Route path="*" element={<h1>404 Not Found</h1>}/>
                </Routes>
            </Router>
        );
    }
}

export default MainRoutes;

