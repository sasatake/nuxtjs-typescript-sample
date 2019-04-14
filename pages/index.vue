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
        <v-card>
          <v-form>
            <v-card-title class="headline">Create User</v-card-title>
            <v-card-text>
              <v-container grid-list-xs>
                <v-layout wrap>
                  <v-flex xs6>
                    <v-text-field
                      v-model="firstName"
                      :counter="10"
                      :error-messages="getFirstNameErrors"
                      label="First Name"
                      required
                      @input="$v.firstName.$touch()"
                      @blur="$v.firstName.$touch()"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      v-model="lastName"
                      :counter="10"
                      :error-messages="getLastNameErrors"
                      label="Last Name"
                      required
                      @input="$v.lastName.$touch()"
                      @blur="$v.lastName.$touch()"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="email"
                      :error-messages="getEmailErrors"
                      label="Email"
                      required
                      @input="$v.email.$touch()"
                      @blur="$v.email.$touch()"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-select
                      v-model="city"
                      :items="cities"
                      :error-messages="getCityErrors"
                      label="City"
                      required
                      @input="$v.city.$touch()"
                      @blur="$v.city.$touch()"
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="clear">
                <v-icon small>clear</v-icon>&thinsp;Cancel
              </v-btn>
              <v-btn color="success" @click="submit">
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
import { required, maxLength, email } from 'vuelidate/lib/validators';
import { User } from '@/types/models';

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

@Component({
  validations: {
    firstName: { required, maxLength: maxLength(10) },
    lastName: { required, maxLength: maxLength(10) },
    email: { required, email },
    city: { required }
  }
})
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

  cities: Array<string> = ['Tokyo', 'Osaka', 'New York', 'London'];
  dialog: boolean = false;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  city: string | null = null;

  get getFirstNameErrors(): Array<string> {
    const errors: Array<string> = [];
    const validation = this.$v.firstName;

    if (validation) {
      if (!validation.$dirty) return errors;
      !validation['maxLength'] &&
        errors.push('FirstName must be 10 characters.');
      !validation['required'] && errors.push('FirstName is required.');
    }

    return errors;
  }

  get getLastNameErrors(): Array<string> {
    const errors: Array<string> = [];
    const validation = this.$v.lastName;

    if (validation) {
      if (!validation.$dirty) return errors;
      !validation['maxLength'] &&
        errors.push('LastName must be 10 characters.');
      !validation['required'] && errors.push('LastName is required.');
    }

    return errors;
  }

  get getEmailErrors(): Array<string> {
    const errors: Array<string> = [];
    const validation = this.$v.email;

    if (validation) {
      if (!validation.$dirty) return errors;
      !validation['email'] && errors.push('email must be valid format.');
      !validation['required'] && errors.push('email is required.');
    }

    return errors;
  }

  get getCityErrors(): Array<string> {
    const errors: Array<string> = [];
    const validation = this.$v.city;

    if (validation) {
      if (!validation.$dirty) return errors;
      !validation['required'] && errors.push('city is required.');
    }

    return errors;
  }

  @State user!: UserState;

  @Action('user/deleteUser') deleteUser!: (name: string) => void;

  @Action('user/createUser') createUser!: (user: User) => void;

  alertUser(name: string): void {
    alert(name);
  }

  submit(): void {
    this.$v.$touch();

    if (!this.$v.$invalid) {
      const newUser: User = {
        name: `${this.firstName} ${this.lastName}`,
        city: this.city ? this.city : '',
        email: this.email,
        avatar: '',
        updatedAt: new Date()
      };
      this.createUser(newUser);
      this.clear();
    }
  }

  clear(): void {
    this.$v.$reset();
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.city = null;
    this.dialog = false;
  }
}
</script>
