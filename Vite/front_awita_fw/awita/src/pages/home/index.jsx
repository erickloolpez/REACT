import botellon from '../../assets/img/bottellon.png'

const Home = () =>{
    return(
        <div className='xl:w-11/12 2xl:w-3/4 grid grid-cols-2 place-items-center '>
            <div >
                <div className='xl:w-2/3 h-12 bg-palette flex justify-center items-center rounded-md'>
                    <h2 className='text-white font-Rubik text-xlg text-bold'>WATER IS NOTHING BUT LIFE</h2>
                </div>
                <div>
                    <h1 className='text-white font-Rubik text-6xl'>Mineral Water With Great Taste</h1>
                </div>
                <div>
                    <p className='text-white leading-normal font-Roboto text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis dolorem ab quibusdam architecto vel harum asperiores ut molestiae, sapiente repellendus iste alias nam beatae deserunt commodi! Atque ex alias autem.</p>
                </div>
                <button className='w-32 h-12 bg-palette text-white border-none rounded-md font-Roboto text-base cursor-pointer'>READ MORE</button>
            </div>
            <div className='w-full h-full flex justify-end'>
                <img src={`${botellon}`} alt="botellon" className='w-full h-full object-contain' />
            </div>
        </div>
    )
}

export default Home