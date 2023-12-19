import styled from 'styled-components';

const Text = styled.p`
  /* Choose the HTML element */
  ${({ as }) => as && `as: ${as};`}

  color: ${props => props.theme.colors[props.color]};
  
  /* Customize text size */
  font-size: 
  ${props => {
    switch (props.size) {
      case "sm":
        return "12px";
      case "md":
        return "18px";
      case "lg":
        return "20px";
      default:
        return "16px"; // Default size
    }
  }};
  
  /* Customize font weight */
  font-weight: ${({ weight }) => (weight === 'bold' ? 'bold' : weight === 'bolder' ? 'bolder' : 'normal')};

  margin: 0 0 6px;

  /* Ellipsis for overflow */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 460px;
`;

export default Text;
