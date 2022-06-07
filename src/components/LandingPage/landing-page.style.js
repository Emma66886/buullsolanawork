import styled from 'styled-components';
const typeface = props => props.theme.typeface;
const primary = props => props.theme.primary;

export const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #fff;
  margin: 80px 0;
  text-transform: capitalize;

  @media screen and (max-width: 480px) {
    align-items: flex-start;
  }
`;

export const LandingH2 = styled.h2`
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 500;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const LandingH1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;

  @media screen and (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

export const ColorSpan = styled.span`
  color: ${primary};
`;

export const LandingP = styled.p`
  font-size: 2.5rem;
  font-weight: 300;

  @media screen and (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const Link = ({ className, children, href }) => (
  <a href={href} className={className}>
    <p>{children}</p>
  </a>
);

export const LandingBtn = styled(Link)`
  background-color: ${({ bgColor }) => (bgColor ? bgColor : primary)};
  color: ${({ color }) => (color ? color : typeface)};

  padding: 16px 40px;

  font-size: 1.25rem;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;

  text-decoration: none;
  text-transform: capitalize;

  border-radius: 20px;

  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1),
    -1px -1px 10px 0px rgba(0, 0, 0, 0.1);

  transition: ease-in-out 100ms;

  &:hover {
    cursor: pointer;
    background-color: #00d195;
  }

  &:active {
    background-color: ${primary};
    box-shadow: none;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.125rem;
  }

  @media screen and (max-width: 480px) {
    align-self: center;

    font-size: 1rem;
  }
`;
