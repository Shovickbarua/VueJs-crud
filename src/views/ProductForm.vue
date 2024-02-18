<script setup>
import CategoryServices from '@/Services/CategoryServices';
import ProductServices from '@/Services/ProductServices';
import { reactive, watchEffect, ref } from 'vue';
import { useRouter } from 'vue-router';

const product = reactive({
        product_name: "",
        quantity: "",
        SKU: "",
        cat_id: "",
        dob: "",
        cost: "",
        image: "",
});
const router = useRouter();
const category = ref([])
const props = defineProps({
  id: {
    required: true,
    type: String,
  },
});
const id = props.id;

// console.log('id', id)

  const getCategory = async () => {
      const res = await CategoryServices.index();
      if (res.success) {
        category.value = res.data.data;
      }
    };

    const getProduct = async (id) => {
        const res = await ProductServices.show(id);
        if (res.success) {
          Object.assign(product, res.data.data);
        }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === 'image') {
        const file = e.target.files[0];
        product.image = file;
      } else {
        product[name] = value;
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
        id ? (product.id = id) : "";
      const formData = new FormData();
      Object.keys(product).forEach((key) => {
          formData.append(key, product[key]);
      });
      const res = await ProductServices.save(formData);
      if (res.success) {
          router.push('/products');
      }
};

watchEffect(() => {
    getCategory();
});

watchEffect(() => {
  if (id) {
    getProduct(id);
  }
},[id]);
</script>

<template>
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group col-md-4">
          <label for="name">Product<font>*</font></label>
          <input type="text" class="form-control" v-model="product.product_name"  placeholder="Name" name="product_name" @change="handleChange" />
        </div>
        <div className="form-group col-md-4">
                    <label htmlFor="group_id">Select Category</label>
                    <select
                        className="form-control"
                        id="cat_id"
                        name="cat_id"
                        v-model="product.cat_id"
                        @change="handleChange"
                    >
                    <option value="" disabled selected>--Select Category --</option>
                    <option v-for="(category) in category" :key="category.id" :value="category.id" >
                        {{ category.cat_name }}
                    </option>
                    </select>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="name">
                        SKU<font>*</font>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="SKU"
                        name="SKU"
                      
                        @change="handleChange"
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="dob">
                        Date<font>*</font>
                    </label>
                    <input
                        type="date"
                        className="form-control singledatepicker"
                        id="dob"
                        name="dob"
                        autoComplete="on"
                        @change="handleChange"
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="name">
                        Quantity<font>*</font>
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id=""
                        placeholder=""
                        name="quantity"
                        @change="handleChange"
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="name">
                        Cost Price<font>*</font>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder=""
                        name="cost"
                        @change="handleChange"
                    />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="image">Image Upload</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        @change="handleChange"
                    />
                </div>
        <div class="form-group col-md-12">
          <button type="submit" class="btn btn-primary btn-sm">Save</button>
        </div>
      </div>
    </form>
  </template>