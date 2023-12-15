import styled from "styled-components"

const Header = styled.header`
  font-size: 2.4em;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  text-align: center;
  margin-bottom: 20px;
`

export default Header;