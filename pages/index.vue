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
            <td>{{ `${props.item.firstName} ${props.item.lastName}` }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.city }}</td>
            <td>{{ props.item.updatedAt | dateTime }}</td>
            <td>
              <v-icon small @click="editUser(props.item)">edit</v-icon>
            </td>
            <td>
              <v-icon small @click="deleteUser(props.item.id)">delete</v-icon>
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
          @click.stop="createUserFormDialog = true"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-card>
    </v-layout>
    <v-layout>
      <v-dialog v-model="createUserFormDialog" persistent max-width="50%">
        <user-form-component
          title="Create User"
          submit-button-icon="person_add"
          submit-button-label="Create"
          @submit="createUser"
          @cancel="createUserFormDialog = false"
        />
      </v-dialog>
    </v-layout>
    <v-layout>
      <v-dialog v-model="editUserFormDialog" persistent max-width="50%">
        <user-form-component
          title="Edit User"
          submit-button-icon="save_alt"
          submit-button-label="Update"
          :form="editingUserForm"
          @submit="updateUser"
          @cancel="editUserFormDialog = false"
        />
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { State, Action } from 'vuex-class';
import { UserState } from '@/types/store';
import UserFormComponent from '@/components/UserForm.vue';
import { User, UserForm } from '@/types/models';
import shortid from 'shortid';

interface Header {
  text: string;
  value: string;
}

@Component({ components: { UserFormComponent } })
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

  createUserFormDialog: boolean = false;

  editUserFormDialog: boolean = false;

  editingUser!: User;
  editingUserForm: UserForm = {
    firstName: '',
    lastName: '',
    city: '',
    email: ''
  };

  @State user!: UserState;

  @Action('user/createUser') create!: (user: User) => void;

  @Action('user/updateUser') update!: (user: User) => void;

  @Action('user/deleteUser') deleteUser!: (id: string) => void;

  createUser(userForm: UserForm): void {
    this.create({
      id: shortid.generate(),
      firstName: userForm.firstName,
      lastName: userForm.lastName,
      city: userForm.city,
      email: userForm.email,
      avatar: '',
      updatedAt: new Date()
    });
  }

  editUser(user: User): void {
    this.editingUser = user;
    this.editingUserForm = {
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      email: user.email
    };
    this.editUserFormDialog = true;
  }

  updateUser(userForm: UserForm): void {
    this.update({
      id: this.editingUser.id,
      firstName: userForm.firstName,
      lastName: userForm.lastName,
      city: userForm.city,
      email: userForm.email,
      avatar: this.editingUser.avatar,
      updatedAt: new Date()
    });
  }
}
</script>
