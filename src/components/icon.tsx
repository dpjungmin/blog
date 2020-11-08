import React from "react"
import { ImLinkedin } from "react-icons/im"
import { GoClock } from "react-icons/go"

interface IconProps {
  name: string
}

const Icon: React.FC<IconProps> = ({ name }) => {
  switch (name.toLowerCase()) {
    case "linkedin":
      return <ImLinkedin />
    case "clock":
      return <GoClock />
    default:
      throw new Error(`${name} is an invalid icon`)
  }
}

export { Icon }
