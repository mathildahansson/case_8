import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from '/pages/Home';
import Login from '/pages/Login';


function Header() {
    return (
        <header>
            <h1>Goldies Cinema</h1>
            <hr />
            <p id='head-description'>Välkommen till nostalgiernas biograf!</p>
            <hr />

            {/* hanterar olika sidor - pages */}
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                </Routes>

                {/* navigering */}
                <nav>
                    <ul>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/login'>Login</NavLink></li>

                    </ul>
                </nav>
            </BrowserRouter>

        </header>
    )
}

export default Header;