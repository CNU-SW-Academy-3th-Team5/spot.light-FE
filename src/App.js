import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import { Information } from './Component/Map/Information';
import { LogIn } from './View/LogIn/LogIn';
import { SignUp } from './View/SignUp/SignUp'; 
import { ImageDetail } from './Component/Board/ImageDetail';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to='/login' />} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/home' element={<Information />} />
                <Route path='/image' element={<ImageDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;