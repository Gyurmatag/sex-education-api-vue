<template>
  <nav class="navbar is-primary">
    <div class="container">
      <div class="navbar-brand">
        <router-link
          to="/"
          class="navbar-item"
        >
          <img
            src="@/assets/logo.png"
            alt="Logo"
          >
        </router-link>
      </div>
      <div
        class="navbar-menu is-active"
      >
        <div class="navbar-end">
          <router-link
            class="navbar-item"
            to="/about"
          >
            About
          </router-link>
          <router-link
            class="navbar-item"
            to="/documentation"
          >
            Docs
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="scss" scoped>
.navbar > .container {
  @include until($desktop) {
    padding: 0 1rem
  }
}
</style>
