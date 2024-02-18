<script setup>
import { reactive, watchEffect, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import CategoryServices from '@/Services/CategoryServices';

const category = reactive({
  cat_name: '',
});

const router = useRouter();
const props = defineProps({
  id: {
    required: true,
    type: String,
  },
});
const id = props.id;

const getCategory = async (id) => {
  const res = await CategoryServices.show(id);
  if (res.success) {
    Object.assign(category, res.data.data);
  }
};

// console.log(id);
watchEffect(() => {
  if (id) {
    getCategory(id);
  }
}, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();

  id ? (category.id = id) : '';
  console.log('data', category);
  const res = await CategoryServices.save(category);
  if (res.success) {
    router.push('/categories');
  }
};
</script>

<template>
  <main>
    <form @submit.prevent="handleSubmit">
      <input type="text" name="" v-model="category.cat_name" placeholder="name">
      <button type="submit">Submit</button>
    </form>
  </main>
</template>
