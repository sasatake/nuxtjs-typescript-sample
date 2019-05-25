import { shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Index from '@/pages/index.vue';
import localVue from '../helper/getLocalVue';

describe('Component', () => {
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
      localVue,
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
