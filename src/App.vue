<template>
  <header>
    <navbar />
  </header>
  <main class="flex-grow bg-gray-900">
    <router-view />
  </main>
  <footer>
    <footer-bar />
  </footer>
</template>

<script>
import Navbar from '@/components/Navbar'
import FooterBar from '@/components/FooterBar'

export default {
  name: 'Home',
  components: {
    Navbar,
    FooterBar
  }
}
</script>
