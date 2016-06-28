import { userSeederDevelopment as userSeeder } from '../factories/user';
import { postSeederDevelopment as postSeeder } from '../factories/post';

export function handle() {
  return [
    userSeeder(),
    postSeeder(50),
  ];
}
