import styled from 'styled-components';
import { FaAngleDown } from 'react-icons/fa';

const typeface = props => props.theme.typeface;
const primary = props => props.theme.primary;

export const LogoLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.img`
  @media screen and (max-width: 480px) {
    width: 150px;
    height: auto;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  flex-direction: ${({ flexDir }) => (flexDir ? flexDir : 'row')};
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavListItem = styled.li`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: center;

  color: #fff;
  font-size: 14px;
  list-style-type: none;

  cursor: pointer;

  position: relative;
  margin-left: 32px;
  padding-right: 32px;
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: #fff;

  width: 100%;
  height: 100%;
`;

export const IconWrap = styled.div`
  margin-right: 8px;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: 200ms ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : '')};

  ${NavListItem}:hover & {
    transform: rotate(180deg);
  }

  @media screen and (max-width: 768px) {
    margin: 0 8px;
  }
`;

export const DropDownIcon = styled(FaAngleDown)`
  color: ${primary};
`;

export const DropDown = styled.div`
  display: flex;
  background-color: #121b23;
  flex-direction: column;
  width: 100%;
  opacity: 0;
  position: absolute;
  top: 20px;
  left: 0;
  color: #fff;
  z-index: 1;
  box-shadow: 1px 1px 5px 1px rgba(200, 200, 200, 0.1);
  transform: scaleY(0);
  transform-origin: top;
  transition: 200ms ease-in-out;

  ${NavListItem}:hover & {
    opacity: 1;
    transform: scaleY(1);
  }
`;

export const DropDownItem = styled.p`
  padding: 6px 8px;

  &:hover {
    background-color: ${primary};
    color: ${typeface};
  }
`;

export const MenuBtn = styled.div`
  display: none;
  padding: 8px;
  color: #fff;
  font-size: 20px;
  position: relative;

  border-radius: 5px;

  &:hover {
    background-color: rgba(200, 200, 200, 0.2);
  }

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

export const MobileMenu = styled.div`
  display: flex;
  opacity: 0;
  flex-direction: column;
  color: #fff;
  position: absolute;
  top: 74px;
  right: 24px;

  border-radius: 5px;
  background-color: #121b23;
  box-shadow: 1px 1px 5px 1px rgba(200, 200, 200, 0.1);

  transition: 200ms ease-in-out;

  @media screen and (max-width: 768px) {
    opacity: ${({ show }) => (show ? '1' : '0')};
    transform: ${({ show }) => (show ? 'scaleY(1)' : 'scaleY(0)')};
    transform-origin: top;
  }
  @media screen and (max-width: 480px) {
    top: 60px;
  }
`;

export const MobileMenuItem = styled.div`
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  cursor: pointer;
  background-color: ${({ noDropdown, isOpen }) =>
    !noDropdown ? (isOpen ? 'rgba(200, 200, 200, 0.2)' : '') : ''};

  &:hover {
    background-color: ${({ noContent }) =>
      noContent ? 'rgba(200, 200, 200, 0.2)' : ''};
  }
`;

export const MobileMenuP = styled.p`
  padding: 8px 16px;
  width: 100%;
  height: 100%;

  font-weight: 500;
`;

export const MobileDropDown = styled.div`
  flex-direction: column;
  width: 100%;
  color: #fff;

  max-height: ${({ isOpen }) => (isOpen ? '400px' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transform: ${({ isOpen }) => (isOpen ? 'scaleY(1)' : 'scaleY(0)')};
  transform-origin: top;
  transition: 150ms ease-in-out;
`;

export const MobileDropDownItem = styled.p`
  padding: 8px 16px 8px 24px;
  font-weight: 300;
`;
