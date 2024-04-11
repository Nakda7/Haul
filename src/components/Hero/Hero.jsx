import './Hero.css'
import { useState, useEffect } from 'react';

const frases = ["regresar vacío", "no encontrar carga", "pagos retrasados"];

const Hero = () => {

  const [indice, setIndice] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false); // Nuevo estado para controlar la animación

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((indiceActual) => (indiceActual + 1) % frases.length);
      setShouldAnimate(true);
      setTimeout(() => {
        setShouldAnimate(false);
      }, 1000);
    }, 2500);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div>
        <div className="w-full relative">
            <div className="w-full min-w-lg flex pl-32">    
                <div className='pt-10 flex flex-col mt-20'>
                    <h1 className="text-[4rem] font-semibold animated fadeInDown">Con Haul te<span className='text-indigo-500'> olvidas </span> de</h1>
                    <h1 className={`text-[4rem] text-gray-500 font-semibold animated ${shouldAnimate ? 'fadeInDown' : ''} mt-[-1rem]`}>
                      {frases[indice]}
                      <span className='text-indigo-500' >.</span>
                    </h1>
                    <p className='font-merriweather text-2xl mt-8 text-gray-600 ml' >Con Haul encuentra y agenda viajes  en línea!</p> 
                </div>
    
                <img className="absolute top-[5rem] left-[57rem] w-[32rem]" src="/src/assets/teslahero.png" />
                <div className="glow absolute translate-x-[70rem] translate-y-[20rem] -z-10"></div>
            </div>
            <section id='carga' className='pl-32 flex mt-[15rem] gap-24'>
              <img src="src/assets/carga.png" className="w-[35rem]" alt="" />
              <h1 className="text-[4rem] text-inter font-semibold">Encuentra transporte para tus cargas</h1>
            </section>

        </div>
    </div>
  )
}

export default Hero
