<template>
  <v-app-bar :elevation="2" class="borderHeader" color="blue-grey-darken-4">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>{{ Constants.BRAND }}</v-app-bar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
import { Constants } from "./../constants/appConstants";
</script>
