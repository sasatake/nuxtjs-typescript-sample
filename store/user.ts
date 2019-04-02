import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';
import { User } from '@/types/models';

interface UserState {
  users: User[];
}

const users: User[] = [
  {
    name: 'test01',
    city: 'Tokyo',
    email: 'test01@mail.co.jp',
    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    updatedAt: new Date()
  },
  {
    name: 'test02',
    city: 'New York',
    email: 'test02@mail.co.jp',
    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    updatedAt: new Date()
  },
  {
    name: 'test03',
    city: 'London',
    email: 'test03@mail.co.jp',
    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    updatedAt: new Date()
  }
];

export const state = (): UserState => ({ users: users });

export const mutations = <MutationTree<UserState>>{
  deleteUser(state: UserState, userName: string): void {
    const index: number = state.users.findIndex(
      (u: User): boolean => u.name == userName
    );
    state.users.splice(index, 1);
  }
};
