import { Container } from "@material-ui/core"
import * as React from "react"
import Column from "../../Column"

type Props = {
  background?: string
  noContainer?: boolean
  className?: string
}

const Section: React.FC<Props> = ({
  background,
  noContainer,
  children,
  className,
}) => {
  return (
    <Column
      className={className}
      style={{
        background,
      }}
    >
      {noContainer ? (
        children
      ) : (
        <Container>
          <>{children}</>
        </Container>
      )}
    </Column>
  )
}

export default Section
