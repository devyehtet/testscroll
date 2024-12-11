'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './Exhibition.module.css'
import Navigation from './Navigation'

const images = [
  { id: 'welcome', type: 'text', content: 'Welcome To Our Exhibition' },
  { id: '01', type: 'single' },
  { id: '02-03', type: 'double' },
  ...Array.from({ length: 8 }, (_, i) => ({ id: `${i + 4}`.padStart(2, '0'), type: 'single' })),
  { id: '12-13', type: 'double' },
  ...['14', '16', '17', '18', '19', '20', '21'].map(id => ({ id, type: 'single' })),
  { id: '22', type: 'original' },
  { id: '23', type: 'single' }
]

export default function Exhibition() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slideIndex = Number(entry.target.getAttribute('data-index'))
            setCurrentSlide(slideIndex)
          }
        })
      },
      { threshold: 0.5 }
    )

    container.querySelectorAll('section').forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSlide = (index: number) => {
    containerRef.current?.children[index].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div className={styles.exhibitionWrapper}>
      <div ref={containerRef} className={styles.container}>
        {images.map((image, index) => (
          <section
            key={image.id}
            className={`${styles.section} ${image.type === 'original' ? styles.originalSection : ''}`}
            data-index={index}
          >
            {image.type === 'text' ? (
              <h1 className={styles.welcomeText}>{image.content}</h1>
            ) : image.type === 'single' ? (
              <div className={styles.imageWrapper}>
                <Image
                  src={`/webp/${image.id}.webp`}
                  alt={`Exhibition image ${image.id}`}
                  layout="fill"
                  objectFit="cover"
                />
                <div className={styles.imageOverlay} />
              </div>
            ) : image.type === 'double' ? (
              <div className={styles.doubleImageSection}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={`/webp/${image.id.split('-')[0]}.webp`}
                    alt={`Exhibition image ${image.id.split('-')[0]}`}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className={styles.imageOverlay} />
                </div>
                <div className={styles.imageWrapper}>
                  <Image
                    src={`/webp/${image.id.split('-')[1]}.webp`}
                    alt={`Exhibition image ${image.id.split('-')[1]}`}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className={styles.imageOverlay} />
                </div>
              </div>
            ) : (
              <div className={styles.originalImageWrapper}>
                <Image
                  src={`/webp/${image.id}.webp`}
                  alt={`Exhibition image ${image.id}`}
                  layout="intrinsic"
                  width={1920}
                  height={1080}
                />
                <div className={styles.imageOverlay} />
              </div>
            )}
          </section>
        ))}
      </div>
      <Navigation totalSlides={images.length} currentSlide={currentSlide} setCurrentSlide={scrollToSlide} />
    </div>
  )
}

