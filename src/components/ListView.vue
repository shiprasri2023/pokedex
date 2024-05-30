<template>
  <v-card :title="title" class="border_grey" :elevation="2">
    <v-divider></v-divider>
    <v-card-text class="pa-0 borderContent" :elevation="2">
      <div class="d-flex align-end flex-column pr-2">
        <v-text-field
          v-model="search"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
          class="mt-2 mb-2 width120"
        ></v-text-field>
      </div>

      <v-data-table
        :headers="headers"
        :items="columns"
        height="300"
        item-value="name"
        item-key="keyValue"
        fixed-header
        :loading="loading"
        v-model:search="search"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.name }}</td>
            <td>{{ item.cost }}</td>
            <td>
              <template v-if="title === fav_pokemon">
                <tooltip
                  :text="remove_fav"
                  :iconDetails="'mdi-heart'"
                  @clicked="$emit('clicked', item)"
                >
                </tooltip>
              </template>

              <template v-if="title === all_pokemons">
                <tooltip
                  :text="add_fav"
                  :iconDetails="'mdi-heart-outline'"
                  @clicked="$emit('clicked', item)"
                >
                </tooltip>
              </template>

              <v-tooltip :text="view_details">
                <template v-slot:activator="{ props }">
                  <v-btn
                    icon
                    id="no-background-hover"
                    rounded="xs"
                    size="x-small"
                    :to="{ path: '/detailedview' }"
                    @click="$emit('view', item)"
                    v-bind="props"
                  >
                    <v-icon
                      size="medium"
                      icon="mdi-information-outline"
                    ></v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
import { Constants } from "./../constants/appConstants";
export default {
  props: {
    headers: {
      type: Object,
      default(rawProps) {
        return { message: rawProps };
      },
    },
    columns: {
      type: Object,
      default(rawProps) {
        return { message: rawProps };
      },
    },
    title: String,
    loading: Boolean,
  },
  data() {
    return {
      search: "",
      remove_fav: Constants.REMOVE_FROM_FAV,
      add_fav: Constants.ADD_FAV,
      view_details: Constants.VIEW_DETAILS,
      fav_pokemon: Constants.FAV_POKEMONS,
      all_pokemons: Constants.ALL_POKEMONS,
    };
  },
};
</script>
