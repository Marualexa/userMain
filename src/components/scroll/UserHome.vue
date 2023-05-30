<template>
  <section class="main--container">
    <div class="cards--container">
      <CartUser
        v-for="{ id, imagen, name, email, role } in newVarResult.result"
        :key="`${id}`"
        :id="`${id}`"
        :imagen="imagen"
        :name="name"
        :email="email"
        :role="role"
      />
    </div>
  </section>
</template>

<script setup>
import CartUser from "./CartsUser.vue";
import { useAsync } from "../../hooks/useAsync";
import { ref, onMounted, reactive } from "vue";

const { result, makeRequest, cabecera } = useAsync();
const page = ref("1");
const resultData = ref(null);
const limit = ref("10");
const stringLimit = ref(5);

const newVarResult = reactive({
  result: [],
});

const userName = async () => {
  await makeRequest("users", {
    _page: page.value,
    _limit: limit.value,
  });
  const { "x-total-count": xTotal } = cabecera.value;
  const numberStrin = Number(xTotal);
  stringLimit.value = Number(limit.value);

  const divition = numberStrin / stringLimit.value;
  resultData.value = Math.ceil(divition);

  newVarResult.result = [...result.value, ...newVarResult.result];

  return result;
};

onMounted(() => {
  userName();
  window.addEventListener("scroll", getPaginatedUser(), { passive: false });
});

function getPaginatedUser() {
  return async function () {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
    const pageIsNotMax = Number(page.value) < resultData.value;

    if (scrollIsBottom && pageIsNotMax) {
      document.body.scrollTop = scrollHeight / 2;
      document.documentElement.scrollTop = scrollHeight / 2;
      let newNumberPage = Number(page.value);
      newNumberPage = newNumberPage + 1;
      page.value = newNumberPage.toString();

      return userName();
    }
  };
}
</script>

<style lang="sass">
@import "../../sass/importGlobal.scss"
</style>
