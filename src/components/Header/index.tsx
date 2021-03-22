import * as React from "react"
import MobileHeader from "./MobileHeader"
import DesktopHeader from "./DesktopHeader"
import * as O from "fp-ts/Option"
import { getEq } from "fp-ts/Option"
import { contramap, eqString } from "fp-ts/Eq"
import { registerIntersectionObservers } from "./registerIntersectionObservers"
import { Theme, useMediaQuery, useTheme } from "@material-ui/core"
import useIntersect from "../../hooks/useIntersect"
import { isEntryNotScrolledYet } from "../../utils/dom"

export type Section = keyof typeof Sections
export const Sections = {
  contacts: null,
}

export const eqSectionOption = getEq(contramap((s: Section) => s)(eqString))

const Header: React.FC = () => {
  const theme = useTheme()
  const [desktopScrolled, setDesktopScrolled] = React.useState(false)
  const [mobileScrolled, setMobileScrolled] = React.useState(false)
  const isDesktop = useMediaQuery<Theme>((t) => t.breakpoints.up("md"), {
    noSsr: true,
  })
  const headerHeight = isDesktop
    ? theme.constants.desktopHeaderHeight
    : theme.constants.mobileHeaderHeight
  const [activeButton, setActiveButton] = React.useState<O.Option<Section>>(
    O.none
  )
  const [mobileRef, mobileEntry] = useIntersect({})
  const activeButtonRef = React.useRef(activeButton)

  React.useEffect(() => {
    activeButtonRef.current = activeButton
  }, [activeButton])

  React.useEffect(() => {
    if (isDesktop || mobileEntry === null) return

    if (isEntryNotScrolledYet(mobileEntry)) {
      setMobileScrolled(false)
      return
    }

    setMobileScrolled(true)
  }, [mobileEntry])

  const [desktopRef, desktopEntry] = useIntersect({})

  React.useEffect(() => {
    if (!isDesktop || desktopEntry === null) return

    if (isEntryNotScrolledYet(desktopEntry)) {
      setDesktopScrolled(false)
      return
    }

    setDesktopScrolled(true)
  }, [desktopEntry])

  React.useEffect(() => {
    return registerIntersectionObservers({
      headerHeight,
      setActiveButton,
      activeButtonRef,
      sections: Sections,
    })
  }, [])

  return (
    <>
      <DesktopHeader
        scrolled={desktopScrolled}
        intersectRef={desktopRef}
        activeButton={activeButton}
      />
      <MobileHeader
        scrolled={mobileScrolled}
        intersectRef={mobileRef}
        activeButton={activeButton}
      />
    </>
  )
}

export default Header
