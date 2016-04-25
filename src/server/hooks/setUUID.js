import uuid from 'node-uuid';

export function setUUID() {
  return (hook, next) => {
    const data = hook.data;
    data.uuid = uuid.v4();
    next();
  };
}
