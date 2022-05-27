import styled, { createGlobalStyle } from 'styled-components';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';

export const PrimaryContainer = styled.div`
  background-color: ${({ bgColor }) => (bgColor ? bgColor : '#fff')};
  background-image: url(${({ bgImg }) => (bgImg ? bgImg : '')});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  height: 100vh;
`;

const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    body {
        font-family: "Poppins", sans-serif;
    }
`;

export default GlobalStyle;
