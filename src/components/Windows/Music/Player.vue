<script setup>
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { useVolumeStore } from '@/stores/volumeStore'

const props = defineProps({ playlist: { type: Array, required: true }, selectedIndex: { type: Number, required: true } })
const emit = defineEmits(['select-track'])
const volumeStore = useVolumeStore()
const audio = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const currentTrack = computed(() => props.playlist[props.selectedIndex])
const audioPath = computed(() => `/musics/user/${currentTrack.value.file}`)
const coverPath = computed(() => `/img/album-covers/user/${currentTrack.value.file.replace(/\.mp3$/, '.webp')}`)

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '0:00'
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`
}
const fallbackCover = (event) => { event.target.src = '/img/album-covers/user/rudraksh-favorites-cover.webp' }
const pause = () => { if (audio.value) audio.value.pause() }
const togglePlay = async () => {
  if (!audio.value) return
  if (audio.value.paused) {
    try {
      await audio.value.play()
    } catch (error) {
      console.error('Unable to start audio playback:', error)
    }
  } else pause()
}
const previousTrack = () => emit('select-track', props.selectedIndex === 0 ? props.playlist.length - 1 : props.selectedIndex - 1)
const nextTrack = () => emit('select-track', (props.selectedIndex + 1) % props.playlist.length)

watch(() => props.selectedIndex, async () => {
  const resume = !audio.value?.paused
  currentTime.value = 0
  if (!audio.value) return

  audio.value.pause()
  await nextTick()
  audio.value.load()

  if (resume) {
    try {
      await audio.value.play()
    } catch (error) {
      console.error('Unable to continue audio playback:', error)
    }
  }
})
onUnmounted(() => pause())
</script>

<template>
  <div class="shrink-0 h-14 bg-player shadow-inner border-t border-blue-200">
    <audio ref="audio" :src="audioPath" :volume="volumeStore.volume" preload="metadata" @play="isPlaying = true" @pause="isPlaying = false" @timeupdate="currentTime = audio?.currentTime || 0" @ended="nextTrack" />
    <div class="flex items-center justify-between h-full px-2 gap-2">
      <div class="w-5/12 min-w-0 flex items-center gap-2"><img :src="coverPath" :alt="`${currentTrack.album} cover`" class="w-10 h-10 object-cover rounded-sm" @error="fallbackCover" /><div class="min-w-0"><p class="text-xs font-trebuchet-pixel truncate">{{ currentTrack.name }}</p><p class="text-xs font-trebuchet-pixel truncate">{{ currentTrack.artist }}</p></div></div>
      <div class="w-3/12 flex items-center justify-center"><button @click="previousTrack" class="w-6 h-6 rounded-full bg-white hover:bg-gray-200"><img src="/img/icons/music/previous-icon.webp" alt="Previous track" /></button><button @click="togglePlay" class="w-10 h-10 rounded-full bg-white hover:bg-gray-200 play-button" :class="{ 'is-playing': isPlaying }" :aria-label="isPlaying ? 'Pause' : 'Play'"></button><button @click="nextTrack" class="w-6 h-6 rounded-full bg-white hover:bg-gray-200"><img src="/img/icons/music/next-icon.webp" alt="Next track" /></button></div>
      <div class="w-4/12 text-right"><p class="text-xs font-trebuchet-pixel">{{ formatTime(currentTime) }} / {{ formatTime(audio?.duration) }}</p></div>
    </div>
  </div>
</template>

<style scoped>
.play-button { background: center / contain no-repeat url('/img/icons/music/play-icon.webp'); }
.play-button:hover { background-image: url('/img/icons/music/play-icon-hover.webp'); }
.play-button.is-playing { background-image: url('/img/icons/music/pause-icon.webp'); }
</style>
