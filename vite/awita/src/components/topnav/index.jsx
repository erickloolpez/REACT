import mail from '../../assets/svg/mail.svg'
import location from '../../assets/svg/location.svg'
import instagram from '../../assets/svg/instagram.svg'
import facebook from '../../assets/svg/facebook.svg'
import x from '../../assets/svg/x-twitter.svg'

const TopNav = () => {
    return(
        <div className='sm:w-full lg:w-full xl:w-11/12 2xl:w-4/5 h-16 flex items-center justify-between'>
            <div className='h-full flex items-center  '>
                <div className='w-7 h-7 flex justify-center items-center bg-palette rounded-3xl mr-2'>
                    <img src={`${mail}`} alt="mail-svg" className=' w-4 h-4' />
                </div>
                <p className='text-gray-400 after:content-["|"] after:ml-6 after:mr-6 text-sm font-Roboto'>awita@gmail.com</p>
                <div className='w-7 h-7 flex justify-center items-center bg-palette rounded-3xl ml-2 mr-2'>
                    <img src={`${location}`} alt="location_svg" className ='w-4 h-4 ' />
                </div>
                <p className='text-gray-400 font-Roboto text-sm'>Ave 12 de Octubre 1076, Quito 170143</p>
            </div>
            <div className ='flex items-center h-full'>
                <img src={`${facebook}`} alt="facebook_svg" className ='w-4 h-4' />
                <img src={`${instagram}`} alt="facebook_svg" className ='w-4 h-4 ml-4' />
                <img src={`${x}`} alt="facebook_svg" className ='w-4 h-4 ml-4 mr-4' />
                <button className='w-36  h-full bg-palette text-white  border-0 text-base'>Appointment</button>

            </div>
        </div>
    )
}

export default TopNav