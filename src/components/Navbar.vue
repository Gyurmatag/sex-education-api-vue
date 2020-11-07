<template>
  <nav>
    <div>
      <div>
        <router-link
          to="/"
        >
          <img
            src="@/assets/images/logo.png"
            alt="Logo"
          >
        </router-link>
      </div>
      <div>
        <div>
          <router-link
            to="/about"
          >
            About
          </router-link>
          <router-link
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
