<template>
  <v-layout column justify-center align-center>
    <v-card>
      <v-card-title primary-title>
        <div class="headline">User List</div>
      </v-card-title>

      <v-data-table :headers="headers" :items="users" hide-actions>
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.city }}</td>
          <td>{{ props.item.avatar }}</td>
          <td>{{ props.item.updatedAt }}</td>
        </template>
      </v-data-table>
    </v-card>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

interface Header {
  text: string;
  value: string;
}

interface User {
  name: string;
  city: string;
  email: string;
  avatar: string;
  updatedAt: Date;
}

@Component
export default class Index extends Vue {
  headers: Header[] = [
    {
      text: 'Name',
      value: 'name'
    },
    {
      text: 'Email',
      value: 'mail'
    },
    {
      text: 'City',
      value: 'city'
    },
    {
      text: 'Avatar',
      value: 'avatar'
    },
    {
      text: 'UpdatedAt',
      value: 'updatedAt'
    }
  ];
  users: User[] = [
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
}
</script>
