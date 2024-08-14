import line from '../../assets/img/rayas.png'
import checkSVG from '../../assets/svg/check.svg'

const HomePlans = () => {
    return (
        <div className='lg:w-full xl:w-11/12 2xl:w-4/5 mt-24 flex flex-col items-center mb-20'>
            <div className="flex flex-col items-center mb-4 ">
                <h1 className='text-5xl font-Rubik m-1 text-head-color'>Choose Your Plan</h1>
                <img src={`${line}`} alt="line" className='w-20 h-4 object-contain' />
            </div>
            <div className=" w-64 flex justify-around items-center gap-1 mb-4">
                <p className='font-Roboto text-slate-400'>MONTHLY</p>
                <input type="checkbox" id='checkButton' className='peer hidden' />
                <label htmlFor="checkButton" id='buttonSwitch' className="w-16 h-8 bg-palette rounded-full cursor-pointer relative before:absolute before:m-1 before:content-[''] before:bg-white before:w-6 before:h-6 before:rounded-full before:peer-checked:right-1 before:transition-all before:duration-500 transition-all duration-500"></label>
                <p className='font-Roboto text-slate-400'>ANUALLY</p>
            </div>
            <div className='w-full flex justify-around'>
                <div className='w-64 h-home-plan flex flex-col items-center px-8 border-2 border-dashed border-slate-400'>
                    <h2 className='text-title-color text-3xl font-Rubik'>Starter</h2>
                    <h1 className='text-bold text-6xl m-0 font-Rubik'>$9</h1>
                    <h3 className='font-Rubik text-subtitle-color'>Per Month</h3>
                    <p className='border-b border-t-0 border-r-0 border-l-0 border-solid border-slate-300 font-Roboto text-center pb-4'>Este plan sedienta esta hecho para personas que tienen una necesidad de comprar awa</p>
                    <ul className='list-none m-0 p-0'>
                        <li className='flex items-center '>
                            <img src={`${checkSVG}`} alt="checkIcon" className='w-4 h-4 mr-2' />
                            <p className='font-Roboto'>Pack of five bottles</p>
                        </li>
                        <li className='flex items-center '>
                            <img src={`${checkSVG}`} alt="checkIcon" className='w-4 h-4 mr-2' />
                            <p className='font-Roboto'>Pack of five bottles</p>
                        </li>
                        <li className='flex items-center '>
                            <img src={`${checkSVG}`} alt="checkIcon" className='w-4 h-4 mr-2' />
                            <p className='font-Roboto'>Pack of five bottles</p>
                        </li>
                    </ul>
                    <button className='bg-palette border-none w-32 h-12 text-white text-bold text-md font-Rubik rounded-md mt-6'>GETS STARTED</button>
                    <a href="#" className='text-subtitle-color font-Roboto no-underline mt-4'>*Free Trial 14 Days</a>
                </div>
                <div className='w-64 h-home-plan flex flex-col items-center px-8 border-2 border-dashed border-slate-400'>
                    <h2 className='text-title-color text-3xl font-Rubik'>Starter</h2>
                    <h1 className='text-bold text-6xl m-0 font-Rubik'>$9</h1>
                    <h3 className='font-Rubik text-subtitle-color'>Per Month</h3>
                    <p className='border-b border-t-0 border-r-0 border-l-0 border-solid border-slate-300 font-Roboto text-center pb-4'>Este plan sedienta esta hecho para personas que tienen una necesidad de comprar awa</p>
                    <ul className='list-none m-0 p-0'>
                        <li className='flex items-center '>
                            <img src={`${checkSVG}`} alt="checkIcon" className='w-4 h-4 mr-2' />
                            <p className='font-Roboto'>Pack of five bottles</p>
                        </li>
                        <li className='flex items-center '>
                            <img src={`${checkSVG}`} alt="checkIcon" className='w-4 h-4 mr-2' />
                            <p className='font-Roboto'>Pack of five bottles</p>
                        </li>
                        <li className='flex items-center '>
                            <img src={`${checkSVG}`} alt="checkIcon" className='w-4 h-4 mr-2' />
                            <p className='font-Roboto'>Pack of five bottles</p>
                        </li>
                    </ul>
                    <button className='bg-palette border-none w-32 h-12 text-white text-bold text-md font-Rubik rounded-md mt-6'>GETS STARTED</button>
                    <a href="#" className='text-subtitle-color font-Roboto no-underline mt-4'>*Free Trial 14 Days</a>
                </div>
                <div className='w-64 h-home-plan flex flex-col items-center px-8 border-2 border-dashed border-slate-400'>
                    <h2 className='text-title-color text-3xl font-Rubik'>Starter</h2>
                    <h1 className='text-bold text-6xl m-0 font-Rubik'>$9</h1>
                    <h3 className='font-Rubik text-subtitle-color'>Per Month</h3>
                    <p className='border-b border-t-0 border-r-0 border-l-0 border-solid border-slate-300 font-Roboto text-center pb-4'>Este plan sedienta esta hecho para personas que tienen una necesidad de comprar awa</p>
                    <ul className='list-none m-0 p-0'>
                        <li className='flex items-center '>
                            <img src={`${checkSVG}`} alt="checkIcon" className='w-4 h-4 mr-2' />
                            <p className='font-Roboto'>Pack of five bottles</p>
                        </li>
                        <li className='flex items-center '>
                            <img src={`${checkSVG}`} alt="checkIcon" className='w-4 h-4 mr-2' />
                            <p className='font-Roboto'>Pack of five bottles</p>
                        </li>
                        <li className='flex items-center '>
                            <img src={`${checkSVG}`} alt="checkIcon" className='w-4 h-4 mr-2' />
                            <p className='font-Roboto'>Pack of five bottles</p>
                        </li>
                    </ul>
                    <button className='bg-palette border-none w-32 h-12 text-white text-bold text-md font-Rubik rounded-md mt-6'>GETS STARTED</button>
                    <a href="#" className='text-subtitle-color font-Roboto no-underline mt-4'>*Free Trial 14 Days</a>
                </div>

            </div>
        </div>

    )
}

export default HomePlans