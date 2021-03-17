import * as React from "react"
import Column from "../Column"
import { makeStyles, Theme } from "@material-ui/core"
import cx from "classnames"
import useIntersect from "../../hooks/useIntersect"

interface Props {
  distance?: number | string
  delay?: number
  position?: "top" | "left"
}

interface StyleProps {
  distance: number | string
  delay: number
  position: "top" | "left"
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  wrapper: {
    position: "relative",
  },
  slideIn: ({ delay, distance, position }) => {
    return {
      transitionDelay: `${delay}ms`,
      opacity: 0,
      position: "absolute",
      [position]: distance,
      transition: "all .7s linear",
    }
  },
  slideInOn: ({ position }) => ({
    opacity: 1,
    [position]: 0,
  }),
}))

const SlideInAtAppear: React.FC<Props> = ({
  delay = 0,
  distance = 60,
  position = "top",
  children,
}) => {
  const classes = useStyles({ delay, distance, position })
  const [show, setShow] = React.useState(false)
  const [setNodeRef, entry] = useIntersect({})

  React.useEffect(() => {
    if (!show && entry?.isIntersecting) {
      setShow(true)
    }
  }, [entry])

  return (
    <Column className={classes.wrapper}>
      <Column
        ref={setNodeRef}
        className={cx(classes.slideIn, { [classes.slideInOn]: show })}
      >
        {children}
      </Column>
      <div style={{ opacity: 0 }}>{children}</div>
    </Column>
  )
}
export default SlideInAtAppear
