import { shallowMount } from '@vue/test-utils';
import UserForm from '@/components/UserForm.vue';
import localVue from '../helper/getLocalVue';

describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(UserForm, { localVue });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
