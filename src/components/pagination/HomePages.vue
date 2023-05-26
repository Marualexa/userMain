<template>
  <section class="main--container">
    <div class="cards--container">
      <CartUser 
        v-for="{ id, imagen, name, email, role } in result"
        :key="`${id}`"
        :id="`${id}`"
        :imagen="imagen"
        :name="name"
        :email="email"
        :role="role"
      />
    </div>
  </section>
  <PagingSoftware @page-event="eventButton" />
</template>

<script setup>
import CartUser from "./CartsUser.vue";
import { useAsync } from "../../hooks/useAsync";
import { ref, onMounted, defineProps, watch, provide } from "vue";
import PagingSoftware from "./PagingSoftware.vue";

const { result, makeRequest, cabecera } = useAsync();
const page = ref("1");
const resultData = ref(null);
const limit = ref("5");
const stringLimit = ref('5');

const userName = async () => {
  await makeRequest("users", {
    _page: page.value,
    _limit: limit.value,
  });
  const { "x-total-count": xTotal } = cabecera.value;
  const numberStrin = Number(xTotal);
  const stringLimit = Number(limit.value);

  const divition = numberStrin / stringLimit;
  resultData.value = Math.ceil(divition);
  return result.value
}

const props = defineProps({
  result: {
    type: Array,
  },
})

onMounted(() => {
  userName();
});

function changesPage(args) {
  page.value = args;
}

function eventButton(args) {
  console.log("eventListProducts", args);
  changesPage(args);
}
provide("page", {
  page,
  changesPage,
  resultData,
  stringLimit
});

watch(
  () => page.value,
  (val) =>{
    return userName();
  }
);
</script>

<style lang="sass">
@import "../../sass/importGlobal.scss"
</style>
