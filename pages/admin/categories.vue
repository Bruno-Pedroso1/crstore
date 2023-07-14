<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/v-slot-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1
          class="d-flex align-center flex-column"
        >
          Cadastro de Categorias
        </h1>
        <v-row
        class="d-flex align-center flex column"
        >
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
    <v-row
      class="d-flex align-center flex-column"
    >
      <v-card
        width="900"
      >
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          >
        </v-text-field>
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
              @click.ctrl="$toast.info('quem leu é corno')"
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
    <v-dialog
      v-model="dialog"
    >
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="2">
              <v-text-field
                v-model="id"
                outlined
                disabled
                color="green"
                placeholder="ID da Categoria"
                label="ID da Categoria"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="name"
                outlined
                color="green"
                placeholder="Nome da Categoria"
                label="Nome da Categoria"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            @click="persist"
            @keyup.enter="persist"
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
      name: null,
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

        { text: "", value: "actions", filterable: false},
      ]
    }
  },
  async created() {
    await this.getAllCategorias();
  },

  methods: {

    clear() {
      this.name = null;
      this.id = null;
    },

    update(item) {
      this.name = item.name;
      this.id = item.id;
      this.dialog = true;
    },

    async persist() {
      try {
        const request = {
          name: this.name,
        }
        if (this.id) {
          await this.$api.patch(`/category/${this.id}`, request);
          this.$toast.success('Categoria Editada')
        }else {
          await this.$api.post(`/category`, request);
          this.$toast.success('Categoria Cadastrada')
        }
        this.name = null;
        this.id = null;
        this.dialog = false;
        await this.getAllCategorias();
      } catch (error) {
        this.$toast.error('Erro')
      }
    },

    async getAllCategorias (){
      const categoria = await this.$api.$get(`/category`)
      this.items = categoria
    },

    async destroy(item) {
      try {
      await this.$api.delete(`/category/destroy/${item.id}`);
      await this.getAllCategorias();
      this.$toast.success('Categoria Removida')
    }catch (error){
      this.$toast.error('Erro ao remover categoria')
    }
  },
}
}
</script>

<style>

</style>