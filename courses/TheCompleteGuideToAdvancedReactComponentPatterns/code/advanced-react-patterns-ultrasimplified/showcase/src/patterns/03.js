import React, {
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
  useLayoutEffect,
  createContext,
} from 'react';
import mojs from 'mo-js';
import { generateRandomNumber } from '../utils/generateRandomNumber';

import styles from './index.css';

/** ====================================
 *      Define custom context
==================================== **/
const MediumClapContext = createContext({});
const { Provider } = MediumClapContext;

/** ====================================
 *      Custom hook for animation
==================================== **/
const useClapAnimation = ({ clapEl, clapCountEl, clapTotalEl }) => {
  const [animationTimeline, setAnimationTimeline] = useState(
    () => new mojs.Timeline()
  );

  useLayoutEffect(() => {
    if (!clapEl || !clapCountEl || !clapTotalEl) return;

    const tlDuration = 300;

    const triangleBurst = new mojs.Burst({
      count: 5,
      angle: 30,
      parent: clapEl,
      radius: { 50: 95 },
      children: {
        scale: 1,
        delay: 30,
        angle: 210,
        speed: 0.2,
        strokeWidth: 2,
        shape: 'polygon',
        radius: { 6: 0 },
        duration: tlDuration,
        stroke: 'rgba(211,84,0 ,0.5)',
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
      },
    });

    const circleBurst = new mojs.Burst({
      angle: 25,
      parent: clapEl,
      radius: { 50: 75 },
      duration: tlDuration,
      children: {
        delay: 30,
        speed: 0.2,
        shape: 'circle',
        radius: { 3: 0 },
        fill: 'rgba(149, 165, 166, 0.5)',
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
      },
    });

    const countAnimation = new mojs.Html({
      y: { 0: -30 },
      isShowEnd: true,
      el: clapCountEl,
      opacity: { 0: 1 },
      isShowStart: false,
      duration: tlDuration,
    }).then({
      y: -80,
      opacity: { 1: 0 },
      delay: tlDuration / 2,
    });

    const countTotalAnimation = new mojs.Html({
      y: { 0: -3 },
      isShowEnd: true,
      opacity: { 0: 1 },
      isShowStart: false,
      duration: tlDuration,
      el: clapTotalEl,
      delay: (3 * tlDuration) / 2,
    });

    const scaleButton = new mojs.Html({
      el: clapEl,
      scale: { 1.3: 1 },
      duration: tlDuration,
      easing: mojs.easing.out,
    });

    if (typeof clapEl === 'string') {
      const clap = document.getElementById('clap');
      clap.style.transform = 'scale(1, 1)';
    } else {
      clapEl.style.transform = 'scale(1, 1)';
    }

    const newAnimationTimeline = animationTimeline.add([
      countAnimation,
      countTotalAnimation,
      scaleButton,
      circleBurst,
      triangleBurst,
    ]);
    setAnimationTimeline(newAnimationTimeline);
  }, [clapEl, clapCountEl, clapTotalEl]);

  return animationTimeline;
};

/** ====================================
 *      🔰SubComponents
Smaller Component used by <MediumClap />
==================================== **/
const ClapIcon = () => {
  const { isClicked } = useContext(MediumClapContext);
  return (
    <span>
      <svg
        id="clapIcon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-549 338 100.1 125"
        className={`${styles.icon} ${isClicked && styles.checked}`}
      >
        <path d="M-471.2 366.8c1.2 1.1 1.9 2.6 2.3 4.1.4-.3.8-.5 1.2-.7 1-1.9.7-4.3-1-5.9-2-1.9-5.2-1.9-7.2.1l-.2.2c1.8.1 3.6.9 4.9 2.2zm-28.8 14c.4.9.7 1.9.8 3.1l16.5-16.9c.6-.6 1.4-1.1 2.1-1.5 1-1.9.7-4.4-.9-6-2-1.9-5.2-1.9-7.2.1l-15.5 15.9c2.3 2.2 3.1 3 4.2 5.3zm-38.9 39.7c-.1-8.9 3.2-17.2 9.4-23.6l18.6-19c.7-2 .5-4.1-.1-5.3-.8-1.8-1.3-2.3-3.6-4.5l-20.9 21.4c-10.6 10.8-11.2 27.6-2.3 39.3-.6-2.6-1-5.4-1.1-8.3z" />
        <path d="M-527.2 399.1l20.9-21.4c2.2 2.2 2.7 2.6 3.5 4.5.8 1.8 1 5.4-1.6 8l-11.8 12.2c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l34-35c1.9-2 5.2-2.1 7.2-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l28.5-29.3c2-2 5.2-2 7.1-.1 2 1.9 2 5.1.1 7.1l-28.5 29.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.4 1.7 0l24.7-25.3c1.9-2 5.1-2.1 7.1-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l14.6-15c2-2 5.2-2 7.2-.1 2 2 2.1 5.2.1 7.2l-27.6 28.4c-11.6 11.9-30.6 12.2-42.5.6-12-11.7-12.2-30.8-.6-42.7m18.1-48.4l-.7 4.9-2.2-4.4m7.6.9l-3.7 3.4 1.2-4.8m5.5 4.7l-4.8 1.6 3.1-3.9" />
      </svg>
    </span>
  );
};

const ClapCount = () => {
  const { count, setRef } = useContext(MediumClapContext);
  return (
    <span ref={setRef} data-refkey="clapCountRef" className={styles.count}>
      +{count}
    </span>
  );
};

const CountTotal = () => {
  const { countTotal, setRef } = useContext(MediumClapContext);
  return (
    <span ref={setRef} data-refkey="clapTotalRef" className={styles.total}>
      {countTotal}
    </span>
  );
};

/** ====================================
 *      🔰 MediumClap
==================================== **/
const MAXIMUM_USER_CLAP = 10;

const initialState = {
  count: 0,
  isClicked: false,
  countTotal: generateRandomNumber(500, 10000),
};

const MediumClap = ({ children, onClap }) => {
  const [{ clapRef, clapCountRef, clapTotalRef }, setRefs] = useState({});
  const [clapState, setClapState] = useState(initialState);
  const { count } = clapState;

  const animationTimeline = useClapAnimation({
    clapEl: clapRef,
    clapCountEl: clapCountRef,
    clapTotalEl: clapTotalRef,
  });

  useEffect(() => {
    onClap && onClap(clapState);
  }, [count]);

  // save node
  const setRef = useCallback((node) => {
    setRefs((prevRefs) => ({
      ...prevRefs,
      [node.dataset.refkey]: node,
    }));
  }, []);

  const handleClapClick = () => {
    // 👉 prop from HOC
    animationTimeline.replay();

    setClapState((prevState) => ({
      isClicked: true,
      count: Math.min(count + 1, MAXIMUM_USER_CLAP),
      countTotal:
        count < MAXIMUM_USER_CLAP
          ? prevState.countTotal + 1
          : prevState.countTotal,
    }));
  };

  const memoizedValues = useMemo(
    () => ({ ...clapState, setRef }),
    [clapState, setRef]
  );

  return (
    <Provider value={memoizedValues}>
      <button
        ref={setRef}
        data-refkey="clapRef"
        className={styles.clap}
        onClick={handleClapClick}
      >
        {children}
      </button>
    </Provider>
  );
};

// alternative export strategy for related components
MediumClap.Icon = ClapIcon;
MediumClap.Count = ClapCount;
MediumClap.Total = CountTotal;

/** ====================================
    *        🔰USAGE
    Below's how a potential user
    may consume the component API
==================================== **/
const Usage = () => {
  const [count, setCount] = useState(0);
  const handleClap = (clapState) => setCount(clapState.count);
  return (
    <div style={{ width: '100%' }}>
      <MediumClap onClap={handleClap}>
        <MediumClap.Icon />
        <MediumClap.Count />
        <MediumClap.Total />
      </MediumClap>
      <div className={styles.info}>You have clap: {count}</div>
    </div>
  );
};

export default Usage;
