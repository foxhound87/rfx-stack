import { postSeederDevelopment as postSeeder } from './post';

export function handle() {
  return postSeeder(50);
}
