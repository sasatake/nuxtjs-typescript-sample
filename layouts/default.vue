<template>
  <v-app>
    <v-toolbar fixed app color="primary">
      <v-toolbar-side-icon class="white--text" />
      <v-toolbar-title v-text="title" class="white--text" />
      <v-spacer />
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Layout extends Vue {
  title: string = 'User-Manager'
}
</script>
