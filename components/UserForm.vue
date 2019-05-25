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
                  :error-messages="getErrors('firstName')"
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
                  :error-messages="getErrors('lastName')"
                  label="Last Name"
                  required
                  @input="$v.lastName.$touch()"
                  @blur="$v.lastName.$touch()"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="email"
                  :error-messages="getErrors('email')"
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
                  :error-messages="getErrors('city')"
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
            <v-icon small>{{ submitButtonIcon }}</v-icon>
            &thinsp;{{ submitButtonLabel }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import { UserForm } from '@/types/models';

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

  @Prop()
  form!: UserForm;

  @Prop()
  submitButtonLabel!: string;

  @Prop()
  submitButtonIcon!: string;

  @Watch('form')
  setUserForEdit(form: UserForm): void {
    this.firstName = form.firstName;
    this.lastName = form.lastName;
    this.email = form.email;
    this.city = form.city;
  }

  cities: Array<string> = ['Tokyo', 'Osaka', 'New York', 'London'];

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  city: string | null = null;

  errorMessages: Object = {
    required: this.formatErrorMessage`${'field'} is required.`,
    maxLength: this.formatErrorMessage`${'field'} must be ${'max'} characters.`,
    email: this.formatErrorMessage`${'field'} must be valid email format.`
  };

  formatErrorMessage(
    strings: TemplateStringsArray,
    ...keys: string[]
  ): Function {
    return (...values) => {
      const dict = values[values.length - 1] || {};
      const result = [strings[0]];
      keys.forEach((key, i) => {
        const value = Number.isInteger(parseInt(key)) ? values[key] : dict[key];
        result.push(value, strings[i + 1]);
      });
      return result.join('');
    };
  }

  getErrors(field: string): Array<string> {
    const errors: Array<string> = [];
    const validation = this.$v[field];

    if (!validation || !validation.$dirty) return errors;

    Object.keys(validation.$params).forEach(param => {
      if (!validation[param]) {
        const errorMessageParams: Object = {
          field
        };

        if (validation.$params[param].max) {
          Object.assign(errorMessageParams, {
            max: validation.$params[param].max
          });
        }

        errors.push(this.errorMessages[param](errorMessageParams));
      }
    });

    return errors;
  }

  submit(): void {
    this.$v.$touch();

    if (!this.$v.$invalid) {
      const validUserForm: UserForm = {
        firstName: this.firstName,
        lastName: this.lastName,
        city: this.city ? this.city : '',
        email: this.email
      };
      this.$emit('submit', validUserForm);
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
