const TARGET = process.env.npm_lifecycle_event;
const ENV = process.env.NODE_ENV;
const TYPE = global.TYPE;

export default ({
  env(env) {
    return (ENV === env);
  },
  type(type) {
    return (TYPE === type);
  },
  script(target, env = null) {
    if (env) return (TARGET === target && ENV === env);
    return (TARGET === target);
  },
});
