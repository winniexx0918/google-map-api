<template>
  <div id="app">
    <div class="nav">
      <router-link class="logo" to="/">- HelloWorld -</router-link>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/GoogleMap">GoogleMap</router-link>
        </li>
      </ul>
    </div>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>

export default {};
</script>

<style lang="scss">
@import "./scss/style.scss";
</style>
