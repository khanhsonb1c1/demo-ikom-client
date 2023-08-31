<template>
  <div class="d-flex align-items-center">
    <label class="text-dark me-2">{{ $t("Language") }}:</label>
    <select @change="switchLanguage()" v-model="selected" class="form-control">
      <option v-for="locale in locales" :key="locale.id" :value="locale.id">
        {{ $t(locale.name) }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      selected: "jp" as string,
      locales: [
        {
          id: "jp",
          name: "Japan",
        },
        {
          id: "vi",
          name: "Vietnam",
        },
      ],
    };
  },
  methods: {
    switchLanguage() {
      this.$emit("update:lang", this.selected);
    },
  },
});
</script>
