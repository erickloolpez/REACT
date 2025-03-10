import './styles.css'
const Layout  = ({children})=>{
    return(
        <div className =' layoutCSS  grid grid-cols-3 grid-row-1 justify-items-end'>
            {children}
        </div>

    )
}

export default Layout