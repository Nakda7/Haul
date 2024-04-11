import { Header } from "../components/Header/Header"
import './Home.css'
import Hero from './../components/Hero/Hero';

export function Home() {
    
    return<div className="w-full min-h-screen relative">
        <div className="hero absolute min-h-[200rem] w-full opacity-100 -z-20 "></div>
        <Header/>
        <Hero />
       
        
    </div>
}