import * as React from "react"
import * as O from "fp-ts/Option"
import { eqSectionOption, Section, Sections } from "./index"
import { pipe } from "fp-ts/function"
import { sequenceS } from "fp-ts/Apply"
import * as R from "fp-ts/Record"

type EnforceNonEmptyRecord<R> = keyof R extends never ? never : R

export const registerIntersectionObservers = ({
  headerHeight,
  setActiveButton,
  activeButtonRef,
  sections,
}: {
  headerHeight: number
  setActiveButton: React.Dispatch<React.SetStateAction<O.Option<Section>>>
  activeButtonRef: React.MutableRefObject<O.Option<Section>>
  sections: EnforceNonEmptyRecord<typeof Sections>
}) => {
  const scrollUpSectionObserver = new IntersectionObserver(
    ([entry]) => {
      const sectionId = entry.target.id

      if (entry.isIntersecting) {
        setActiveButton(O.some(sectionId as Section))
      } else {
        if (
          eqSectionOption.equals(
            O.some(sectionId as Section),
            activeButtonRef.current
          )
        )
          setActiveButton(O.none)
      }
    },
    {
      root: null,
      rootMargin: `-${headerHeight + 50}px`,
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
          scrollUpSectionObserver.observe(el)
        })
      }
    )
  )

  return () => {
    scrollUpSectionObserver.disconnect()
  }
}
