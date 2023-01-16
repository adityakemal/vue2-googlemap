<template>
  <div id="app">
    <AddGoogleMap />
  
  </div>
</template>

<script>
import AddGoogleMap from "./components/AddGoogleMap";


// import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'App',
  components: {
    AddGoogleMap
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
