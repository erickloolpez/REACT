import { NavLink } from "react-router-dom";
import logo from '../../assets/img/logo.png'
import menu from '../../assets/svg/menu.svg'

const Navbar = () => {
    const activeStyle = 'underline underline-offset-4 text-white font-Rubik font-bold'
    return (
            <nav className='xl:w-full 2xl:w-3/4 h-full flex items-center border-b  border-t-0 border-white border-dashed'>
                <ul className='w-11/12 h-full flex justify-between items-center'>
                    <li className='w-36 h-full list-none'>
                        <img src={`${logo}`} alt="awita_logo" className='w-full h-full object-contain' />
                    </li>
                    <li className='list-none'>
                        <NavLink
                            className={({ isActive }) => isActive ? activeStyle : ''} 
                            to='/Home'
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className='text-white font-Rubik text-md font-bold'>
                        About Us
                    </li>
                    <li className='text-white font-Rubik text-md font-bold'>
                        Gallery
                    </li>
                    <li className='text-white font-Rubik text-md font-bold'>
                        Pages
                    </li>
                    <li className='text-white font-Rubik text-md font-bold'>
                        Services
                    </li>
                    <li className='text-white font-Rubik text-md font-bold'>
                        Blog
                    </li>
                    <li className='text-white font-Rubik text-md font-bold'>
                        Contact Us
                    </li>
                    <li className='w-12 h-12 flex justify-center items-center rounded-3xl list-none cursor-pointer outline outline-white '>
                        <img src={`${menu}`} alt="" className='w-7 h-7' />
                    </li>

                </ul>
            </nav>

    )
}

export default Navbar