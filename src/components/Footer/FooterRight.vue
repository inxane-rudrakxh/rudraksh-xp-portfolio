<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useVolumeStore } from '@/stores/volumeStore'
import CurrentTime from './CurrentTime.vue'
import NotificationModal from '@/components/Modals/NotificationModal.vue'
import MusicVolumeModal from '@/components/Modals/MusicVolumeModal.vue'

const volumeStore = useVolumeStore()
const volume = computed(() => volumeStore.volume)
// Initialize refs
const isFullScreen = ref(false)
const originalTitle = ref('Enter full screen')
const isVolumeSettingsDisplayed = ref(false)
const musicModalRef = ref(null)

const enterFullScreen = () => {
  if (isFullScreen.value) {
    // Exit full-screen mode
    document.exitFullscreen()
    originalTitle.value = 'Enter full screen'
    isFullScreen.value = false
  } else {
    // Enter full-screen mode only if the device is not a mobile device
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen()
    }
    originalTitle.value = 'Exit full screen'
    isFullScreen.value = true
  }
}

const toggleMusicModal = () => {
  isVolumeSettingsDisplayed.value = !isVolumeSettingsDisplayed.value
}

const handleClickOutside = (event) => {
  const { target } = event
  if (musicModalRef.value && !musicModalRef.value.$el.contains(target)) {
    isVolumeSettingsDisplayed.value = false
  }
}

onMounted(() => {
  document.body.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.body.removeEventListener('click', handleClickOutside)
})

const volumeIconSrc = computed(() => {
  return volume.value === 0 ? '/img/icons/mute-icon-sm.webp' : '/img/icons/volume-icon-sm.webp'
})

</script>

<template>
  <div class="absolute right-0 text-white h-full flex items-center px-1.5 sm:px-3 gap-0.5 bg-footer-right-component footer-left-shadow select-none">
    <img class="w-4 h-4 cursor-pointer" src="/img/icons/full-screen-icon-sm.webp" alt="Full screen" :title="originalTitle" @click="enterFullScreen" />
    <img class="w-4 h-4 mt-px cursor-pointer" :src="volumeIconSrc" alt="Volume controls" title="Volume controls" @click.stop="toggleMusicModal" />
    <MusicVolumeModal v-if="isVolumeSettingsDisplayed" ref="musicModalRef" />
    <NotificationModal class="md:block z-fmax" />
    <CurrentTime />
  </div>
</template>
