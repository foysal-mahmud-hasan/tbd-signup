<script setup>
import { ref } from 'vue';
import Signup from './components/Signup.vue'
const showYoutubeModal = ref(true)
// console.log(showYoutubeModal.value)
const closeYoutubeModal = () => {
  showYoutubeModal.value = false;
}
</script>

<template>
  <div v-if="showYoutubeModal"
    class="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center w-screen h-full pl-2 pr-2 md:pl-0 md:pr-0">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-1/2 h-1/2 relative ">
      <!-- Close Button -->
      <button @click="closeYoutubeModal" class="absolute top-[10px] right-[10px] bg-gray-50 text-gray-800 hover:bg-gray-300 hover:text-black 
                    w-10 h-10 rounded-full flex items-center justify-center text-3xl z-50 shadow-lg">
        &times;
      </button>
      <!-- YouTube Video -->
      <iframe class="w-full h-full" src="https://www.youtube.com/embed/PsfKTVU3Lnk" title="YouTube video player"
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
  </div>
  <Signup />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
