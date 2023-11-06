<template>
  <div class="sidebar">
    <nav>
      <ul>
        <li>
          <button
            :class="{'selected': selectedItem === 'women\'s clothing'}"
            @click="handleNavItemClick('women\'s clothing')"
            class="buttonCategory"
          >
            <b>Women's clothing</b>
          </button>
        </li>
        <li>
          <button
            :class="{'selected': selectedItem === 'men\'s clothing'}"
            @click="handleNavItemClick('men\'s clothing')"
            class="buttonCategory"
          >
            <b>Men's clothing</b>
          </button>
        </li>
        <li>
          <button
            :class="{'selected': selectedItem === 'jewelery'}"
            @click="handleNavItemClick('jewelery')"
            class="buttonCategory"
          >
            <b>Jewelery</b>
          </button>
        </li>
        <li>
          <button
            :class="{'selected': selectedItem === 'electronics'}"
            @click="handleNavItemClick('electronics')"
            class="buttonCategory"
          >
            <b>Electronics</b>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style>
.sidebar {

  color: #fff; 
}

.sidebar nav {
  padding: 20px; 
}

.sidebar ul {
  list-style: none; 
  padding: 0;
}

.sidebar li {
  margin-bottom: 10px; 
}

.sidebar .buttonCategory {
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  text-align: left;
  width: 100%;
  padding: 10px;
}

button.selected {
  background-color: #555; 
}
</style>

<script>
import { fetchProductsByCategory } from '../api/products.js';

export default {
  props: {
    products: Array
  },
  data() {
    return {
      selectedItem: null
    };
  },
  methods: {
    async handleNavItemClick(category) {
      this.selectedItem = category;
      try {
        const response = await fetchProductsByCategory(category);
        this.$emit('update-products', response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
