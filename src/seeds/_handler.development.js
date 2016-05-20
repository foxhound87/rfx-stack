import { userSeederDevelopment as userSeeder } from './user';
import { postSeederDevelopment as postSeeder } from './post';

export function handle() {
  return [
    userSeeder(),
    postSeeder(50),
  ];
}
