"use client"

import styles from "./Description.module.sass"
import Image from 'next/image'
import bg from '../../../../public/images/description.jpeg'
import { useState } from "react"
import classNames from "classnames/bind"

const PLACE_HOLDER_IMAGE = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCABqAGoDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAQIDAAX/xAAXEAEBAQEAAAAAAAAAAAAAAAAAAQIR/8QAFwEBAQEBAAAAAAAAAAAAAAAAAgEAA//EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A5gCxIAsxCMNAho1YYYJDSBSAKfgWIqdLVLCUolJQGgYn4HD8Djm6FYWODgw8hYpmMgyGkaQ8g1S8LYrwtgslYnVtRLUKMnQGgSKhTBXOOhWEDiGimYSKZUT5h5AyeDUDgWHLUZLUS0tpHSxkqU2iqqwVgrmYMzHGPlTKWVcqNVypEs1SIJi0elqMTSOldI6ZktFNopKp0LS9DoFo9bpej0lUlUzUZVM1UXzTyo5p5RRTpbQ6W1hDVS1T6qWqzE0UaUlbrdL0Otiabo9J0escUlPmoynlRV5TSoynlFFOhaTrWsLaqeqNpLSiBQagrJ9brMowWAYjpDQ8JDQaZ5TSkhoiG6FrNWGhSU1LSg0tZgJH/9k='

export const Description = () => {
  const [hasBorder, setBorder] = useState(false)

  const handleClick = () => setBorder(!hasBorder)

  const cx = classNames.bind(styles)
  const buttonStyles = cx('Description__button', {
    'Description__button--border': hasBorder
  })

  return (
    <section className={styles.Description}>
      <button onClick={handleClick} className={buttonStyles}>
        <div className={styles.Description__imageContainer}>
          <Image
            src={bg}
            alt="products MarketPlace"
            fill
            placeholder="blur"
            blurDataURL={PLACE_HOLDER_IMAGE}
          />
        </div>
      </button>
      <div>
        <h2>Bring the future today</h2>
        <p>Future World: Your Gateway to Tomorrow's Tech! Dive into a world of cutting-edge gadgets and gear. Stay ahaead of the curve and redefine your degital lifestyle with us.</p>
      </div>
    </section>
  )
}