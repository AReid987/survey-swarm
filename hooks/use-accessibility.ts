import { useEffect, useRef, useState } from 'react'

export function useKeyboardNavigation(
  items: HTMLElement[],
  onSelect?: (index: number) => void,
  options?: {
    loop?: boolean
    orientation?: 'horizontal' | 'vertical'
  }
) {
  const { loop = true, orientation = 'vertical' } = options || {}
  const focusedIndexRef = useRef(-1)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = focusedIndexRef.current
      let nextIndex = currentIndex

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault()
          nextIndex = currentIndex + 1
          if (nextIndex >= items.length) {
            nextIndex = loop ? 0 : items.length - 1
          }
          break
        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault()
          nextIndex = currentIndex - 1
          if (nextIndex < 0) {
            nextIndex = loop ? items.length - 1 : 0
          }
          break
        case 'Home':
          event.preventDefault()
          nextIndex = 0
          break
        case 'End':
          event.preventDefault()
          nextIndex = items.length - 1
          break
        case 'Enter':
        case ' ':
          event.preventDefault()
          if (currentIndex >= 0 && currentIndex < items.length) {
            items[currentIndex].click()
            onSelect?.(currentIndex)
          }
          return
        case 'Escape':
          event.preventDefault()
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur()
          }
          focusedIndexRef.current = -1
          return
        default:
          return
      }

      // Skip disabled items
      while (
        nextIndex >= 0 &&
        nextIndex < items.length &&
        items[nextIndex].disabled
      ) {
        nextIndex += event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1
        if (nextIndex >= items.length) {
          nextIndex = loop ? 0 : items.length - 1
        } else if (nextIndex < 0) {
          nextIndex = loop ? items.length - 1 : 0
        }
      }

      if (nextIndex >= 0 && nextIndex < items.length && !items[nextIndex].disabled) {
        items[nextIndex].focus()
        focusedIndexRef.current = nextIndex
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [items, loop, onSelect])

  return focusedIndexRef
}

export function useFocusManagement() {
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const trapFocus = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)
    previousFocusRef.current = document.activeElement as HTMLElement

    // Focus the first element
    if (firstElement) {
      firstElement.focus()
    }

    return () => {
      container.removeEventListener('keydown', handleTabKey)
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }

  const restoreFocus = () => {
    if (previousFocusRef.current) {
      previousFocusRef.current.focus()
    }
  }

  return { trapFocus, restoreFocus }
}

export function useAnnouncer() {
  const announcerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Create live region for screen reader announcements
    const announcer = document.createElement('div')
    announcer.setAttribute('aria-live', 'polite')
    announcer.setAttribute('aria-atomic', 'true')
    announcer.style.position = 'absolute'
    announcer.style.left = '-10000px'
    announcer.style.width = '1px'
    announcer.style.height = '1px'
    announcer.style.overflow = 'hidden'
    document.body.appendChild(announcer)
    announcerRef.current = announcer

    return () => {
      if (announcerRef.current && announcerRef.current.parentNode) {
        announcerRef.current.parentNode.removeChild(announcerRef.current)
      }
    }
  }, [])

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (announcerRef.current) {
      announcerRef.current.setAttribute('aria-live', priority)
      announcerRef.current.textContent = message
      // Clear after announcement
      setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = ''
        }
      }, 1000)
    }
  }

  return announce
}

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

export function useHighContrast() {
  const [prefersHighContrast, setPrefersHighContrast] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    setPrefersHighContrast(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersHighContrast(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersHighContrast
}

// Utility function to generate unique IDs for accessibility
export function useId(prefix: string = 'id') {
  const idRef = useRef<string>('')

  useEffect(() => {
    idRef.current = `${prefix}-${Math.random().toString(36).substr(2, 9)}`
  }, [prefix])

  return idRef.current
}

// Hook for managing ARIA attributes
export function useAriaAttributes(options: {
  label?: string
  labelledBy?: string
  describedBy?: string
  required?: boolean
  invalid?: boolean
  expanded?: boolean
  pressed?: boolean
  selected?: boolean
}) {
  const ariaAttributes: Record<string, string | boolean> = {}

  if (options.label) ariaAttributes['aria-label'] = options.label
  if (options.labelledBy) ariaAttributes['aria-labelledby'] = options.labelledBy
  if (options.describedBy) ariaAttributes['aria-describedby'] = options.describedBy
  if (options.required !== undefined) ariaAttributes['aria-required'] = options.required
  if (options.invalid !== undefined) ariaAttributes['aria-invalid'] = options.invalid
  if (options.expanded !== undefined) ariaAttributes['aria-expanded'] = options.expanded
  if (options.pressed !== undefined) ariaAttributes['aria-pressed'] = options.pressed
  if (options.selected !== undefined) ariaAttributes['aria-selected'] = options.selected

  return ariaAttributes
}