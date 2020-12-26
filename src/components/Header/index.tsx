import * as React from "react"
import MobileHeader from "./MobileHeader"
import DesktopHeader from "./DesktopHeader"
interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
    </>
  )
}

export default Header
