import { ThemeProvider } from 'styled-components';
import LandingPage from './components/LandingPage';
import GlobalStyle, { PrimaryContainer } from './Global.style';
import theme from './theme';
import imgURL from './assets/image/landing.webp';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Swap from '@project-serum/swap-ui';
import Swapui from './swap/swap';

function App() {
  
  return (
    <Router>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PrimaryContainer bgImg={imgURL}>
        <Header />
        <Routes>
          <Route exact path='/' element={<LandingPage />}/>
          <Route exact path='/swap' element={<Swapui />}/>
        </Routes>
      </PrimaryContainer>
    </ThemeProvider>
    </Router>
  );
}

export default App;
