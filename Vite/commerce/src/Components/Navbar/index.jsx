import {NavLink} from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'

const Navbar = () => {
    const activeStyle = 'underline underline-offset-4'
    return(
        <nav className ='w-full h-20 font-quicksand'>
            <ul className = 'w-full h-full flex justify-around items-center'>
                <li className ='w-28 h-full'>
                    <img className ='w-full h-full object-cover' src="https://i.pinimg.com/736x/b9/46/bf/b946bfda1684e33d35517d77e931b050.jpg" alt="Vans" />
                </li>
                <li>
                    <NavLink 
                    className ={({isActive})=> isActive ? activeStyle : ''}
                    to='/Main'>
                        Main
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    className ={({isActive})=> isActive ? activeStyle : ''}
                    to='/Products'>
                        Products
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    className ={({isActive})=> isActive ? activeStyle : ''}
                    to='/About'>
                        About Us
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    className ={({isActive})=> isActive ? activeStyle : ''}
                    to='/Account'>
                        Log In
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/Cart'>
                        <ShoppingBagIcon className ='w-6 h-6'/>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
} 

export default Navbar