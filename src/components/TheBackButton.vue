<template>
  <div class="back-btn mb-2 pb-3">
    <router-link :to="path">
      <i class="lni lni-reply me-2 text-dark"></i>
      <span class="text-dark">{{ $t(`${title}`) }}</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },

    path: {
      type: String,
      required: true,
    },
  },
});
</script>
