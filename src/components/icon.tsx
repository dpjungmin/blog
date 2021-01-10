import React from "react"
import { ImLinkedin } from "react-icons/im"
import { GoClock, GoMarkGithub, GoSearch } from "react-icons/go"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { MdEmail } from "react-icons/md"

interface IconProps {
  name: string
}

const Icon: React.FC<IconProps> = ({ name }) => {
  switch (name.toLowerCase()) {
    case "github":
      return <GoMarkGithub />
    case "linkedin":
      return <ImLinkedin />
    case "email":
      return <MdEmail />
    case "clock":
      return <GoClock />
    case "arrow-right":
      return <BsArrowRight />
    case "arrow-left":
      return <BsArrowLeft />
    case "search":
      return <GoSearch />
    default:
      throw new Error(`${name} is an invalid icon`)
  }
}

export { Icon }
