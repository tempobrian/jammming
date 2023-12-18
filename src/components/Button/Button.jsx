import styled from "styled-components";

const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colors[props.color]};
  outline: none;
  cursor: pointer;
  font-size: ${props => {
    switch (props.size) {
      case "sm":
        return "12px";
      case "md":
        return "14px";
      case "lg":
        return "16px";
      default:
        return "14px"; // Default size
    }
  }};
  line-height: 1;
  border-radius: ${props => (props.rounded ? "25px" : "4px")};
  transition-property: background-color, border-color, color, box-shadow, filter;
  transition-duration: 0.3s;
  border: 1px solid transparent;
  letter-spacing: 2px;
  text-transform: uppercase;
  white-space: normal;
  font-weight: 700;
  text-align: center;
  padding: ${props => {
    switch (props.size) {
      case "sm":
        return "12px 10px 14px";
      case "md":
        return "16px 14px 18px";
      case "lg":
        return "20px 18px 22px";
      default:
        return "16px 14px 18px"; // Default padding
    }
  }};
  color: ${props => props.theme.colors.white};
  height: ${props => {
    switch (props.size) {
      case "sm":
        return "36px";
      case "md":
        return "48px";
      case "lg":
        return "60px";
      default:
        return "48px"; // Default height
    }
  }};
  &:hover {
    background-image: linear-gradient(rgb(0 0 0/40%) 0 0);
  }
`;

export default Button;
