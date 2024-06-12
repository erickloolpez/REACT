import { NavLink } from "react-router-dom";
import logo from '../../assets/img/logo.png'
import menu from '../../assets/svg/menu.svg'

const Navbar = () => {
    const activeStyle = 'underline underline-offset-4 text-white font-Rubik font-bold'
    return (
        <nav className='sm:w-full lg:w-full xl:w-11/12 2xl:w-4/5 h-1/8 flex items-center border-b border-l-0 border-r-0  border-t-0 border-white border-dashed z-10 '>
            <ul className='w-full h-full flex justify-between items-center'>
                <li className='w-32 h-full list-none'>
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
                <li className='w-9 h-9 flex justify-center items-center rounded-3xl list-none cursor-pointer outline outline-white mr-2 '>
                    <NavLink to='/stats'>
                        <img src={`${menu}`} alt="" className='w-7 h-7' />
                    </NavLink>
                </li>

            </ul>
        </nav>

    )
}

export default Navbar