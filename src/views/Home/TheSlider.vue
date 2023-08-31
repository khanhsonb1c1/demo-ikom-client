<template>
  <section class="hero-area mt-4">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-12 custom-padding-right">
          <div class="slider-head position-relative">
            <div class="hero-slider">
              <div v-for="(item, index) in banner" :key="index" class="single-slider">
                <img :src="item" class="aspect-ratio-8-5 w-100 h-100 rounded" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-12">
          <div class="row">
            <div class="col-lg-12 col-md-6 col-12 md-custom-padding">
              <div class="hero-small-banner position-relative">
                <img :src="ikom_content.banner_additional_first" class="w-100 h-100 aspect-ratio-37-25 rounded" />
              </div>
            </div>
            <div class="col-lg-12 col-md-6 col-12">
              <div class="hero-small-banner style2">
                <div class="hero-small-banner position-relative">
                  <img :src="ikom_content.banner_additional_seccond" class="w-100 h-100 aspect-ratio-37-25 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import type Banner from "@/types/IkomContent";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    ikom_content: {
      type: Object as () => Banner,
      required: true,
    },
  },
  data() {
    return {
      banner: ["https://placehold.co/800x500"] as string[],
    };
  },

  watch: {
    ikom_content: {
      immediate: true,
      handler() {
        this.banner = this.ikom_content.banner_main;
        const plugin = document.createElement("script");
        plugin.setAttribute("src", "/assets/js/slider.js");
        plugin.async = true;
        document.head.appendChild(plugin);
      },
    },
  },
});
</script>
@/types/IkomContent
