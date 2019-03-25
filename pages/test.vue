<template>
  <v-card>{{ message }}</v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Test extends Vue {
  message: string = 'hello'
}
</script>
