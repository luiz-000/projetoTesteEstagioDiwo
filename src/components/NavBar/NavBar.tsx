import style from './NavBar.module.css'


function NavBar () {

    return (
        <div className={style.containerNavBar}>
            <img src='/logoNavBar.png' alt='Logo da empresa'></img>
        </div>
    )
}

export default NavBar
