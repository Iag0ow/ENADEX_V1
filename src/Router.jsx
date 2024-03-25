import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Register } from './pages/Register'


export function Router(){
 return (
    <BrowserRouter>
       <Routes>
         {/* Adicione qualquer rota ex:<Route path="/" element={<TelaLogin />}/> */}
         <Route path="/register" element={<Register />} />
       </Routes>
    </BrowserRouter>
 )
}