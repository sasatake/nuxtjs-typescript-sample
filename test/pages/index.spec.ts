import { shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Index from '@/pages/index.vue';
import setPlugin from '../helper/setPlugin';

describe('Component', () => {
  beforeAll(() => {
    setPlugin();
  });

  test('is a Vue instance', () => {
    const users = [
      {
        id: 1,
        firstName: 'test01',
        lastName: 'test01',
        city: 'Tokyo',
        email: 'test01@mail.co.jp',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        updatedAt: new Date()
      }
    ];
    const wrapper = shallowMount(Index, {
      store: new Vuex.Store({
        modules: {
          user: {
            state: () => ({
              users: users
            })
          }
        }
      })
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
