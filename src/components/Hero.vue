<template>
  <section class="hero is-primary is-medium">
    <div class="hero-head">
      <navbar />
    </div>
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          Sex Education API
        </h1>
      </div>
    </div>
  </section>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'Hero',
  components: {
    Navbar
  }
}
</script>

<style scoped>

</style>
