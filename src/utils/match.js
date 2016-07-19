export default ({
  env(env) {
    const ENV = process.env.NODE_ENV;
    return (ENV === env);
  },
  type(type) {
    const TYPE = global.TYPE;
    return (TYPE === type);
  },
  script(target, env = null) {
    const ENV = process.env.NODE_ENV;
    const TARGET = process.env.npm_lifecycle_event;
    if (env) return (TARGET === target && ENV === env);
    return (TARGET === target);
  },
});
