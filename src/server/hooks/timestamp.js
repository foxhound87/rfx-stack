export function timestamp(name) {
  return (hook, next) => {
    const data = hook.data;
    data[name] = new Date();
    next();
  };
}
