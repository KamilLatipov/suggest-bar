<script setup lang="ts">
import {ESuggestionType, type ISuggestData} from "@/features/suggestion/models";

interface IProps {
  suggestions: ISuggestData[];
}

const props = defineProps<IProps>();
</script>

<template>
 <div class="suggestions-block">
   <div v-for="suggestion in suggestions" class="suggestion">
     <img :src="suggestion.avatar" class="suggestion__avatar"/>
     <div class="suggestion__info">
       <h2 class="suggestions__name">
         {{ suggestion.name || suggestion.alias }}
       </h2>
       <p v-if="suggestion.type === ESuggestionType.USER" class="suggestion__alias"> {{ suggestion.alias }}</p>
       <p v-if="suggestion.type === ESuggestionType.COMPANY" class="suggestion__company"> Компания </p>
     </div>
   </div>
 </div>
</template>

<style scoped>
.suggestions-block {
  width: 100%;
  box-sizing: border-box;
  background-color: #3B3B3B;
  border-radius: 20px;
  height: 280px;
  overflow-y: scroll;
  border: 1px solid rgb(133, 133, 133);

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
}
</style>