<template>
  <div class="container">
    <div>
      <img @click="pagination" src="../assets/paginacion.jpg" alt="" />
      <p>Pagination</p>
    </div>
    <div>
        <img @click="scroll" src="../assets/scrollInfinito.png" alt="">
        <p>Scroll Infinite</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function pagination() {
  router.push({ name: "pagination" });
}

function scroll() {
    router.push({ name: "scrollInfini" });
}
</script>

<style lang="sass">
@import "../sass/importGlobal.scss"
</style>
