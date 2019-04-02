<template>
  <v-layout column justify-center align-center>
    <v-card>
      <v-card-title primary-title>
        <div class="headline">User List</div>
      </v-card-title>
      <v-data-table :headers="headers" :items="users" hide-actions>
        <template v-slot:items="props">
          <td>
            <v-avatar size="36px">
              <img :src="props.item.avatar" />
            </v-avatar>
          </td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.city }}</td>
          <td>{{ props.item.updatedAt | dateTime }}</td>
          <td>
            <v-icon small @click="alertUser(props.item.name)">
              edit
            </v-icon>
          </td>
          <td>
            <v-icon small @click="deleteUser(props.item.name)">
              delete
            </v-icon>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { User } from '@/types/models';

interface Header {
  text: string;
  value: string;
}

@Component
export default class Index extends Vue {
  headers: Header[] = [
    {
      text: 'Icon',
      value: 'icon'
    },
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
      text: 'UpdatedAt',
      value: 'updatedAt'
    },
    {
      text: 'Edit',
      value: 'edit'
    },
    {
      text: 'Delete',
      value: 'delete'
    }
  ];

  get users(): User[] {
    return this.$store.state.user.users;
  }

  alertUser(name: string): void {
    alert(name);
  }

  deleteUser(name: string): void {
    this.$store.commit('user/deleteUser', name);
  }
}
</script>
