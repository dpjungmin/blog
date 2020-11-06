import React from "react"
import {
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaBlog,
  FaHashtag,
} from "react-icons/fa"
import { FiExternalLink } from "react-icons/fi"
import { MdEmail } from "react-icons/md"
import { GoSearch } from "react-icons/go"
import { GrLinkedin, GrYoutube } from "react-icons/gr"
import { HiPencilAlt } from "react-icons/hi"

interface IconProps {
  name: string
}

const Icon: React.FC<IconProps> = ({ name }) => {
  switch (name.toLowerCase()) {
    // Social media
    case "github":
      return <FaGithub />
    case "linkedin":
      return <GrLinkedin />
    case "instagram":
      return <FaInstagram />
    case "twitter":
      return <FaTwitter />
    case "youtube":
      return <GrYoutube />

    // Other icons
    case "external":
      return <FiExternalLink />
    case "tag":
      return <FaHashtag />
    case "blog":
      return <FaBlog />
    case "email":
      return <MdEmail />
    case "search":
      return <GoSearch />
    case "pencil":
      return <HiPencilAlt />

    default:
      throw new Error(`${name} is an invalid icon`)
  }
}

export { Icon }
