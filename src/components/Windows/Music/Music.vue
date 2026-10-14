<script setup>
import { ref } from 'vue'
import Button from '@/components/Buttons/Button.vue'
import Player from '@/components/Windows/Music/Player.vue'
import playlist from '@/data/playlist-data.json'

const selectedTrack = ref(0)
const coverFor = (track) => `/img/album-covers/user/${track.file.replace(/\.mp3$/, '.webp')}`
const fallbackCover = (event) => { event.target.src = '/img/album-covers/user/rudraksh-favorites-cover.webp' }
</script>

<template>
  <div class="relative right-0 h-content-window flex flex-col overflow-hidden bg-white font-trebuchet-pixel">
    <div class="shrink-0 flex items-center gap-4 p-2 border-b border-gray-300">
      <img src="/img/album-covers/user/rudraksh-favorites-cover.webp" alt="Rudraksh's Favorites cover" class="w-14 h-14 rounded-sm object-cover" />
      <div class="min-w-0">
        <h2 class="text-lg font-bold truncate">{{ playlist.name }}</h2>
        <p class="text-xs">Your local music collection</p>
        <div class="flex gap-2 mt-1"><Button :href="playlist.appleMusicUrl" :blank="true" layout="small">Apple Music</Button><Button :href="playlist.spotifyUrl" :blank="true" layout="small">Spotify</Button></div>
      </div>
    </div>
    <div class="flex-1 min-h-0 overflow-y-auto">
      <div class="grid grid-cols-12 items-center px-3 py-2 text-xs border-b border-gray-300 bg-white sticky top-0 z-10">
        <span class="col-span-1">#</span><span class="col-span-5 sm:col-span-4">Title</span><span class="hidden sm:block sm:col-span-3">Album</span><span class="col-span-2 sm:col-span-2 text-right">Duration</span><span class="col-span-4 sm:col-span-2 text-right">Source</span>
      </div>
      <button v-for="(track, index) in playlist.tracks" :key="track.file" type="button" class="w-full grid grid-cols-12 items-center px-3 py-1.5 text-left border-b border-blue-100 hover:bg-blue-50" :class="{ 'bg-blue-100': selectedTrack === index }" @click="selectedTrack = index">
        <span class="col-span-1 text-xs">{{ index + 1 }}</span>
        <span class="col-span-5 sm:col-span-4 flex min-w-0 items-center gap-2"><img :src="coverFor(track)" :alt="`${track.album} cover`" class="w-10 h-10 rounded-sm object-cover shrink-0" @error="fallbackCover" /><span class="min-w-0"><span class="block text-sm truncate">{{ track.name }}</span><span class="block text-xs text-gray-700 truncate">{{ track.artist }}</span></span></span>
        <span class="hidden sm:block sm:col-span-3 text-xs truncate pr-2">{{ track.album }}</span>
        <span class="col-span-2 sm:col-span-2 text-xs text-right">{{ track.duration }}</span>
        <span class="col-span-4 sm:col-span-2 text-right"><span class="text-xs text-blue-700">Local MP3</span></span>
      </button>
    </div>
    <Player :playlist="playlist.tracks" :selected-index="selectedTrack" @select-track="selectedTrack = $event" />
  </div>
</template>
