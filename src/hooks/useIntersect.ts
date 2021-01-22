import { useEffect, useRef, useState } from "react"

interface Input {
  root?: Element | null
  rootMargin?: string
  threshold?: number
}

const useIntersect = ({
  root = null,
  rootMargin = "0px",
  threshold = 0,
}: Input) => {
  const [entry, updateEntry] = useState({})
  const [nodeRef, setNodeRef] = useState<Element | null>(null)
  const observer = useRef<null | IntersectionObserver>(null)

  useEffect(() => {
    if (observer.current !== null) {
      observer.current.disconnect()
    }

    observer.current = new window.IntersectionObserver(
      ([entry]) => updateEntry(entry),
      {
        root,
        rootMargin,
        threshold,
      }
    )
    const { current: currentObserver } = observer

    if (nodeRef !== null) {
      currentObserver.observe(nodeRef)
    }

    return () => currentObserver.disconnect()
  }, [nodeRef, root, rootMargin, threshold])

  return [setNodeRef, entry]
}

export default useIntersect
