import { makeStyles, Typography } from "@material-ui/core"
import { Button } from "gatsby-theme-material-ui"
import * as React from "react"
import { useMatch } from "@reach/router"
import cx from "classnames"
import { Variant } from "@material-ui/core/styles/createTypography"

type Props = {
  to: string
  className?: string
  label: string
  variant: Variant
}

const useStyles = makeStyles((t) => ({
  menuItemCurrent: {
    color: "red",
  },
}))

const MenuItem: React.FC<Props> = ({ to, label, className, variant }) => {
  const classes = useStyles()
  const isCurrent = useMatch(to)

  return (
    <Button
      className={cx(className, {
        [classes.menuItemCurrent]: isCurrent,
      })}
      disableRipple
      color="inherit"
      to={to}
    >
      <Typography
        variant={variant}
        style={{
          textTransform: "none",
        }}
        color={"inherit"}
      >
        {label}
      </Typography>
    </Button>
  )
}

export default MenuItem
