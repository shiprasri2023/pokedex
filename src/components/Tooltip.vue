<template>
  <v-tooltip :text="text">
    <template v-slot:activator="{ props }">
      <v-btn
        icon
        rounded="xs"
        size="x-small"
        id="no-background-hover"
        v-bind="props"
      >
        <v-icon id="no-background-hover" :icon="iconDetails" size="medium" @click="$emit('clicked')" />
      </v-btn>
    </template>
  </v-tooltip>
</template>
<script>
export default {
  props: {
    text: String,
    iconDetails: String,
  },
};
</script>

<style lang="scss">
#no-background-hover::before {
  background-color: transparent !important;
}
.v-btn--variant-elevated {
  box-shadow: none !important;
}
</style>
