'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import styles from './Exhibition.module.css'
import Navigation from './Navigation'

const images = [
  { id: 'welcome', type: 'text', content: 'Welcome To Our Exhibition' },
  { id: '09', type: 'single' },
  { id: '05', type: 'single' },
  { id: '04', type: 'single' },
  { id: '06', type: 'single' },
  { id: '07', type: 'single' },
  { id: '08', type: 'single' },
  { id: '10', type: 'single' },
  { id: '11', type: 'single' },
  { id: '18', type: 'single' },
  { id: '19', type: 'single' },
  { id: '20', type: 'single' },
  { id: '15', type: 'single' },
  { id: '17', type: 'single' },
  { id: '14', type: 'single' },
  { id: '39', type: 'single' },
  { id: '16', type: 'single' },
  { id: '37', type: 'single' },
  { id: '43-44', type: 'double' },
  { id: '46-47', type: 'double' },
  { id: '49', type: 'single' },
  { id: '24', type: 'single' },
  { id: '12', type: 'single' },
  { id: '38', type: 'single' },
  { id: '36', type: 'single' },
  { id: '13', type: 'single' },
  { id: '01', type: 'single' },
  { id: '02-03', type: 'double' },
  { id: '48', type: 'single' },
  { id: '45', type: 'single' },
  { id: '22', type: 'single' },
  { id: '23', type: 'single' },
  { id: '26', type: 'single' },
  { id: '31', type: 'single' },
  { id: '50', type: 'single' },
  { id: '51', type: 'single' },
  { id: '53', type: 'single' },
  { id: '55', type: 'single' }
]

export default function Exhibition() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

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
  }, [isClient])

  const scrollToSlide = (index: number) => {
    if (!isClient) return
    containerRef.current?.children[index].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      scrollToSlide(currentSlide - 1)
    }
  }

  const handleNextSlide = () => {
    if (currentSlide < images.length - 1) {
      scrollToSlide(currentSlide + 1)
    }
  }

  return (
    <div className={styles.exhibitionWrapper}>
      <div ref={containerRef} className={styles.container}>
        {images.map((image, index) => (
          <section
            key={image.id}
            className={`${styles.section} ${image.type === 'text' ? styles.welcomeSection : ''}`}
            data-index={index}
          >
            {image.type === 'text' ? (
              <div className={styles.welcomeContent}>
                <h1 className={styles.welcomeText}>{image.content}</h1>
                <ChevronDown className={styles.downArrow} size={48} />
              </div>
            ) : image.type === 'single' ? (
              <div className={styles.singleImageWrapper}>
                <div className={styles.imageFrame}>
                  <Image
                    src={`/webp/${image.id}.webp`}
                    alt={`Exhibition image ${image.id}`}
                    layout="fill"
                    objectFit="contain"
                    priority={index < 2}
                    className={styles.exhibitionImage}
                  />
                </div>
              </div>
            ) : image.type === 'double' ? (
              <div className={styles.doubleImageSection}>
                <div className={styles.imageFrame}>
                  <Image
                    src={`/webp/${image.id.split('-')[0]}.webp`}
                    alt={`Exhibition image ${image.id.split('-')[0]}`}
                    layout="fill"
                    objectFit="contain"
                    priority={index < 2}
                    className={styles.exhibitionImage}
                  />
                </div>
                <div className={styles.imageFrame}>
                  <Image
                    src={`/webp/${image.id.split('-')[1]}.webp`}
                    alt={`Exhibition image ${image.id.split('-')[1]}`}
                    layout="fill"
                    objectFit="contain"
                    priority={index < 2}
                    className={styles.exhibitionImage}
                  />
                </div>
              </div>
            ) : null}
          </section>
        ))}
      </div>
      {isClient && (
        <>
          <Navigation totalSlides={images.length} currentSlide={currentSlide} setCurrentSlide={scrollToSlide} />
        </>
      )}
    </div>
  )
}

