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
        <v-card>
          <v-form>
            <v-card-title class="headline">Create User</v-card-title>
            <v-card-text>
              <v-container grid-list-xs>
                <v-layout wrap>
                  <v-flex xs6>
                    <v-text-field
                      v-model="form.firstName"
                      label="First Name"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      v-model="form.lastName"
                      label="Last Name"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="form.email"
                      label="Email"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-select
                      v-model="form.city"
                      :items="cities"
                      label="City"
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="dialog = false">
                <v-icon small>clear</v-icon>&thinsp;Cancel
              </v-btn>
              <v-btn color="success" @click="createUser">
                <v-icon small>person_add</v-icon>&thinsp;Create
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { State, Action } from 'vuex-class';
import { UserState } from '@/types/store';

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

  form: Form = {
    firstName: '',
    lastName: '',
    email: '',
    city: ''
  };

  dialog: boolean = false;

  cities: Array<string> = ['Tokyo', 'Osaka', 'New York', 'London'];

  @State user!: UserState;

  @Action('user/deleteUser') deleteUser!: (name: string) => void;

  alertUser(name: string): void {
    alert(name);
  }

  createUser(): void {
    const debugMessage: string = `
      firstName: ${this.form.firstName}
      lastName: ${this.form.lastName}
      email: ${this.form.email}
      city: ${this.form.city}
    `;
    alert(debugMessage);
  }
}
</script>
