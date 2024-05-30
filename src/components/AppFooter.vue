<template>
  <v-footer height="40" app :elevation="2" class="borderFooter">
    <div
      class="text-caption text-disabled"
      style="text-align: center; width: 100%"
    >
      &copy; {{ Constants.FOOTER_YEAR }}{{ new Date().getFullYear() }}
      <span class="d-none d-sm-inline-block">{{ Constants.FOOTER }}</span>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
import { Constants } from "./../constants/appConstants";
</script>
