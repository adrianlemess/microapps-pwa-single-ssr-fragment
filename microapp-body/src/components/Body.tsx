import React, { useState, useCallback } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import styles from '../styles/index.scss';
import buttonsStyles from '../styles/button.scss';
import body from '../styles/body.scss';
import img1 from '../images/1.png';
import img2 from '../images/2.png';

const FIRST_IMAGE_ID = img1;
const SECOND_IMAGE_ID = img2;

const Body = () => {
  const [imageToShow, setImageToShow] = useState( FIRST_IMAGE_ID );
  const handlerClick = useCallback(
    () => {
      if ( imageToShow === FIRST_IMAGE_ID ) {
        return setImageToShow( SECOND_IMAGE_ID );
      }

      return setImageToShow( FIRST_IMAGE_ID );
    },
    [imageToShow]
  );

  return (
    <div className={styles.body}>
      <button type='button' onClick={handlerClick} className={buttonsStyles.button}>
        <TransitionGroup className={body.animWrap}>
          <CSSTransition classNames='mainImage' timeout={500} key={imageToShow}>
            <img className={styles.bodyImg} src={imageToShow} alt='main_img' />
          </CSSTransition>
        </TransitionGroup>
      </button>
    </div>
  );
};

Body.displayName = 'Body';

export default Body;
