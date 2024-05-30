<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto">
      <v-card
        class="mx-auto border_grey"
        :elevation="2"
        :title="title"
        max-width="500"
      >
        <v-card-text class="pt-4 borderContent" :elevation="2">
          <v-row v-if="!data">
            <v-col cols="12">{{ reselect_message }}</v-col>
          </v-row>
          <v-row v-if="data">
            <v-col cols="12">
              <v-row>
                <v-col cols="3">{{ name }}</v-col>
                <v-col cols="9">: {{ data?.name }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="3">{{ cost }}</v-col>
                <v-col cols="9">: {{ data?.cost }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="3">{{ type }}</v-col>
                <v-col cols="9">: {{ data?.__typename }}</v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="bg-surface-bright">
          <div class="d-flex align-end flex-column width100">
            <v-btn
              class="backButton"
              :text="backButton"
              :to="{ path: '/' }"
            ></v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script>
import { useAppStore } from "./../stores/app";
import { Constants } from "./../constants/appConstants";
const appStore = useAppStore();
export default {
  data() {
    return {
      data: appStore.detailedView,
      title: Constants.DETAILS_VIEW_TITLE,
      reselect_message: Constants.RESELECT_MSG,
      name: Constants.NAME,
      cost: Constants.COST,
      type: Constants.TYPE,
      backButton: Constants.BACK_BUTTON,
    };
  },
};
</script>
