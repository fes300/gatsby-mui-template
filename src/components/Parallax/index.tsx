import * as React from "react"
import * as ReactDOM from "react-dom"
import Column from "../Column"
import { makeStyles } from "@material-ui/core"
import cx from "classnames"
import useIntersect from "../../hooks/useIntersect"
import { fade } from "@material-ui/core"
import { pipe } from "fp-ts/es6/function"
import { fold } from "fp-ts/Either"
import { eitherDocument } from "../../utils/dom"

interface Props {
  className?: string
  background: React.ReactNode
}

const useStyles = makeStyles((t) => ({
  wrapper: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  transparent: {
    backgroundColor: fade(t.palette.common.black, 0.05),
    height: 200,
  },
}))

const Parallax: React.FC<Props> = ({ background, children, className }) => {
  const classes = useStyles()
  const [showBackground, setShowBackground] = React.useState(false)
  const [setEntryNodeRef, entry] = useIntersect({
    rootMargin: "0px 0px 0px 200px",
  })
  const [setExitNodeRef, exit] = useIntersect({
    rootMargin: "0px 0px 0px -100%",
  })

  React.useEffect(() => {
    if (!showBackground && entry?.isIntersecting) {
      setShowBackground(true)
    }
  }, [entry])

  React.useEffect(() => {
    if (!showBackground && !exit?.isIntersecting) {
      setShowBackground(false)
    }
  }, [exit])

  return pipe(
    eitherDocument,
    fold(
      () => null,
      (document) => (
        <>
          <Column
            ref={(ref) => {
              setEntryNodeRef(ref)
              setExitNodeRef(ref)
            }}
            className={cx(className, classes.transparent)}
          >
            {children}
          </Column>

          {ReactDOM.createPortal(
            <Column
              style={{ opacity: showBackground ? 1 : 0 }}
              className={cx("parallax-portal", classes.wrapper)}
            >
              {background}
            </Column>,
            document.querySelector("body") as HTMLBodyElement
          )}
        </>
      )
    )
  )
}
export default Parallax
