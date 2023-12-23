import React from 'react'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import Product from './Product';

export default function Router() {
    let navigate = useNavigate();
    const sendDataToProduct = (e) => {
        navigate(`/product/${e.target.value}`)
    }
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <NavLink to="/contact" style={({ isActive }) => {
                        return {
                            color: isActive ? "red" : ""
                        };
                    }}>Contact</NavLink>
                </li>
            </ul>

            <Routes>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path='*' element={<h3>Not found</h3>}></Route>
            </Routes>

            <div>
                <h2>Select a Category:</h2>
                <select defaultValue="default" onChange={e => sendDataToProduct(e)}>
                    <option value="default" disabled hidden>
                        Choose your car
                    </option>
                    <option value="1">Honda</option>
                    <option value="2">Suzuki</option>
                    <option value="3">Yamaha</option>
                </select>
            </div>

            <Routes>
                <Route path='/product/:id' element={<Product />} />
                <Route path='*' element={<h3>Not found</h3>}></Route>
            </Routes>
        </div>
    )
}
