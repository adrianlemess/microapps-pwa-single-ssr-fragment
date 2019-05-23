/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './styles.scss';

const NavItem = ({
  index,
  active,
  onClick
}) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <div
    onClick={() => onClick(index)}
    className={classnames({
      'nav-item': true,
      current: active
    })}
  />
);

NavItem.propTypes = {
  active: PropTypes.bool,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func
};

NavItem.defaultProps = {
  active: false,
  onClick: () => {}
};

export default NavItem;
