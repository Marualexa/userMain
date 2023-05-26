<template>
  <div class="containe-pagin">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a @click="back" v-if="page != 1" class="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li
          v-for="{ numberPage, id } in userPage"
          :key="id"
          class="page-item"
          :class="{ active: isCurrent(numberPage) }"
        >
          <a @click="pageEvent(numberPage)" class="page-link">{{ numberPage }}</a>
        </li>
        <li class="page-item">
          <a
            @click="forward"
            v-if="page < userPage.length"
            class="page-link"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { inject, ref, defineEmits, watch } from 'vue';

const userPage = ref([]);
const { page } = inject("page");
const emit = defineEmits(["pageEvent"]);
const { resultData } = inject("page");

const isCurrent = (nPage) => (nPage == page.value ? true : false);

function pageEvent(numberPage) {
    emit("pageEvent", numberPage);
}

watch(
    () => resultData.value,
    (val) => {
        const newUsers = [...Array(resultData.value)].map((user, index) => ({
            numberPage: index + 1,
            id: `${index + 1}`,
        }));
        userPage.value = newUsers;
    },
    { inmediate: true}
);

function back() {
    const newNumberPage = Number(page.value);
    emit("pageEvent", newNumberPage - 1);
}

function forward() {
    const newNumberPage = Number(page.value);
    emit("pageEvent", newNumberPage + 1);
}
</script>

<style lang="sass">
@import "../../sass/importGlobal.scss"
</style>
