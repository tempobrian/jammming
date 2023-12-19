import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: ${(props) => (props.centerRow ? 'center' : 'flex-start')};
  align-items: ${(props) => (props.centerRow ? 'center' : 'stretch')};
  margin-bottom: ${(props) => (props.bottomMargin ? '20px' : '0')};
`;

export const Col = styled.div`
  flex-grow: 1;
  padding: 10px;
  box-sizing: border-box;
  ${({ columns }) => columns && `flex: 0 0 ${(columns / 12) * 100}%;`}
  ${({ center }) => center && 'text-align: center;'}
`;

// Example usage:
// <Container>
//   <Row>
//     <Col columns={4}>Column 1</Col>
//     <Col columns={8}>Column 2</Col>
//   </Row>
// </Container>
