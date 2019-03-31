import Vue from 'vue';
import format from 'date-fns/format';
import locale from 'date-fns/locale/ja';

Vue.filter(
  'dateTime',
  (value: Date): string => {
    return format(value, 'YYYY/MM/DD HH:mm:ss', locale);
  }
);
