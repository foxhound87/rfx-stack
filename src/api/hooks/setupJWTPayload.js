export function setupJWTPayload() {
  return (hook) => {
    // eslint-disable-next-line
    hook.data.payload = {
      userId: hook.params.user.id,
    };

    return Promise.resolve(hook);
  };
}
