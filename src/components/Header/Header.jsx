import React, { useState } from 'react';
import { Container, Wrap } from '../components';
import { FaBars } from 'react-icons/fa';

import {
  DropDown,
  DropDownIcon,
  DropDownItem,
  Logo,
  LogoLink,
  MenuBtn,
  MobileMenu,
  MobileMenuItem,
  NavListItem,
  NavLink,
  NavMenu,
  MobileDropDown,
  MobileDropDownItem,
  IconWrap,
  MobileMenuP,
} from './header.style';
import logo from '../../assets/image/logo.svg';

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  // reusable link component with target='_blank'
  const Link = props => {
    return (
      <>
        <NavLink href={props.href} target="_blank" rel="noreferrer">
          {props.children}
        </NavLink>
      </>
    );
  };

  const NavItem = props => {
    return (
      <>
        <NavListItem>
          {props.menuName ? props.menuName : 'Menu'}
          {props.noIcon ? (
            ''
          ) : (
            <IconWrap>
              <DropDownIcon />
            </IconWrap>
          )}
          {props.noDropdown ? (
            ''
          ) : (
            <DropDown>
              {props.subMenu ? (
                props.subMenu.map((sub, i) => {
                  return (
                    <Link href={sub['url']} key={i}>
                      <DropDownItem>{sub['name']}</DropDownItem>
                    </Link>
                  );
                })
              ) : (
                <DropDownItem>Link</DropDownItem>
              )}
            </DropDown>
          )}
        </NavListItem>
      </>
    );
  };

  const MobileDropdownComponent = props => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <MobileMenuItem
          onClick={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
          noDropdown={props.noDropdown}
        >
          <Link href={props.href}>
            <MobileMenuP>
              {props.menuName ? props.menuName : 'Menu'}
            </MobileMenuP>
          </Link>
          {props.noIcon ? (
            ''
          ) : (
            <IconWrap isOpen={isOpen}>
              <DropDownIcon />
            </IconWrap>
          )}
        </MobileMenuItem>

        {props.noDropdown ? (
          ''
        ) : (
          <MobileDropDown isOpen={isOpen}>
            {props.subMenu ? (
              props.subMenu.map((sub, i) => {
                return (
                  <Link href={sub['url']} key={i}>
                    <MobileDropDownItem>{sub['name']}</MobileDropDownItem>
                  </Link>
                );
              })
            ) : (
              <MobileDropDownItem>sub menu</MobileDropDownItem>
            )}
          </MobileDropDown>
        )}
      </>
    );
  };

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  const community = [
    { name: 'Bull Solana', url: 'https://bullsolana.com/' },
    { name: 'Telegram', url: 'https://t.me/BullSolanaOfficial' },
    { name: 'Discord', url: 'https://discord.io/BullSolana' },
    { name: 'Twitter', url: 'https://twitter.com/bullsolana__' },
    { name: 'Github', url: 'https://github.com/BullSolana' },
    {
      name: 'Solscan',
      url: 'https://solscan.io/token/9EKEh1CHMKmyvBTY6qYZm7kgRJE18tCbaY1ZbpdELbVr',
    },
    { name: 'Medium', url: 'https://medium.com/@BullSolana' },
    { name: 'Reddit', url: 'https://www.reddit.com/r/BullSolana/' },
  ];

  const docs = [
    {
      name: 'LitePaper (view)',
      url: 'https://drive.google.com/file/d/1z95PlSJXz4njeG0iU9Jf1QaNM5lJNCDE/view?usp=sharing',
    },
    {
      name: 'LitePaper (Github)',
      url: 'https://github.com/BullSolana/assets/blob/64933988c22536441e940f1f818ca75ea8d0a36c/Bull%20Solana%20Litepaper.pdf',
    },
  ];

  const media = [
    {
      name: 'BirdEye',
      url: 'https://birdeye.so/token/9EKEh1CHMKmyvBTY6qYZm7kgRJE18tCbaY1ZbpdELbVr',
    },
    {
      name: 'Raydium',
      url: 'https://raydium.io/swap/?inputCurrency=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&outputCurrency=9EKEh1CHMKmyvBTY6qYZm7kgRJE18tCbaY1ZbpdELbVr&inputAmount=1&fixed=in',
    },
    {
      name: 'Bitcoin Talk',
      url: 'https://bitcointalk.org/index.php?topic=5395477.new#new',
    },
    {
      name: 'Airdrop Form',
      url: 'https://forms.gle/mtJRHw6RKjSGYYH3A',
    },
    { name: 'Email', url: 'mailto:info.bullsolana@gmail.com' },
  ];

  return (
    <Container>
      <Wrap justCont="space-between" pad="32px 24px">
        <LogoLink href="#">
          <Logo src={logo} alt="" />
        </LogoLink>
        <MenuBtn onClick={toggleMenu}>
          <FaBars />
        </MenuBtn>
        <NavMenu>
          <NavItem menuName="Community" subMenu={community} />
          <NavItem menuName="Docs" subMenu={docs} />
          <NavItem menuName="Media" subMenu={media} />
          <NavItem
            menuName="Blog"
            noDropdown
            noIcon
            // href="blog"
            noContent
          />
        </NavMenu>
        <MobileMenu show={showSidebar}>
          <MobileDropdownComponent menuName="Community" subMenu={community} />
          <MobileDropdownComponent menuName="Docs" subMenu={docs} />
          <MobileDropdownComponent menuName="Media" subMenu={media} />
          <MobileDropdownComponent
            menuName="Blog"
            noDropdown
            noIcon
            // href="blog"
            noContent
          />
        </MobileMenu>
      </Wrap>
    </Container>
  );
};

export default Header;
