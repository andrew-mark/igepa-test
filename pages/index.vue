<template>
  <div class="container">
    <div class="">
      This is the main page
    </div>
    <img src="~/assets/images/thomas.jpg" />
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
  background-color: blue;
  color: #fff;
  font-size: 50px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.page-enter-active, .page-leave-active {
  transition: transform 0.7s ease;
}
.page-enter, .page-leave-active {
  transform: translateX(-100vw);
  transition: transform 0.7s ease;
}
</style>
