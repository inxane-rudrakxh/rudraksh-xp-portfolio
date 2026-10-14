<script setup>
import { computed } from 'vue'
import { useLocaleStore } from '@/stores/localeStore'

const props = defineProps({ project: { type: Object, required: true } })
const localeStore = useLocaleStore()
const localized = (value) => value?.[localeStore.currentLocale] || value?.en || ''
const summary = computed(() => localized(props.project.summary))
const highlights = computed(() => localized(props.project.highlights))
</script>

<template>
  <article class="text-xs md:text-header-window">
    <div class="flex flex-wrap gap-2 mb-5">
      <span v-for="item in project.stack" :key="item" class="border border-blue-300 bg-blue-50 px-2 py-1 rounded-sm font-bold">{{ item }}</span>
    </div>
    <h3 class="mb-2 font-bold">About this project</h3>
    <p class="leading-relaxed">{{ summary }}</p>
    <h3 class="mt-5 mb-2 font-bold">Highlights</h3>
    <ul class="list-disc ml-4 space-y-1">
      <li v-for="highlight in highlights" :key="highlight">{{ highlight }}</li>
    </ul>
    <div class="flex flex-wrap gap-3 mt-6">
      <a href="https://github.com/inxane-rudrakxh" target="_blank" rel="noopener" class="border border-twilight-blue bg-button-submit rounded-sm px-3 py-1 hover:shadow-button-submit-hover">GitHub profile</a>
      <a :href="project.website" target="_blank" rel="noopener" class="border border-twilight-blue bg-white rounded-sm px-3 py-1 hover:shadow-button-submit-hover">Visit project</a>
    </div>
  </article>
</template>
