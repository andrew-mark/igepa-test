<template>
  <div class="container">
    <div class="">
      This my about page. Its so lovely
    </div>
    <img src="~/assets/images/andrew-butler.jpg" />
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
  background-color: yellow;
  color: black;
  font-size: 50px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

img {
  height: auto;
  width: 400px;
}

.page-enter-active, .page-leave-active {
  transition: transform 0.7s ease;
  position: relative;
}
.page-enter, .page-leave-active {
  transform: translateX(100vw);
  position: absolute;
  transition: transform 0.7s ease;
}
</style>
