import styles from './Navigation.module.css'
import { PlaneIcon as PaperPlane } from 'lucide-react'

interface NavigationProps {
  totalSlides: number
  currentSlide: number
  setCurrentSlide: (slide: number) => void
}

export default function Navigation({ totalSlides, currentSlide, setCurrentSlide }: NavigationProps) {
  return (
    <nav className={styles.navigation}>
      {Array.from({ length: totalSlides }, (_, i) => (
        <button
          key={i}
          className={`${styles.navButton} ${currentSlide === i ? styles.active : ''}`}
          onClick={() => setCurrentSlide(i)}
          aria-label={`Go to slide ${i + 1}`}
        >
          <PaperPlane
            size={21}
            className={`${styles.navIcon} ${currentSlide === i ? styles.active : ''}`}
          />
        </button>
      ))}
    </nav>
  )
}

