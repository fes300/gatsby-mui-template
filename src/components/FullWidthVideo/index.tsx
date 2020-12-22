import { fold, none, Option, some } from "fp-ts/lib/Option"
import { pipe } from "fp-ts/lib/pipeable"
import cx from "classnames"
import React, { useState } from "react"
import useWindowSize from "../../hooks/useWindowSize"
import Player from "@vimeo/player"
import { makeStyles } from "@material-ui/styles"

interface Props {
  videoSrcURL: string
  videoTitle: string
  heightWidthRatio: number
  customPlayIcon?: React.ReactNode
  customPauseIcon?: React.ReactNode
}

type State = {
  sizes: Option<{ width: number; height: number }>
  player: Option<Player>
}

interface WrapperProps {
  heightWidthRatio: number
  setSizes: React.Dispatch<React.SetStateAction<State["sizes"]>>
  windowSize: number
}

interface CustomPlayIconProps {
  controlledPlayerId: string
  controlledPlayer: Player | null
  customPlayIcon: React.ReactNode
  customPauseIcon?: React.ReactNode
}

interface VimeoIFrameProps {
  height: number
  width: number
  videoSrcURL: string
  videoTitle: string
  setPlayer: React.Dispatch<React.SetStateAction<State["player"]>>
}

const useStyles = makeStyles((t) => ({
  wrapper: {
    position: "relative",
  },
  hoverLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  playIcon: {
    minHeight: "30px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    transition: "opacity 0.5s",
    opacity: 1,
    cursor: "pointer",
    zIndex: 2,
  },
  playingIcon: {
    opacity: 0,
  },
}))

const Wrapper = React.memo<WrapperProps>(
  (props) => {
    return (
      <div
        className="video"
        ref={(el) => {
          if (el !== null) {
            props.setSizes(
              some({
                height: el.offsetWidth * props.heightWidthRatio,
                width: el.offsetWidth,
              })
            )
          }
        }}
      />
    )
  },
  (
    { heightWidthRatio: prevHeightWidthRatio, windowSize: prevWindowSize },
    { heightWidthRatio, windowSize }
  ) => {
    return (
      prevHeightWidthRatio === heightWidthRatio && prevWindowSize === windowSize
    )
  }
)

const CustomPlayIcon: React.FC<CustomPlayIconProps> = React.memo(
  ({
    controlledPlayer,
    customPlayIcon,
    customPauseIcon,
    controlledPlayerId,
  }) => {
    const classes = useStyles()
    const [playing, setPlaying] = React.useState(false)
    React.useEffect(() => {
      controlledPlayer?.on("playing", () => {
        setPlaying(true)
      })
      controlledPlayer?.on("pause", () => {
        setPlaying(false)
      })
    }, [controlledPlayer])

    return (
      <div
        className={cx(classes.playIcon, { [classes.playingIcon]: playing })}
        onClick={(e) => {
          e.stopPropagation()
          if (playing) {
            controlledPlayer?.pause()
          } else {
            document
              .getElementById(controlledPlayerId)
              ?.setAttribute("style", "position: absolute; top: 0; z-index: 1;")
            controlledPlayer?.play()
          }
        }}
      >
        {playing ? customPauseIcon ?? customPlayIcon : customPlayIcon}
      </div>
    )
  },
  ({ controlledPlayer: prevPlayer }, { controlledPlayer }) =>
    prevPlayer === controlledPlayer
)

const VimeoIFrame: React.FC<VimeoIFrameProps> = React.memo(
  ({ height, width, videoSrcURL, videoTitle, setPlayer }) => {
    return (
      <iframe
        ref={(iframe) => {
          if (iframe) {
            const player = new Player(iframe)
            setPlayer(some(player))
          }
        }}
        src={videoSrcURL + "?controls=0&muted=1"}
        title={videoTitle}
        allow="autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        width={width}
        height={height}
      />
    )
  },
  (
    { height: prevHeight, width: prevWidth, videoSrcURL: prevVideoSrcURL },
    { height, width, videoSrcURL }
  ) => {
    return (
      prevHeight === height &&
      prevWidth === width &&
      videoSrcURL === prevVideoSrcURL
    )
  }
)

const Video: React.FC<Props> = ({
  videoSrcURL,
  videoTitle,
  heightWidthRatio,
  customPlayIcon,
  customPauseIcon,
}) => {
  const classes = useStyles()
  const [sizes, setSizes] = useState<State["sizes"]>(none)
  const [windowSize] = useWindowSize()
  const videoID = videoSrcURL.split("/")[videoSrcURL.split("/").length - 1]
  const [player, setPlayer] = useState<State["player"]>(none)
  const controlledPlayer = React.useRef<Player | null>(null)
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const removeWrapperActive = () => {
    wrapperRef.current?.blur()
    wrapperRef.current?.classList.remove("active")
  }

  React.useEffect(() => {
    if (sizes._tag === "None") return

    document.addEventListener("mousedown", removeWrapperActive)

    controlledPlayer.current = new Player(videoID, {
      url: videoSrcURL,
      controls: true,
      height: sizes.value.height, // not working!
      width: sizes.value.width,
    })

    setTimeout(
      () =>
        document
          .querySelector(`[id='${videoID}'] iframe`)
          ?.setAttribute("height", sizes.value.height.toString()),
      500
    )

    return () => document.removeEventListener("mousedown", removeWrapperActive)
  }, [videoSrcURL, videoID, sizes])

  return (
    <>
      <Wrapper
        windowSize={windowSize}
        setSizes={setSizes}
        heightWidthRatio={heightWidthRatio}
      />
      {pipe(
        sizes,
        fold(
          () => null,
          ({ width, height }) => {
            return (
              <div
                ref={wrapperRef}
                className={classes.wrapper}
                style={{ height }}
              >
                <div className={classes.hoverLayer}>
                  <div
                    id={videoID}
                    style={{ position: "absolute", top: 0, zIndex: -1 }}
                  />
                  <VimeoIFrame
                    setPlayer={setPlayer}
                    height={height}
                    width={width}
                    videoSrcURL={videoSrcURL}
                    videoTitle={videoTitle}
                  />

                  {player._tag === "Some" && (
                    <>
                      {customPlayIcon && (
                        <CustomPlayIcon
                          controlledPlayerId={videoID}
                          controlledPlayer={controlledPlayer.current}
                          customPlayIcon={customPlayIcon}
                          customPauseIcon={customPauseIcon}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          }
        )
      )}
    </>
  )
}

export default Video
