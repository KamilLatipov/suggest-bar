<script setup lang="ts">
import SearchBox from "./SearchBox.vue";
import {ref, watch} from "vue";
import SuggestionsBlock from "./SuggestionsBlock.vue";
import {debounce} from "@/shared/helper.ts";
import {getCompaniesRequest} from "@/features/suggestion/api/getCompanies.ts";
import type {ISuggestData} from "@/features/suggestion/models";

const value = ref('');
const suggestions = ref<ISuggestData[]>([]);
const isLoading = ref(false);
const errorMessage = ref('');

const getCompanies = debounce(async (query: string) => {
  isLoading.value = true;

  try {
    suggestions.value = await getCompaniesRequest(query);
  } catch (e) {
    errorMessage.value = e.message;
    suggestions.value = [];
  }

  isLoading.value = false;

})

watch(value, (newQuery: string) => {
  if (newQuery.length >= 3) {
    getCompanies(newQuery);
  } else {
    suggestions.value = [];
  }

  errorMessage.value = '';

})
</script>

<template>
  <div class="suggestion-bar">
    <search-box v-model="value" :isLoading></search-box>
    <p v-if="errorMessage" class="suggestion-bar__error"> {{ errorMessage }}</p>
    <suggestions-block v-if="suggestions?.length" class="suggestions-block" :suggestions></suggestions-block>
  </div>
</template>

<style scoped>
.suggestion-bar {
  position: relative;
  width: 400px;

  .suggestions-block {
    position: absolute;
    top: 110%;
  }

  .suggestion-bar__error {
    margin-top: 10px;
    color: red;
  }
}
</style>
