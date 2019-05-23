import React, { useState } from 'react';
import { compose, withProps, withState } from 'proppy';
import PropTypes from 'prop-types';
import { attach } from 'proppy-react';

import Logo from '../Logo';
import NavItem from '../NavItem';
import './styles.scss';

const withHeaderState = compose(
  withState('active', 'setActive', 1),
  withProps({ items: [0, 1, 2, 3] })
);

// eslint-disable-next-line react/prop-types
const Header = ({ items, active, setActive }) => {
  const [counterState, setCounterState] = useState({
    counter: 0
  });

  window.addEventListener('increaseCounter', event => {
    setCounterState({ counter: counterState.counter + event.detail });
  });

  window.addEventListener('reset', () => {
    setCounterState({ counter: 0 });
  });

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

Header.propTypes = {
  items: PropTypes.arrayOf(PropTypes.number).isRequired,
  active: PropTypes.number.isRequired,
  setActive: PropTypes.func.isRequired
};

export default attach(withHeaderState)(Header);
