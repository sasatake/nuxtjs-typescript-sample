import { MutationTree, ActionTree, ActionContext } from 'vuex';
import shortid from 'shortid';
import { User } from '@/types/models';
import { UserState } from '@/types/store';

const users: User[] = [
  {
    id: shortid.generate(),
    firstName: 'test01',
    lastName: 'test01',
    city: 'Tokyo',
    email: 'test01@mail.co.jp',
    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    updatedAt: new Date()
  },
  {
    id: shortid.generate(),
    firstName: 'test02',
    lastName: 'test02',
    city: 'New York',
    email: 'test02@mail.co.jp',
    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    updatedAt: new Date()
  },
  {
    id: shortid.generate(),
    firstName: 'test03',
    lastName: 'test03',
    city: 'London',
    email: 'test03@mail.co.jp',
    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    updatedAt: new Date()
  }
];

export const state = (): UserState => ({ users: users });

export const mutations = <MutationTree<UserState>>{
  deleteUser(state: UserState, id: string): void {
    const index: number = state.users.findIndex(
      (u: User): boolean => u.id === id
    );
    state.users.splice(index, 1);
  },
  createUser(state: UserState, user: User): void {
    state.users.push(user);
  },
  updateUser(state: UserState, user: User): void {
    const index: number = state.users.findIndex(
      (u: User): boolean => u.id === user.id
    );
    state.users.splice(index, 1, user);
  }
};

export const actions = <ActionTree<UserState, any>>{
  deleteUser(store: ActionContext<UserState, any>, id: string) {
    store.commit('deleteUser', id);
  },
  createUser(store: ActionContext<UserState, any>, user: User) {
    store.commit('createUser', user);
  },
  updateUser(store: ActionContext<UserState, any>, user: User) {
    store.commit('updateUser', user);
  }
};
