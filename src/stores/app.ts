// Utilities
import { defineStore } from 'pinia'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { watch } from 'vue'
export const useAppStore = defineStore('app', {
  state: () =>({
      pokemonData: [], // state to store pokemon list
      favouriteData: [],
      detailedView: null,
      loading: false,
  }),

  actions : {
    // get data from graph ql API
    
    getPokemonList(){
      this.setLoading(true);
      const {result} = useQuery(
        gql`query getItems{pokemon_v2_item{name,cost}}`
      )
      watch(result, value => {
        const data = this.removeDuplicates(value.pokemon_v2_item,'name');
        this.setPokemonList(data);
        this.setFavouriteList([]);
        this.setLoading(false);
      })
    },
    removeDuplicates(arr,key) {
      return arr.reduce((unique, item) => {
          // Check if the current object has the specified key
            if(Object.prototype.hasOwnProperty.call(item, key)){
              // Check if there is no existing object with the same key value
              if (
                  !unique.some(
                      (obj) =>
                          obj[key] === item[key]
                  )
              ) {
                  unique.push(item);
              }
          } else {
              // If the key doesn't exist in the current object, always include it in the unique array
              unique.push(item);
          }
          return unique;
      }, []);
  },
    setLoading(value) {
      this.loading = value;
    },
    // set data in state
    setPokemonList(data){
      this.pokemonData = data;
    },
    // set data in state
    setFavouriteList(data){
      this.favouriteData = data;
    },
     // set data in state
    setDetailedView(data){
      this.detailedView = data;
    },
    move_to_favourite(row) {
      // remove data from all records state
      const record = this.pokemonData;
      const newArray = record.filter((data) => data.name != row.name);
      this.setPokemonList([...newArray]);
      // move data from all to fav records state
      this.setFavouriteList([...this.favouriteData, row]);
    },
    move_to_all(row) {
      // remove data from fav records state
      const record = this.favouriteData;
      const newArray = record.filter((data) => data.name != row.name);
      this.setFavouriteList([...newArray]);
      // move data to all records state
      this.setPokemonList([...this.pokemonData, row]);
    },
  }
})
