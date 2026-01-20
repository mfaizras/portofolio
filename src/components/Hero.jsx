import RotatingText from './RotatingText'
import FaultyTerminal from './FaultyTerminal';
import SocialButton from './SocialButton';
import './Hero.css';
import heroData from '../data/hero.json';
import SocialMediaData from '../data/socialMedia.json';

export default function Hero() {
    return (
        <section id="hero" className="h-screen flex items-center bg-black justify-center relative">
          <div class="absolute inset-0 terminal-mask">
          <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.5}
          pause={false}
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
            <span className='text-2xl'>{heroData.heroIntroduce}</span>
                <h1 className="text-heading text-8xl hero-heading">
                  {heroData.heroName}
                </h1>
                <div className='flex items-center justify-center'>
                <h2 className='text-3xl text-heading gap-3'>
                  {heroData.heroDesc.desc}
                </h2>
                <RotatingText
                texts={heroData.heroDesc.role}
                mainClassName="mx-3 px-2 sm:px-2 md:px-3 bg-primary text-heading overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg text-3xl"
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
              <div className='cursor-auto mt-10 gap-3'>
                {SocialMediaData.map((social) => (
                  <SocialButton key={social.id} icon={social.icon} link={social.href} />
                ))}
              </div>
          </div>
        </section>
    );
}
