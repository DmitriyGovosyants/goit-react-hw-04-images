export const theme = Object.freeze({
  colors: {
    textColorMain: '#212121',
    textColorSecond: '#173d6e',

    mainBgc: '#fff',
    secondBgc: '#e9bebe',

    btnBgc: '#a16f6f',
    btnBgcAccent: '#8b5353',
  },
  fontSizes: {
    titleBig: '3em',
    title: '2em',
    small: '14px',
    medium: '18px',
    // big: '26px',
  },
  spacing: value => `${4 * value}px`,
  // animation: {
  //   cubicBezier: '250ms cubic-bezier(0.7, 0.98, 0.86, 0.98)',
  // },
  shadow: {
    formFocusShadow: '1px 1px 5px black',
    textTitleBig: `1px 1px 1px #919191,
      1px 2px 1px #919191,
      1px 3px 1px #919191,
      1px 4px 1px #919191,
      1px 5px 1px #919191,
      1px 6px 1px #919191,
      1px 7px 1px #919191,
  1px 10px 3px rgba(16,16,16,0.4),
  1px 25px 35px rgba(16,16,16,0.2),
  1px 30px 60px rgba(16,16,16,0.4)`,
    textTitle: `1px 1px 1px #919191,
      1px 2px 1px #919191,
      1px 3px 1px #919191,
      1px 4px 1px #919191,
  1px 10px 15px rgba(16,16,16,0.2),
  1px 20px 40px rgba(16,16,16,0.4)`,
  },
});
