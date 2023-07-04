<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/v-slot-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">
          Cadastro de Produtos
        </h1>
        <v-row class="d-flex align-center flex column">
        <v-btn
          fab
          small
          color="green"
          @click="dialog = true; clear()"
        >
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-row>
      </v-col>
    </v-row>
  
    <v-row class="d-flex align-center flex-column">
      <v-card width="900">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              color="green"
              @click="update(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              color="red"
              @click="destroy(item)"
            >
              mdi-delete
            </v-icon>
            
          </template>
        </v-data-table>
      </v-card>
    </v-row>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="2">
              <v-text-field
                v-model="id"
                outlined
                disabled
                color="green"
                placeholder="ID do Produto"
                label="ID da Produto"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="name"
                outlined
                color="green"
                placeholder="Nome do Produto"
                label="Nome do Produto"
              >
              </v-text-field>
              <v-text-field
                v-model="price"
                outlined
                color="green"
                placeholder="Preço do Produto"
                label="Preço do Produto"
              >
              </v-text-field>
              <v-text-field
                v-model="image"
                outlined
                color="green"
                placeholder="Imagem do Produto"
                label="Imagem do Produto"
              >
              </v-text-field>
              <v-text-field
                v-model="description"
                outlined
                color="green"
                placeholder="Descrição do Produto"
                label="Descrição do Produto"
              >
              </v-text-field>
              <v-autocomplete
                v-model="idCategories"
                item-text="name"
                item-value="id"
                :items="categorias"
                outlined
                color="green"
                placeholder="ID da Categoria"
                label="ID da Categoria"
              >
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            @click="persist"
          >
            Salvar
          </v-btn>
        </v-card-actions>
        
      </v-card>
      
    </v-dialog>
  </v-container>
  
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      search: null,
      items: [],
      dialog: false,
      id: null,
      idCategories: null,
      description: null,
      image: null,
      price: null,
      name: null,
      categorias: [],
      headers: [
        {
          text: 'ID',
          value: 'id',
          align: 'center'
        },
        {
          text: 'Nome',
          value: 'name',
          align: 'center'
        },
        {
          text: 'Preço',
          value: 'price',
          align: 'center'
        },
        {
          text: 'Imagem',
          value: 'image',
          align: 'center'
        },
        {
          text: 'Descrição',
          value: 'description',
          align: 'center'
        },
        {
          text: 'ID da Categoria',
          value: 'idCategories',
          align: 'center'
        },
        { text: "", value: "actions", filterable: false},
      ]
    }
  },
  async created() {
    await this.getAllUsers();
    await this.getAllCategories();
  },

  methods: {
    clear() {
      this.name = null;
      this.id = null;
      this.idCategories = null;
      this.description = null;
      this.image = null;
      this.price = null;
    },

    update(item) {
      this.name = item.name;
      this.id = item.id;
      this.idCategories = item.idCategories;
      this.description = item.description;
      this.image = item.image;
      this.price = item.price;
      this.dialog = true;
    },

    async persist() {
      try {
        const request = {
          name: this.name,
          idCategories: this.idCategories,
          description: this.description,
          image: this.image,
          price: this.price,
        }
        if (this.id) {
          await this.$api.patch(`/products/${this.id}`, request);
          this.$toast.success('Produto Editado')
        }else {
          await this.$api.post(`/products`, request);
          this.$toast.success('Produto Cadastrado')
        }
        this.name = null;
        this.id = null;
        this.idCategories = null;
        this.description = null;
        this.image = null;
        this.price = null;
        this.dialog = false;
        await this.getAllUsers();
      } catch (error) {
        this.$toast.error('Erro')
      }
    },

    async getAllUsers() {
      try {
        const response = await this.$api.get('/products');
        this.items = response.data;
      } catch (error) {
        this.$toast.error('Error')
      }
    },

    async getAllCategories() {
      try {
        const response = await this.$api.get('/categories');
        this.categorias = response.data;
      } catch (error) {
        this.$toast.error('Error')
      }
    },

    async destroy(item) {
      try {
      await this.$api.delete(`/products/destroy/${item.id}`);
      await this.getAllUsers();
      this.$toast.success('Produto Removido')
    }catch (error){
      this.$toast.error('Erro ao remover produto')
    }
  },
}
}
</script>

<style>

</style>