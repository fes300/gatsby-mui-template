import React from "react"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import Button from "@material-ui/core/Button"
import cx from "classnames"
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core"
import Column from "../../Column"
import Row from "../../Row"

const useStyles = makeStyles((t) => ({
  appBar: {
    height: `${t.constants.mobileHeaderHeight}px`,
    justifyContent: "center",
    [t.breakpoints.up("md")]: {
      display: "none",
    },
  },
  drawer: {
    opacity: 0,
    transition: "opacity 0.7s",
  },
  drawerHeaderBig: {
    padding: "30px 0 0 0",
  },
  drawerHeaderSmall: {
    padding: "20px 0 0 24px",
  },
  drawerHeaderActive: {
    opacity: 1,
  },
  menuItem: {
    opacity: 0,
    transform: "none",
    transition: "opacity, transform, .7s",
  },
  menuItemActive: {
    opacity: 1,
    transform: "translateX(-30px)",
  },
  transitionDelay1: {
    transitionDelay: "0s",
  },
  transitionDelay2: {
    transitionDelay: ".2s",
  },
  transitionDelay3: {
    transitionDelay: ".4s",
  },
  transitionDelay4: {
    transitionDelay: ".6s",
  },
}))

const drawerAnimationTime = 600

const MobileHeader = () => {
  const classes = useStyles()
  const [isOpen, setIsOpen] = React.useState(false)
  const [triggerAnimation, setTriggerAnimation] = React.useState(false)
  const toggleDrawer = (open: boolean): React.EventHandler<any> => () => {
    setIsOpen(open)
  }

  // animation is delayed to wait for drawer to be mounted
  React.useEffect(() => {
    setTimeout(() => setTriggerAnimation(isOpen), drawerAnimationTime * 0.5)
  }, [isOpen])

  return (
    <>
      <AppBar className={cx(classes.appBar)} position="fixed">
        <Toolbar>
          <Row grow>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              disableRipple
              onClick={() => window.scrollTo({ top: 0 })}
            >
              <Typography variant={"h4"}>logoIcon</Typography>
            </IconButton>
          </Row>

          <Button disableRipple onClick={toggleDrawer(!isOpen)}>
            <Typography variant={"h4"}>menuIcon</Typography>
          </Button>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        anchor={"right"}
        transitionDuration={{ enter: drawerAnimationTime, exit: 300 }}
      >
        <Column grow>
          <Row hAlign={"between"} className={cx(classes.drawer)}>
            <Typography variant={"h4"}>logoIcon</Typography>

            <Button disableRipple onClick={toggleDrawer(!isOpen)}>
              <Typography variant={"h4"}>closeIcon</Typography>
            </Button>
          </Row>

          <Column vAlign={"center"} grow style={{ marginRight: "-25px" }}>
            <Row hAlign={"end"}>
              <Button
                className={cx(classes.menuItem, classes.transitionDelay1, {
                  [classes.menuItemActive]: triggerAnimation,
                })}
                disableRipple
                color="inherit"
              >
                <Column>
                  <Typography
                    variant={"h3"}
                    style={{
                      marginTop: 0,
                      fontSize: 26,
                      textTransform: "none",
                    }}
                    color={"inherit"}
                  >
                    Example menu item
                  </Typography>
                </Column>
              </Button>
            </Row>
          </Column>
        </Column>
      </SwipeableDrawer>
    </>
  )
}

export default MobileHeader
