import styled from "styled-components"
import { FaSpotify } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";

export const SpotifyIcon = styled(FaSpotify)`
  font-size: 24px;
  margin-right: 6px;
`

export const PlusSign = styled(CiSquarePlus)`
  font-size: 40px;
  cursor: pointer;
  transition: color .25s;
  &:hover {
    color: rgba(265, 265, 265, .5);
  }
`

export const MinusSign = styled(CiSquareMinus)`
  font-size: 40px;
  cursor: pointer;
  transition: color .25s;
  &:hover {
    color: rgba(265, 265, 265, .5);
  }
`