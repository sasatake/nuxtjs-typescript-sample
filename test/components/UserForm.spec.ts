import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import UserForm from '@/components/UserForm.vue';
import setPlugin from '../helper/setPlugin';

describe('Component', () => {
  beforeAll(() => {
    setPlugin();
  });

  test('is a Vue instance', () => {
    const wrapper = shallowMount(UserForm);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
