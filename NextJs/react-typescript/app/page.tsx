'use client'
import { useState } from 'react'
import { RandomFox } from "./Components/RandomFox";
import type { MouseEventHandler } from 'react';
import {random} from 'lodash'

const myRandom = () => random(1,123)
const generateID = () => Math.random().toString(36).substr(2, 9)

export default function Home() {
  const [images, setImages] = useState<Array<IFoxImageItem>>([])

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    const newImageItem: IFoxImageItem = { id: generateID(), url: `https://randomfox.ca/images/${myRandom()}.jpg` }

    setImages([
      ...images,
      newImageItem
    ])
  }

  return (
    <div className='grid place-items-center w-screen h-screen'>
      <div>
        <h1>Beauty Fox</h1>
        <button onClick={addNewFox}>Add Fox</button>
        {
          images.map(({ id, url }, index) => (
            <RandomFox key={id} image={url} width={320} height='auto' className='bg-gray-300' onClick={() => console.log('hey')} onLazyLoad={(img) => {
              console.log(`Image #${index + 1} cargada. Nodo:`, img)
            }} />
          ))
        }
      </div>
    </div>
  );
}
