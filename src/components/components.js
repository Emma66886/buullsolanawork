import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Wrap = styled.div`
  height: ${({ height }) => (height ? height : '')};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ pad }) => (pad ? pad : '')};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : 'transparent')};

  display: flex;
  flex-direction: ${({ flexDir }) => (flexDir ? flexDir : 'row')};
  justify-content: ${({ justCont }) => (justCont ? justCont : 'center')};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};

  @media screen and (max-width: 480px) {
    padding: 1.5rem;
    align-items: flex-start;
  }
`;
