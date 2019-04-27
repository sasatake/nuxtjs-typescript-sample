<template>
  <v-layout>
    <v-card>
      <v-form>
        <v-card-title class="headline">{{ title }}</v-card-title>
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
          <v-btn @click="cancel">
            <v-icon small>clear</v-icon>&thinsp;Cancel
          </v-btn>
          <v-btn color="success" @click="submit">
            <v-icon small>person_add</v-icon>&thinsp;Create
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import { Action } from 'vuex-class';
import { User } from '@/types/models';

@Component({
  validations: {
    firstName: { required, maxLength: maxLength(10) },
    lastName: { required, maxLength: maxLength(10) },
    email: { required, email },
    city: { required }
  }
})
export default class UserFormDialog extends Vue {
  @Prop()
  title!: string;

  cities: Array<string> = ['Tokyo', 'Osaka', 'New York', 'London'];

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  city: string | null = null;

  @Action('user/createUser') createUser!: (user: User) => void;

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
      this.cancel();
    }
  }

  cancel(): void {
    this.$v.$reset();
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.city = null;
    this.$emit('cancel');
  }
}
</script>
