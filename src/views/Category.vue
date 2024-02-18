<script setup>
import CategoryServices from '@/Services/CategoryServices';
import { ref, watchEffect } from 'vue';

const categories = ref([])


const getCategory = async () => {
    const res = await CategoryServices.index();
    console.log('res', res.data.data)
    if (res.success) {
        categories.value = res.data.data;     
    }
}

console.log('rest', categories.value)

watchEffect(() => {
    getCategory();
})

const categoryDelete = async (id) => {
        const confirmMsg = confirm("Are you sure!");
        if (confirmMsg) {
            const res = await CategoryServices.delete(id);
            // console.log("res", res);
            if (res.success) {
                getCategory();
            }
        }
    };
</script>

<template>
  <main>
   <table>
    <thead>
        <tr>
            <th>Serial</th>
            <th>Name</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(category, index) in categories" :key="category.id">
            <td>{{ index + 1 }}</td>
            <td>{{ category.cat_name }}</td>
            <td>
                <RouterLink :to="{ name: 'homeEdit', params: { id: category.id }}">
                    Edit
                </RouterLink>
                <button @click.prevent="categoryDelete(category.id)">Delete</button>
            </td>
        </tr>
    </tbody>
   </table>
    

  </main>
</template>
