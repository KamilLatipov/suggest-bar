<script setup lang="ts">
import closeImg from '../../../assets/img/icons8-close.svg?raw';

const props = defineProps({
  tagText: {
    type: String,
    default: '',
  }
})

const emit = defineEmits(['close']);
</script>

<template>
<div class="tag">
  <h1 class="tag__text">{{ tagText }}</h1>
  <div class="tag__close" v-html="closeImg" @click="emit('close', tagText)"/>
</div>
</template>

<style scoped>
.tag {
  height: 22px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 10px;
  background-color: #242424;

  .tag__text {
    font-size: 14px;
  }

  .tag__close {
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
}
</style>