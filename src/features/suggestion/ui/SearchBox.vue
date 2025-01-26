<script setup lang="ts">
import {computed} from "vue";
import Tag from "@/features/suggestion/ui/Tag.vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: Array,
    default: [],
}
})

const emit = defineEmits(['update:modelValue', 'focus', 'closeTag'])

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
    <div class="search-box__wrapper">
      <tag v-for="tag in tags" class="search-box__tag" :tagText="tag" @close="(alias) => emit('closeTag', alias)"/>
      <input
          id="suggestion"
          name="suggestion"
          type="search"
          class="search-box__input"
          :placeholder="tag ? '' : placeholder"
          v-model="searchQuery"
          @focus="emit('focus')"
      />
    </div>
    <div v-if="isLoading" class="spinner"/>
  </form>
</div>
</template>

<style scoped>
.search-box {
  width: 100%;

  .search-box__form {
    position: relative;
    display: flex;
    gap: 15px;
    align-items: flex-start;
    flex-direction: column;
  }

  .search-box__wrapper {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    background-color: #3B3B3B;
    border: 1px solid rgb(133, 133, 133);
  }

  .search-box__input {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    -webkit-appearance: none;
    border: none;
    background-color: #3B3B3B;

    &:focus{
      outline: none;
    }
  }

  .search-box__tag {
    margin-left: 3px;
  }
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