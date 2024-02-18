<script setup>
import ProductServices from '@/Services/ProductServices';
import { ref, watchEffect } from 'vue';

const products = ref([])


const getProduct = async () => {
    const res = await ProductServices.index();
    console.log('res', res.data.data)
    if (res.success) {
        products.value = res.data.data;     
    }
}

console.log('rest', products.value)

watchEffect(() => {
    getProduct();
})


</script>

<template>
  <main>
   <table>
    <thead>
        <tr>
            <th width="7%">Serial</th>
            <th>Name</th>
            <th>Category</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Image</th>
            <th width="">Action</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <td>{{ index + 1 }}</td>
          <td>{{ product.product_name }}</td>
          <td>{{ product.category.cat_name }}</td>
          <td>{{ product.SKU }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.dob }}</td>
          <td>
            <img :src="product.image" />
          </td>
          <td>
            <RouterLink :to="{ name: 'productEdit', params: { id: product.id }}">
              Edit
            </RouterLink>
          </td>
        </tr>
    </tbody>
   </table>
    

  </main>
</template>
