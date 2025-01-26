<script setup lang="ts">

import {ESuggestionType, type ISuggestData} from "@/features/suggestion/models";
import imgUrl from '../../../assets/img/img.png';

interface IProps {
  suggestion: ISuggestData;
}

const props = defineProps<IProps>();

const alias = '@' + props.suggestion.alias;
</script>

<template>
  <div class="suggestion">
    <img v-if="suggestion.avatar" :src="suggestion.avatar" class="suggestion__avatar" alt="avatar"/>
    <img v-else :src="imgUrl" class="suggestion__avatar" alt="avatar"/>
    <div class="suggestion__info">
      <h2 class="suggestions__name">
        {{ suggestion.name || suggestion.alias }}
      </h2>
      <p v-if="suggestion.type === ESuggestionType.USER" class="suggestion__alias"> {{ alias }} </p>
      <p v-if="suggestion.type === ESuggestionType.COMPANY" class="suggestion__company"> Компания </p>
    </div>
  </div>
</template>

<style scoped>
.suggestion {
  display: flex;
  align-items: flex-start;
  height: 70px;
  gap: 15px;
  cursor: pointer;
  padding: 0 10px;

  &:hover {
    background-color: #242424;
  }

  .suggestion__avatar {
    width: 40px;
    height: 40px;
    margin: auto 0;
  }

  .suggestion__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: auto 0;
    gap: 10px;
    font-size: 14px;
  }
}
</style>