<script setup lang="ts">
import {type ISuggestData} from "@/features/suggestion/models";
import SuggestionRow from "@/features/suggestion/ui/SuggestionRow.vue";

interface IProps {
  suggestions: ISuggestData[];
}

const props = defineProps<IProps>();

const emit = defineEmits(['choseSuggestion'])

const choseSuggestion = (alias: string) => {
  emit('choseSuggestion', '@' + alias)
}
</script>

<template>
 <div class="suggestions-block">
   <suggestion-row v-for="suggestion in suggestions" :suggestion="suggestion" @click="choseSuggestion(suggestion.alias)"/>
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
}
</style>