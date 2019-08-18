import React, { useState, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';
import withStyles from 'react-jss';

export const ShadowScrollComponent = ({
  classes,
  children,
  style,
  styleSubcontainer
}) => {
  const [scroll, setScroll] = useState(false);
  const ref = useRef();

  return (
    <div
      style={style}
      className={`${classes.container} ${
        scroll ? classes.containerScroll : ''
      }`}
    >
      <div ref={ref} className={classes.subcontainer} style={styleSubcontainer}>
        {children}
        <ReactResizeDetector
          handleHeight
          onResize={() => {
            if (ref.current.clientHeight < ref.current.scrollHeight) {
              setScroll(true);
            } else {
              setScroll(false);
            }
          }}
        />
      </div>
    </div>
  );
};

ShadowScrollComponent.propTypes = {
  scrollColor: PropTypes.string,
  scrollColorHover: PropTypes.string,
  scrollWidth: PropTypes.number,
  isShadow: PropTypes.bool,
  shadow: PropTypes.string
};

ShadowScrollComponent.defaultProps = {
  scrollColor: '#c5c5c5',
  scrollColorHover: '#a6a6a6',
  scrollWidth: 8,
  scrollPadding: 0,
  isShadow: true,
  shadow:
    '0 2px 4px rgba(0, 0, 0, 0.2) inset, 0 -2px 4px rgba(0, 0, 0, 0.2) inset'
};

const styles = {
  containerScroll: {
    boxShadow: props => (props.isShadow ? props.shadow : 'none')
  },
  container: {
    width: '100%',
    overflowY: 'hidden',
    boxSizing: 'border-box',
    display: 'flex'
  },
  subcontainer: {
    paddingRight: props => props.scrollPadding,
    overflowY: 'auto',
    flex: '1',
    scrollbarColor: props => props.scrollColor + ' transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: props => props.scrollWidth,
      background: 'transparent'
    },
    '&::-webkit-scrollbar-track': { background: 'transparent' },
    '&::-webkit-scrollbar-thumb': {
      background: props => props.scrollColor,
      borderRadius: 5,
      overflow: 'hidden',
      '&:hover': { background: props => props.scrollColorHover }
    }
  }
};

export default memo(withStyles(styles)(ShadowScrollComponent));