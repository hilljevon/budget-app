'use client'
import { useRef, useState } from 'react'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import { CheckIcon } from '@heroicons/react/24/solid'
import ParallaxPage1Form from '../forms/parallax/ParallaxPage1Form'
import ParallaxPage2Form from '../forms/parallax/ParallaxPage2Form'
import Image from 'next/image'
import { motion, AnimatePresence } from "framer-motion"
import ParallaxPage3Form from '../forms/parallax/ParallaxPage3Form'
import ParallaxPage4Form from '../forms/parallax/ParallaxPage4Form'
import ParallaxPage5Form from '../forms/parallax/ParallaxPage5Form'

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}
const OnboardingPage = ({ clerkId, username }: { clerkId: string, username: string }) => {
    const parallax = useRef<IParallax>(null!)
    const [steps, setSteps] = useState([
        { name: 'Step 1', href: '#', status: 'current' },
        { name: 'Step 2', href: '#', status: 'upcoming' },
        { name: 'Step 3', href: '#', status: 'upcoming' },
        { name: 'Step 4', href: '#', status: 'upcoming' },
        { name: 'Step 5', href: '#', status: 'upcoming' }
    ])
    return (
        <div className='w-full h-full bg-gray-800'>
            <Parallax ref={parallax} pages={6}>
                {/* background slide 1 */}
                <ParallaxLayer
                    className='bg-green-400'
                    offset={0}
                    speed={1}
                    factor={2}
                // style={{
                //     backgroundImage: `url(https://media1.giphy.com/media/aoZNck1kze91pNwLex/giphy.gif?cid=ecf05e47ds7zw7rehg95ijayemw8ochfqd1s3adityi2qbon&ep=v1_gifs_search&rid=giphy.gif&ct=g)`,
                //     backgroundRepeat: 'repeat'
                // }}
                />
                {/* background slide 2  */}
                <ParallaxLayer
                    className='bg-cover bg-green-300'
                    offset={1}
                    speed={1}
                    factor={3}
                />
                {/* background slide 3 */}
                <ParallaxLayer
                    className='bg-cover bg-green-400'
                    offset={2}
                    speed={2}
                    factor={2}
                />

                {/* background slide 4 */}
                <ParallaxLayer
                    className='bg-cover bg-green-500'
                    offset={3}
                    speed={2}
                    factor={2}
                />
                <ParallaxLayer
                    className='bg-cover bg-green-600'
                    offset={4}
                    speed={2}
                    factor={10}
                />

                <ParallaxLayer
                    offset={1.65}
                    speed={1}
                    className='block ml-[650px] w-1/4'
                >
                    <Image
                        alt='coin'
                        width={72}
                        height={72}
                        src={'/assets/coin1.png'}
                    />
                </ParallaxLayer>

                <ParallaxLayer
                    offset={1.25}
                    speed={1}
                    className='block ml-[650px] bg-transparent'
                >
                    <Image
                        className=''
                        alt='card'
                        width={72}
                        height={72}
                        src={'/assets/card1.png'} />
                </ParallaxLayer>
                {/* CAT LAST SLIDE GIF */}
                <ParallaxLayer
                    offset={2.3}
                    speed={1}
                    className='block ml-[650px] bg-transparent'
                >
                    <Image
                        className=''
                        alt='cat'
                        width={72}
                        height={72}
                        src={'/assets/meowington.gif'} />
                </ParallaxLayer>
                {/* PAGE 1 CONTENT */}
                <ParallaxLayer
                    offset={0}
                    speed={0.1}
                    className='flex justify-center items-center text-green-900'
                >
                    <ParallaxPage1Form parallax={parallax} steps={steps} setSteps={setSteps} />
                </ParallaxLayer>
                {/* PAGE 2 CONTENT */}
                <ParallaxLayer
                    offset={1}
                    speed={0.1}
                    className='flex justify-center items-center text-green-900 font-bold text-xl'
                >
                    <ParallaxPage2Form parallax={parallax} steps={steps} setSteps={setSteps} />
                </ParallaxLayer>
                {/* PAGE 3 CONTENT - BILLS */}
                <ParallaxLayer
                    offset={2}
                    speed={0.1}
                    // onClick={() => parallax.current.scrollTo(0)}
                    className='flex justify-center items-center text-green-900 font-bold text-xl'
                >
                    <ParallaxPage3Form parallax={parallax} steps={steps} setSteps={setSteps} />
                </ParallaxLayer>
                {/* PAGE 4 CONTENT - SUBSCRIPTIONS */}
                <ParallaxLayer
                    offset={3}
                    speed={0.1}
                    // onClick={() => parallax.current.scrollTo(0)}
                    className='flex justify-center items-center text-green-900 font-bold text-xl'
                >
                    <ParallaxPage4Form parallax={parallax} steps={steps} setSteps={setSteps} />
                </ParallaxLayer>
                {/* PAGE 5 CONTENT - OVERVIEW */}
                <ParallaxLayer
                    offset={4}
                    speed={0.1}
                    // onClick={() => parallax.current.scrollTo(0)}
                    className='flex justify-center items-center text-green-900 font-bold text-xl'
                >
                    <ParallaxPage5Form parallax={parallax} steps={steps} setSteps={setSteps} clerkId={clerkId} />
                </ParallaxLayer>
            </Parallax>
        </div>
    )
}

export default OnboardingPage