  <template>
  <div class="container">
    <div class="menu">
      
      <ShoppingCart />
      
      <CategoryList :products="products" @update-products="updateProducts" />
    </div>
    <div class="content">
      <div class="card p-mt-3">
        <div>
          <div class="p-inputgroup" style="margin-bottom: 10px;">
            <InputText v-model="globalFilter" placeholder="Keyword Search" class="p-inputtext-sm" />
            <Button label="Clear" icon="pi pi-times" @click="clearGlobalFilter" class="p-button-sm" />
          </div>
          <DataTable :value="filteredProducts" tableStyle="min-width: 50rem">
          <Column field="id" header="ID" style="width: 50px" />
          <Column field="title" header="Name" />
          <Column field="price" header="Price" />
          <Column field="description" header="Description" />
          <Column field="category" header="Category" />
          <Column header="Image">
            <template #body="slotProps">
              <img :src="slotProps.data.image" :alt="slotProps.data.title" style="max-width: 100px; max-height: 100px;" />
            </template>
          </Column>
          <Column header="Add to cart">
          <template #body="slotProps">
            <div style="display: flex; justify-content: center; padding-bottom: 10px;">
              <Button
                label=""
                icon="pi pi-cart-plus"
                class="p-button-warning"
                @click="addToCart(slotProps.data)"/>
            </div>
            <InputNumber
        v-model="slotProps.data.quantity"
        inputId="stacked-buttons"
        style="width: 4rem;"
        showButtons
        buttonLayout="vertical" />
          </template>
        </Column>
        </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  height: 100vh; 
}

.menu {
  width: 200px; 
  background-color: #333;
  color: #fff;
  padding: 20px;
  overflow-y: auto; 
}

.content {
  flex: 1;
  padding: 20px;
  overflow: auto;
  padding-top: 50px;
}
</style>

<script>
import { fetchProducts, fetchProductsByCategory } from '../api/products.js';
import CategoryList from './CategoryList.vue';
import ShoppingCart from './ShoppingCart.vue';
import { useStore } from 'vuex';

export default {
  data() {
    return {
      selectedCategory: null,
      products: [],
      globalFilter: '',
      defaultQuantity: 1,
      
    };
  },
  created() {
    fetchProductsByCategory()
      .then((response) => {
        this.products = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) =>
        Object.values(product).some((value) =>
          value && value.toString().toLowerCase().includes(this.globalFilter.toLowerCase())
        )
      );
    },
  },
  components: {
    CategoryList,
    ShoppingCart,
  },
  methods: {
    showCartItems() {
      const cartItems = this.$store.state.cartItems;
    }, 

    clearInputValue(item) {
    item.quantity = null; 
  },

    updateProducts(newProducts) {
      this.products = newProducts;
    },
    applyGlobalFilter() {
    },

      cartItems() {
      return this.$store.state.cartItems;
    },

    addToCart(product) {
      const existingItem = this.$store.state.cartItems.find(
        (item) => item && item.product && item.product.id === product.id
      );

      if (existingItem) {
        
        existingItem.quantity += product.quantity;
      } else {
      
        this.$store.dispatch("addProductToCart", {
          ...product,
          quantity: product.quantity || this.defaultQuantity,
        });
      }
      product.quantity = this.defaultQuantity;
    },
  
    clearGlobalFilter() {
      this.globalFilter = '';
    },
  },
};
</script>

  