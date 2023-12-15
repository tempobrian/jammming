import styled, { css } from 'styled-components'

const Wrapper = styled.div`
background-color:  ${props => props.theme.colors.transparent};
border-radius: 10px;
color:  ${props => props.theme.colors.white};
padding: 16px;
`;

export default Wrapper