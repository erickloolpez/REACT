const Layout = ({children})=>{
    return(
        <div className='lg:w-full xl:w-11/12 2xl:w-4/5 grid h-screen grid-cols-stats-rem grid-rows-1 '>
            {children}
        </div>

    )
}

export default Layout