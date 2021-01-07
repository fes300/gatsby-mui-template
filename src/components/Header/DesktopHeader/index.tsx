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

type Props = {}

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: `${theme.constants.desktopHeaderHeight}px`,
    justifyContent: "center",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
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
}))

const Header: React.FC<Props> = () => {
  const classes = useStyles()

  return (
    <AppBar className={cx(classes.appBar)} position="fixed">
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
                to={"/"}
              >
                <Typography variant={"h4"}>logoIcon</Typography>
              </IconButton>
            </Box>

            <Row centered className={classes.menuItemsWrapper}>
              <MenuItem
                to="/contact"
                label="Contacts"
                className={cx(classes.menuItem)}
                variant={"h5"}
              />
            </Row>
          </Row>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Header
