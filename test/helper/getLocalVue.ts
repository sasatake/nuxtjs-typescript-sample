import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuetify, {
  theme: {
    primary: colors.blue.darken2,
    accent: colors.grey.darken3,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent4
  }
});
localVue.use(Vuelidate);

export default localVue;
