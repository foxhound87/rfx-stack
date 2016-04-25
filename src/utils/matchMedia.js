import matchMediaMock from 'match-media-mock';

const matchMedia = matchMediaMock.create();

let config = null;

export function setMatchMediaConfig(req = null) {
  if (!global.CLIENT && req) {
    config = {
      type: 'screen',
      width: req.params.width,
      height: req.params.height,
    };
  }

  if (global.CLIENT && !req) {
    config = {
      type: 'screen',
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  if (config) matchMedia.setConfig(config);
}

export { matchMedia };
