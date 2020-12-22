import * as React from "react"
import MobileHeader from "./MobileHeader"
import DesktopHeader from "./DesktopHeader"

const Header = () => {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
    </>
  )
}

export default Header
