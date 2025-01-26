<script setup lang="ts">
import SearchBox from "./SearchBox.vue";
import {computed, ref, watch} from "vue";
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

    if (suggestions.value.length === 0) {
      errorMessage.value ='Не нашли совпадений';
    }
  } catch (e) {
    errorMessage.value = e.message;
    suggestions.value = [];
  }

  isLoading.value = false;

})

const isSearchBoxFocus = ref(false);

const closeSuggestionsBlock = () => {
  isSearchBoxFocus.value = false;
}

const onFocus = () => {
  isSearchBoxFocus.value = true;
  errorMessage.value = '';
}

const isSuggestionsBlockShown = computed(() => {
  return isSearchBoxFocus.value && suggestions.value?.length;
})

const tags = ref<string[]>([]);

const addTag = (alias: string) => {
  value.value = '';
  tags.value = [...tags.value, alias];
}

const closeTag = (alias: string) => {
  const index = tags.value.indexOf(alias);
  tags.value.splice(index, 1);
}

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
    <search-box
        v-model="value"
        :isLoading
        :tags
        v-click-outside="closeSuggestionsBlock"
        @focus="onFocus"
        @closeTag="closeTag"
    />
    <p v-if="errorMessage" class="suggestion-bar__error"> {{ errorMessage }}</p>
    <suggestions-block
        v-if="isSuggestionsBlockShown"
        class="suggestions-block"
        :suggestions
        @choseSuggestion="addTag"
    />
  </div>
</template>

<style scoped>
.suggestion-bar {
  position: relative;
  width: 600px;

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
