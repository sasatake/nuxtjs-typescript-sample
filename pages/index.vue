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
          <td>{{ props.item.updatedAt | dateTime }}</td>
          <td>
            <v-icon small @click="alertUser(props.item.name)">
              announcement
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
    },
    {
      text: 'Announcement',
      value: 'announcement'
    }
  ];

  get users(): User[] {
    return this.$store.state.user.users;
  }

  alertUser(name): void {
    alert(name);
  }
}
</script>
