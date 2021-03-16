import {
  AppBar,
  Box,
  makeStyles,
  Toolbar,
  Typography,
  Container,
} from "@material-ui/core"
import * as React from "react"
import cx from "classnames"
import Row from "../../Row"
import MenuItem from "../MenuItem"
import { IconButton } from "gatsby-theme-material-ui"
import * as O from "fp-ts/Option"
import { Section } from ".."
import { eqSectionOption } from "../index"

interface Props {
  activeButton: O.Option<Section>
  scrolled: boolean
  intersectRef: React.Dispatch<React.SetStateAction<Element | null>>
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: `${theme.constants.desktopHeaderHeight}px`,
    justifyContent: "center",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  active: {
    color: "red",
  },
  menuItemsWrapper: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  menuItem: {
    marginRight: "10px",
  },
  menuButton: {
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  logoArea: {
    cursor: "pointer",
  },
  scrolled: {
    backgroundColor: "red",
  },
}))

const DesktopHeader: React.FC<Props> = ({
  activeButton,
  intersectRef,
  scrolled,
}) => {
  const classes = useStyles()
  console.log(activeButton)

  return (
    <>
      <AppBar
        className={cx(classes.appBar, { [classes.scrolled]: scrolled })}
        position="fixed"
      >
        <Toolbar>
          <Container>
            <Row hAlign={"center"}>
              <Box
                className={classes.logoArea}
                display={"flex"}
                flexDirection={"row"}
                flexGrow={1}
              >
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="home"
                  disableRipple
                  onClick={() => window.scrollTo({ top: 0 })}
                >
                  <Typography variant={"h4"}>logoIcon</Typography>
                </IconButton>
              </Box>

              <Row centered className={classes.menuItemsWrapper}>
                <MenuItem
                  scrollTo={"contacts"}
                  label="contacts"
                  variant={"h3"}
                  className={cx(classes.menuItem, {
                    [classes.active]: eqSectionOption.equals(
                      activeButton,
                      O.some("contacts")
                    ),
                  })}
                />
              </Row>
            </Row>
          </Container>
        </Toolbar>
      </AppBar>
      <div ref={intersectRef} id={"desktop-header-intersection-bait"} />
    </>
  )
}

export default DesktopHeader
