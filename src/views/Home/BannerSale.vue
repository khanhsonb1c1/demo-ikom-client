<template>
  <section class="banner section">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12" v-for="(item, index) in banners" :key="index">
          <div class="single-banner custom-responsive-margin position-relative">
            <img :src="item" alt="" class="w-100 h-100" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import type IkomContent from "@/types/IkomContent";
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    ikom_content: {
      type: Object as () => IkomContent,
      default: {} as IkomContent,
    },
  },
  setup(props) {
    const banners = ref(["https://placehold.co/620x340", "https://placehold.co/620x340"]);
    watch(
      props,
      () => {
        banners.value = props.ikom_content.banner_sale;
      },
      { immediate: true }
    );
    return {
      banners,
    };
  },
});
</script>
