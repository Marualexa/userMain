<template>
  <div class="product--card">
    <img id="img" src="" :data-img="imagen" alt="" />
    <div class="product-info">
      <div>
        <p>{{ name }}</p>
        <p>{{ email }}</p>
        <p>{{ role }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted } from 'vue';

const contain = defineProps({
    id: {
        type: String,
    },
    imagen: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    role: {
        type: String,
    }
});

const emit = defineEmits(["imgCart"]);

const imgCart = () => {
  const imageContainer = document.querySelector("#img");
  emit('imgCart',imageContainer);
};

onMounted(() => {
imgCart()
});

</script>


