import logo from '../../assets/img/logo.png'
import facebook from '../../assets/svg/facebook_blue.svg'
import twitter from '../../assets/svg/x-twitter_blue.svg'
import instagram from '../../assets/svg/instagram_blue.svg'

const Footer = ()=>{
    return(
        <footer className='w-full h-96 mt-8 grid grid-cols-2 bg-footer-bg place-items-center'>
            <div className='w-2/3 h-3/4 flex flex-col '>
                <img src={`${logo}`} alt="logo" className='w-32 h-10 mb-4' />
                <p className='font-Roboto mb-8 text-white'>A través de esta plataforma, los usuarios pueden consumir contenido en el feed, chatear con amigos en Messenger, crear páginas del perfil personales y de empresa, compartir fotos y videos, y unirse a grupos.</p>
                <div className='flex'>
                    <img src={`${facebook}`} alt="facebookIcon" className='w-4 h-4 p-2 rounded-md bg-blue-900 text-white mr-3'  />
                    <img src={`${instagram}`} alt="instagramIcon" className='w-4 h-4 p-2 rounded-md bg-blue-900 text-white mr-3'  />
                    <img src={`${twitter}`} alt="twitterIcon" className='w-4 h-4 p-2 rounded-md bg-blue-900 text-white mr-3'  />

                </div>
            </div>

        </footer>

    )
}

export default Footer