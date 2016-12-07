import { userSeederDevelopment as userSeeder } from '@/seeds/factories/user';
import { postSeederDevelopment as postSeeder } from '@/seeds/factories/post';

export function handle() {
  return [
    userSeeder(),
    postSeeder(50),
  ];
}
