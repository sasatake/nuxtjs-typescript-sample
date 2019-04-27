<template>
  <v-container>
    <v-layout column justify-center align-center>
      <v-card>
        <v-card-title primary-title>
          <div class="headline">User List</div>
        </v-card-title>
        <v-data-table :headers="headers" :items="user.users" hide-actions>
          <template v-slot:items="props">
            <td>
              <v-avatar size="36px">
                <img v-if="props.item.avatar" :src="props.item.avatar" />
                <v-icon v-else large>account_circle</v-icon>
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
        <v-btn
          absolute
          dark
          fab
          top
          right
          color="pink"
          @click.stop="dialog = true"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-card>
    </v-layout>
    <v-layout>
      <v-dialog v-model="dialog" persistent max-width="50%">
        <create-user-form title="Create User" @cancel="dialog = false" />
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { State, Action } from 'vuex-class';
import { UserState } from '@/types/store';
import CreateUserForm from '~/components/CreateUserForm.vue';

interface Header {
  text: string;
  value: string;
}

interface Form {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
}

@Component({ components: { CreateUserForm } })
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

  dialog: boolean = false;

  @State user!: UserState;

  @Action('user/deleteUser') deleteUser!: (name: string) => void;

  alertUser(name: string): void {
    alert(name);
  }
}
</script>
