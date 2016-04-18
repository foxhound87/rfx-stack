import { userSeederDevelopment as userSeeder } from './user';
import { postSeederDevelopment as postSeeder } from './post';

export function handle() {
  const users = userSeeder();

  const posts = postSeeder(50);

  return [
    users,
    posts,
  ];
}
