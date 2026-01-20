import RotatingText from './RotatingText'
import FaultyTerminal from './FaultyTerminal';
import SocialButton from './SocialButton';
import './Hero.css';
import heroData from '../data/hero.json';
import SocialMediaData from '../data/socialMedia.json';
import { useMemo, useState, useEffect } from 'react';

export default function Hero() {
    const terminalGridMul = useMemo(() => [2, 1], []);
    const [isPaused, setIsPaused] = useState(true);

    useEffect(() => {
        const handleSplashComplete = () => setIsPaused(false);
        window.addEventListener('splash-complete', handleSplashComplete);
        
        // Safety timeout in case event is missed or splash is disabled
        const timer = setTimeout(() => setIsPaused(false), 3000);

        return () => {
             window.removeEventListener('splash-complete', handleSplashComplete);
             clearTimeout(timer);
        }
    }, []);

    return (
        <section id="hero" className="h-screen flex items-center bg-black justify-center relative">
          <div class="absolute inset-0 terminal-mask">
          <FaultyTerminal
          scale={1.5}
          gridMul={terminalGridMul}
          digitSize={1.2}
          timeScale={0.5}
          pause={isPaused}
          scanlineIntensity={0.5}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.1}
          tint="#7f5af0"
          mouseReact
          mouseStrength={0.5}
          pageLoadAnimation
          brightness={0.6}
          className='bg-black'
        />
        </div>
          <div className="absolute text-center text-heading cursor-default">
            <span className='text-sm md:text-2xl max-w-screen'>{heroData.heroIntroduce}</span>
                <h1 className="text-heading text-3xl md:text-8xl hero-heading">
                  {heroData.heroName}
                </h1>
                <div className='flex items-center justify-center'>
                <h2 className='text-md md:text-3xl text-heading gap-3'>
                  {heroData.heroDesc.desc}
                </h2>
                <RotatingText
                texts={heroData.heroDesc.role}
                mainClassName="mx-3 px-2 sm:px-2 md:px-3 bg-primary text-heading overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg text-md md:text-3xl"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
                </div>
              <div className='cursor-auto mt-10 gap-3 text-sm md:text-2xl '>
                {SocialMediaData.map((social) => (
                  <SocialButton key={social.id} icon={social.icon} link={social.href} />
                ))}
              </div>
          </div>
        </section>
    );
}
