<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  isLoading: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['update:modelValue'])

const searchQuery = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val.toString());
  },
});

const placeholder = 'Введите название компании или пользователя';
</script>

<template>
<div class="search-box">
  <form role="search" class="search-box__form">
    <label for="suggestion">
      <span :style="{color: 'red'}">* </span>
      <span>Пользователь или компания</span>
    </label>
    <input
      id="suggestion"
      name="suggestion"
      type="search"
      class="search-box__input"
      :placeholder="placeholder"
      v-model="searchQuery"
    />
    <div v-if="isLoading" class="spinner"/>
  </form>
</div>
</template>

<style scoped>
.search-box {
  width: 100%;
}

.search-box__form {
  position: relative;
  display: flex;
  gap: 15px;
  align-items: flex-start;
  flex-direction: column;
}

.search-box__input {
  width: 100%;
  height: 40px;
  padding: 0 10px;
}

.spinner {
  position: absolute;
  right: 40px;
  bottom: 13px;
  border: 1px solid white;
  border-bottom-color: transparent;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation: spin 2s linear infinite;
}


@keyframes spin {

  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>