<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto">
      <v-row>
        <v-col cols="12" sm="6">
          <list-view
            :headers="headers"
            :columns="get_all_pokemon"
            :title="title_all_pokemon"
            @clicked="move_to_favourite"
            @view="detailed_view"
            :loading="get_Loading"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <list-view
            :headers="headers"
            :columns="get_favourite_pokemon"
            :title="title_fav_pokemon"
            @clicked="move_to_all"
            @view="detailed_view"
            :loading="get_Loading"
          />
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import { useAppStore } from "./../stores/app";
import { Constants } from "./../constants/appConstants";
const appStore = useAppStore();

export default {
  setup() {
    // call graphql API for list
    if (appStore.pokemonData.length === 0) {
      appStore.getPokemonList();
    }
  },
  computed: {
    get_all_pokemon() {
      // Get rows of All Pokemon List Table with key
      return [...appStore.pokemonData].map((data, index) => {
        return {
          keyValue: Constants.ALL_POKEMON + data.name + "_" + index,
          name: data.name,
          cost: data.cost,
          __typename: data.__typename,
        };
      });
    },
    get_favourite_pokemon() {
      // Get rows of Favourite Pokemon List Table with key
      return [...appStore.favouriteData].map((data, index) => {
        return {
          keyValue: Constants.FAV_POKEMON + data.name + "_" + index,
          name: data.name,
          cost: data.cost,
          __typename: data.__typename,
        };
      });
    },
    get_Loading() {
      // get loder value from state
      return appStore.loading;
    },
  },
  data() {
    return {
      title_all_pokemon: Constants.ALL_POKEMONS,
      title_fav_pokemon: Constants.FAV_POKEMONS,
      headers: [
        {
          title: "keyValue",
          key: "keyValue",
          value: "keyValue",
          align: " d-none",
        },

        {
          title: "Name",
          sortable: true,
          align: "start",
          key: "name",
          value: "name",
        },
        {
          title: "Cost",
          sortable: true,
          align: "start",
          key: "cost",
          value: "cost",
        },
        {
          title: "Action",
          sortable: false,
          align: "start",
          key: "Action",
        },
      ],
    };
  },
  methods: {
    move_to_favourite(row) {
      // Move pokemon from All List to Favourite
      appStore.move_to_favourite(row);
    },
    move_to_all(row) {
      // Move pokemon from Favourite List to All
      appStore.move_to_all(row);
    },
    detailed_view(row) {
      // save selected pokemone to view full details state
      appStore.setDetailedView(row);
    },
  },
};
</script>
