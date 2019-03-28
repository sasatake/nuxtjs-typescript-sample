<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">User List</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-tile v-for="item in items" :key="item.title" avatar>
              <v-list-tile-avatar>
                <img :src="item.avatar" />
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

interface Items {
  title: string;
  avatar: string;
}

@Component
export default class Index extends Vue {
  items: Items[] = [
    {
      title: 'test01',
      avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
    },
    {
      title: 'test02',
      avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
    },
    {
      title: 'test03',
      avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
    }
  ];
}
</script>
