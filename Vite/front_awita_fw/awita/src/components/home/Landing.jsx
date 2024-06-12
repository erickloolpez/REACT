
import botellon from '../../assets/img/bottellon.png'
const Landing = () => {
    return (
        <div className='lg:w-full xl:w-11/12 2xl:w-4/5 grid grid-cols-2 place-items-center z-10'>
            <div >
                <div className='sm:w-3/4 lg:w-2/3 xl:w-3/4 2xl:w-3/5 h-12 bg-palette flex justify-center items-center rounded-md'>
                    <h2 className='text-white font-Rubik text-xlg text-bold'>WATER IS NOTHING BUT LIFE</h2>
                </div>
                <div className='xl:w-3/4'>
                    <h1 className='text-white font-Rubik text-6xl'>Mineral Water With Great Taste</h1>
                </div>
                <div className='xl:w-10/12'>
                    <p className='text-white leading-normal font-Roboto text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis dolorem ab quibusdam architecto vel harum asperiores ut molestiae, sapiente repellendus iste alias nam beatae deserunt commodi! Atque ex alias autem.</p>
                </div>
                <button className='w-32 h-12 bg-palette text-white border-none rounded-md font-Roboto text-base cursor-pointer'>READ MORE</button>
            </div>
            <div className='w-full h-full flex items-end justify-end'>
                <img src={`${botellon}`} alt="botellon" className='w-full h-5/6 object-contain' />
            </div>
        </div>
    )
}

export default Landing