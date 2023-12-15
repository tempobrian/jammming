import styled from "styled-components";

const Input = styled.input`
  outline: none;
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
  font-size: 1.5em;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  &::placeholder {
    color: ${props => props.theme.colors.secondary};
  }
`
export default Input;