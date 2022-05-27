import React from 'react';
import { Container, Wrap } from '../components';
import { Link } from 'react-router-dom';
import {
  ColorSpan,
  LandingBtn,
  LandingH1,
  LandingH2,
  LandingP,
  TextWrap,
} from './landing-page.style';

const LandingPage = () => {
  return (
    <Container>
      <Wrap pad="32px 24px" flexDir="column">
        <TextWrap>
          <LandingH2>bull dex protocol</LandingH2>
          <LandingH1>
            proactive swap <ColorSpan>infrastructure</ColorSpan>
          </LandingH1>
          <LandingP>for everyone</LandingP>
        </TextWrap>
        <LandingBtn href="#"><Link to={'/swap'}>launch beta app</Link></LandingBtn>
      </Wrap>
    </Container>
  );
};

export default LandingPage;
