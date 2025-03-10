import { useRef, useEffect, useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

type LazyImageProps = { image: string, onLazyLoad?: (img: HTMLElement) => void }//Nuevo
type ImageNative = ImgHTMLAttributes<HTMLImageElement>
type Props = LazyImageProps & ImageNative//Separacion de Responsabilidades

//Main Component
export const RandomFox = ({ image, onLazyLoad, ...imgProps }: Props): JSX.Element => {
    const node = useRef<HTMLImageElement>(null)
    const [src, setSrc] = useState('"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="')//Nuevo

    useEffect(() => {
        //Nuevo observador
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting || !node.current) {//Nuevo
                    return
                }
                setSrc(image)

                if(typeof onLazyLoad === 'function'){
                    onLazyLoad(node.current)
                }
            })
        })

        //Observe Node
        if (node.current) {
            observer.observe(node.current)
        }

        //desconectar
        return () => {
            observer.disconnect()
        }

    }, [image, onLazyLoad])
    return (
        <img ref={node} src={src} {...imgProps} />
    )
}