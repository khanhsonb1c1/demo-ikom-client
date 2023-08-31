<template>
  <div class="pagination d-flex justify-content-between">
    <button class="btn btn-outline-primary" :disabled="paginate.page == 1" @click="changePage(paginate.page - 1)">
      <i class="lni lni-chevron-left me-1"></i>{{ $t("Previous") }}
    </button>
    <button class="btn btn-outline-primary" :disabled="!paginate.is_allow_next" @click="changePage(paginate.page + 1)">
      {{ $t("Next") }}<i class="lni lni-chevron-right ms-1"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    paginate: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changePage(page: number) {
      this.$emit("change-page", page);
    },
  },
});
</script>
