import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { Store, StoreOptions } from 'vuex';
import { User } from '@/types/models';
import { UserState } from '@/types/store';
import { cloneDeep } from 'lodash';
import { state, mutations, actions } from '@/store/user';

const localVue = createLocalVue();
localVue.use(Vuex);

const userStore: StoreOptions<UserState> = {
  state,
  mutations,
  actions
};

describe('store/actions', () => {
  let store: Store<UserState>;

  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(userStore));
  });

  describe('createUser', () => {
    test('user is added in State', () => {
      const userId = '1';
      const user: User = {
        id: userId,
        firstName: 'firstName01',
        lastName: 'lastName01',
        city: 'Tokyo',
        email: 'test@email.com',
        avatar: 'test.png',
        updatedAt: new Date()
      };
      store.dispatch('createUser', user);
      expect(store.state.users.find(user => user.id == userId)).toEqual(user);
    });
  });
});
