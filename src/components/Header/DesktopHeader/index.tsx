import {
  AppBar,
  Box,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@material-ui/core"
import * as React from "react"
import cx from "classnames"
import Column from "../../Column"
import Row from "../../Row"

type Props = {}

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: `${theme.constants.desktopHeaderHeight}px`,
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      display: "none",
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
                onClick={() => window.scrollTo({ top: 0 })}
              >
                <Typography variant={"h4"}>logoIcon</Typography>
              </IconButton>
            </Box>

            <Row centered className={classes.menuItemsWrapper}>
              <Button
                disableRipple
                className={cx(classes.menuItem)}
                color="inherit"
              >
                <Column>
                  <Typography
                    variant={"h5"}
                    style={{ textTransform: "none" }}
                    color={"inherit"}
                  >
                    Example menu item
                  </Typography>
                </Column>
              </Button>
            </Row>
          </Row>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Header
