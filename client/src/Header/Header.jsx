import React from 'react';

import './Header.scss';
import { ReactComponent as CloudColor } from './cloud-color.svg';
import { ReactComponent as CloudEffects } from './cloud-effects.svg';
import NewPlayerModal from '../Modal/NewPlayerModal';

const Header = () => (
  <header id="main-header" className="header level is-mobile">
    <div className="level-left">
      <div className="logo">
        <CloudColor className="logo__color" />
        <CloudEffects className="logo__effects" />
      </div>
      <h1 className="title is-size-6-mobile">FWI Poker Challenge</h1>
    </div>
    <NewPlayerModal />
  </header>
);

export default Header;
