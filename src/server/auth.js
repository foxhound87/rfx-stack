import authentication from 'feathers-authentication';

// import { Strategy as FacebookStrategy } from 'passport-facebook';
// import FacebookTokenStrategy from 'passport-facebook-token';
// import { Strategy as GithubStrategy } from 'passport-github';
// import GithubTokenStrategy from 'passport-github-token';

export default function () {
  const app = this;

  const config = app.get('auth');

  // config.facebook.strategy = FacebookStrategy;
  // config.facebook.tokenStrategy = FacebookTokenStrategy;
  // config.github.strategy = GithubStrategy;
  // config.github.tokenStrategy = GithubTokenStrategy;

  app.set('auth', config);
  app.configure(authentication(config));
}
