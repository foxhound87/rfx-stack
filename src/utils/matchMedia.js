import matchMediaMock from 'match-media-mock';

const matchMedia = matchMediaMock.create();

let config = null;

const setMatchMediaConfig = (req = null) => {
  const isClient = typeof window !== 'undefined';

  if (!isClient && req) {
    config = {
      type: 'screen',
      width: req.params.width,
      height: req.params.height,
    };
  }

  if (isClient && !req) {
    config = {
      type: 'screen',
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  if (config) matchMedia.setConfig(config);
};

export { matchMedia, setMatchMediaConfig };
