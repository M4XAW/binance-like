import './App.css'
import { Routes, Route } from 'react-router-dom'

import PageLayout from './layout/PageLayout'
import Home from './pages/home/Home'
import NotFound from './pages/notFound/NotFound'

export default function App() {
    return (
        <>
            <Routes>
                <Route element={<PageLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )
}