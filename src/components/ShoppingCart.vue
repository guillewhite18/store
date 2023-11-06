<template>
  <div>
    <div class="card flex justify-content-center">
      <Button :label="cartButtonText" icon="pi pi-shopping-cart" @click="visible = true" />

      <Dialog v-model:visible="visible" modal header="Cart" :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <DataTable :value="cartItems" tableStyle="min-width: 50rem">
          <Column field="title" header="Product" />
          <Column field="image" header="Image">
            <template #body="slotProps">
              <img :src="slotProps.data.image" alt="Product" style="max-width: 100px; max-height: 100px" />
            </template>
          </Column>
          <Column header="Quantity">
            <template #body="slotProps">
              <div class="quantity-input-container">
                <InputNumber
                  v-model="slotProps.data.quantity"
                  inputId="stacked-buttons"
                  decrementButtonIcon="pi pi-minus"
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonClass="p-button-danger"
                  incrementButtonClass="p-button-success"
                  showButtons
                  buttonLayout="horizontal"
                />
              </div>
            </template>
          </Column>
          <Column field="price" header="Price" />
          <Column header="Total">
            <template #body="slotProps">
              {{ slotProps.data.quantity * slotProps.data.price }}
            </template>
          </Column>
          <Column header="Actions">
            <template #body="slotProps">
              <Button
                icon="pi pi-trash"
                class="p-button-danger"
                @click="removeItem(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
        <div class="total-container" style="font-size: 18px; font-weight: bold;">
  <strong>Total:</strong> {{ calculateTotal.toFixed(2) }}
</div>
      </Dialog>
    </div>
  </div>
</template>

<style>
.quantity-input-container {
  margin-top: 10px;
}

.total-container {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}
</style>
<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';

export default {
  setup() {
    const store = useStore();
    const cartItems = store.state.cartItems;
    const visible = ref(false);

    const totalCartItems = computed(() => {
      return cartItems.reduce((total, item) => total + item.quantity, 0);
    });

    const calculateTotal = computed(() => {
      return cartItems.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);
    });

    const removeItem = (item) => {
      store.commit('removeItem', item);
    };

    const showCartItems = () => {
      console.log("Elementos en el carrito:", cartItems);
    };

    const cartButtonText = computed(() => {
      return `Cart (${totalCartItems.value})`;
    });

    return { cartItems, showCartItems, visible, calculateTotal, removeItem, totalCartItems, cartButtonText };
  },
};
</script>

