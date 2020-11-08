<template>
  <nav class="flex items-center justify-between flex-wrap bg-primary p-6">
    <div class="text-lg text-white">
      <router-link
        class="inline-block mr-4 p-1 border-solid border-4 border-secondary text-white hover:text-secondary cursor-pointer"
        to="/"
      >
        SEA
      </router-link>
    </div>
    <div>
      <div class="text-lg">
        <router-link
          class="inline-block mr-4 text-white hover:text-secondary cursor-pointer"
          to="/documentation"
        >
          Docs
        </router-link>
        <router-link
          class="inline-block mr-4 text-white hover:text-secondary cursor-pointer"
          to="/about"
        >
          About
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
