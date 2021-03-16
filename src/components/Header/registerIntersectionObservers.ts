import * as React from "react"
import * as O from "fp-ts/Option"
import { Section, Sections } from "./index"
import { debounce } from "ts-debounce"
import { pipe } from "fp-ts/function"
import { sequenceS } from "fp-ts/Apply"
import * as R from "fp-ts/Record"

type EnforceNonEmptyRecord<R> = keyof R extends never ? never : R

export const registerIntersectionObservers = ({
  headerHeight,
  setActiveButton,
  sections,
}: {
  headerHeight: number
  setActiveButton: React.Dispatch<React.SetStateAction<O.Option<Section>>>
  sections: EnforceNonEmptyRecord<typeof Sections>
}) => {
  const debouncedSetActive = debounce(
    (sectionId: string) => setActiveButton(O.some(sectionId as Section)),
    400
  )
  const debouncedSetInActive = debounce(() => setActiveButton(O.none), 400)

  const scrollDownSectionObserver = new IntersectionObserver(
    ([entry]) => {
      const sectionId = entry.target.id
      console.log(entry)

      if (!entry.isIntersecting) {
        if ((entry as any).isVisible) {
          debouncedSetActive(sectionId)
        } else {
          debouncedSetInActive()
        }
      }
    },
    {
      rootMargin: `0px 0px -${
        window.innerHeight - (headerHeight + 80) * 0.7
      }px 0px`,
    }
  )

  const scrollUpSectionObserver = new IntersectionObserver(
    ([entry]) => {
      const sectionId = entry.target.id

      if (entry.isIntersecting) {
        debouncedSetActive(sectionId)
      }
    },
    {
      rootMargin: `0px 0px -${
        window.innerHeight - (headerHeight - 20) * 0.7
      }px 0px`,
    }
  )
  const sectionDOMElements: Record<Section, O.Option<HTMLElement>> = pipe(
    sections,
    R.mapWithIndex((k, v) => O.fromNullable(document.getElementById(k)))
  )

  pipe(
    sequenceS(O.option)(sectionDOMElements),
    O.fold(
      () => {
        console.error(
          `you forgot to define some sections: ${pipe(
            sectionDOMElements,
            R.filter(O.isNone),
            R.keys
          ).join(", ")}`
        )
      },
      (els) => {
        R.record.map(els, (el) => {
          scrollDownSectionObserver.observe(el)
          scrollUpSectionObserver.observe(el)
        })
      }
    )
  )

  return () => {
    scrollDownSectionObserver.disconnect()
    scrollUpSectionObserver.disconnect()
  }
}
