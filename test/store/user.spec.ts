import { createLocalVue } from '@vue/test-utils';
import Vuex, { Store, StoreOptions } from 'vuex';
import { User } from '@/types/models';
import { UserState } from '@/types/store';
import { cloneDeep } from 'lodash';
import { state, mutations, actions } from '@/store/user';

describe('store/actions', () => {
  const userId: string = '1';
  const user: User = {
    id: userId,
    firstName: 'firstName01',
    lastName: 'lastName01',
    city: 'Tokyo',
    email: 'test@email.com',
    avatar: 'test.png',
    updatedAt: new Date()
  };

  const editedUser: User = {
    id: userId,
    firstName: 'firstName01-edit',
    lastName: 'lastName01-edit',
    city: 'New York',
    email: 'test-edit@email.com',
    avatar: 'test-edit.png',
    updatedAt: new Date()
  };

  let store: Store<UserState>;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const userStore: StoreOptions<UserState> = {
      state,
      mutations,
      actions
    };
    store = new Vuex.Store(cloneDeep(userStore));
  });

  describe('createUser', () => {
    test('user is added to State', async () => {
      expect(
        store.state.users.find(user => user.id === userId)
      ).toBeUndefined();
      await store.dispatch('createUser', user);
      expect(store.state.users.find(user => user.id === userId)).toEqual(user);
    });
  });

  describe('updateUser', () => {
    test('user is updated', async () => {
      await store.dispatch('updateUser', editedUser);
      expect(store.state.users.find(user => user.id === userId)).toEqual(
        editedUser
      );
    });
  });

  describe('deleteUser', () => {
    test('user is deleted', async () => {
      await store.dispatch('deleteUser', userId);
      expect(
        store.state.users.find(user => user.id === userId)
      ).toBeUndefined();
    });
  });
});
