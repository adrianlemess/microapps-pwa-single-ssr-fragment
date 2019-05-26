import React from 'react';

import Logo from '../Logo';
import NavItem from '../NavItem';
import './styles.scss';

// eslint-disable-next-line react/prop-types
const Header = ({ items, active, setActive }) => {
  return (
    <div className='header'>
      <Logo />
      {
        // eslint-disable-next-line no-unused-vars
        items.map((_item, index) => (
          <NavItem
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            index={index}
            active={index === active}
            onClick={setActive}
          />
        ))}
    </div>
  );
};

export default Header;
