import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './views/login/Login';
import Layout from './views/layout/index';
import Public from './views/public/index';
import Home from './views/home/index';
import Score from './views/score/index';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/layout' element={<Layout />}>
            <Route path='' element={<Home />}></Route>
            <Route path='public' element={<Public />}></Route>
            <Route path='score' element={<Score />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
