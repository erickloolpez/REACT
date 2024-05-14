const Layout = ({children})=>{
    return(
        <div className="w-full h-home-height grid grid-cols-1 grid-rows-home-grid justify-items-center bg-home-bg bg-no-repeat bg-center bg-cover">
            {children}
        </div>
    )
}

export default Layout