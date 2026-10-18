import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useEffect } from "react"

export default function Navbar(){
    const {user,logout} = useAuth()
    const nav = useNavigate()
    const klik = (e)=>{
        logout()
        nav('/login')
    }
    useEffect(()=>{
        if(!user) return nav('/login')
    })
return(
<>
    <nav class="navbar">
        <a href="/pages" class="navbar__brand">
            WelBuilder
        </a>
        <div class="navbar__actions">
            <button class="navbar__menu-toggle" type="button" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <button class="btn btn--ghost btn--sm" type="button">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6.5" cy="4.5" r="2.5" stroke="currentColor" stroke-width="1.5" />
                    <path d="M1 12c0-2.485 2.462-4.5 5.5-4.5S12 9.515 12 12" stroke="currentColor" stroke-width="1.5"
                        stroke-linecap="square" />
                </svg>
                {user?.name}
            </button>
            <button onClick={klik} class="btn btn--ghost btn--sm" type="button">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 1h3v1.5L9.5 4h2V11H1.5V4h2L5 2.5V1z" stroke="currentColor" stroke-width="1.5"
                        stroke-linejoin="round" />
                    <path d="M9 7.5L7 9.5l-2-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"
                        stroke-linejoin="round" />
                </svg>
                Logout
            </button>
        </div>
    </nav>
</>
)
}
