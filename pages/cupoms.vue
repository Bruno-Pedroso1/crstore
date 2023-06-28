<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/v-slot-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">
          Cadastro de Cupoms
        </h1>
        <v-row class="d-flex align-center flex column">
        <v-btn
          fab
          small
          color="green"
          @click="dialog = true"
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
                placeholder="ID do Cupom"
                label="ID do Cupom"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="code"
                outlined
                color="green"
                placeholder="Código do Cupom"
                label="Código do Cupom"
              >
              </v-text-field>
              <v-text-field
                v-model="type"
                outlined
                color="green"
                placeholder="Tipo do Cupom"
                label="Tipo do Cupom"
              >
              </v-text-field>
              <v-text-field
                v-model="value"
                outlined
                color="green"
                placeholder="Valor do cupom"
                label="Valor do cupom"
              >
              </v-text-field>
              <v-text-field
                v-model="uses"
                outlined
                color="green"
                placeholder="Quantidade de Usos"
                label="Quantidade de Usos"
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
      code: null,
      id: null,
      type: null,
      value: null,
      uses: null,
      headers: [
        {
          text: 'ID',
          value: 'id',
          align: 'center'
        },
        {
          text: 'Código',
          value: 'code',
          align: 'center'
        },
        {
          text: 'Valor',
          value: 'value',
          align: 'center'
        },
        {
          text: 'Tipo',
          value: 'type',
          align: 'center'
        },
        {
          text: 'Usos',
          value: 'uses',
          align: 'center'
        },


        { text: "", value: "actions", filterable: false},
      ]
    }
  },
  async created() {
    await this.getAllUsers();
  },

  methods: {

    update(item) {
      this.code = item.code;
      this.id = item.id;
      this.uses = item.uses;
      this.type = item.type;
      this.value = item.value;
      this.dialog = true;
    },

    async persist() {
      try {
        const request = {
          name: this.name,
        }
        if (this.id) {
          await this.$api.patch(`/cupoms/${this.id}`, request);
          this.$toast.success('Cupom Editado')
        }else {
          await this.$api.post(`/categories`, request);
          this.$toast.success('Cupom Criado')
        }
        this.code = null;
        this.value = null;
        this.type = null;
        this.uses = null;
        this.id = null;
        this.dialog = false;
        await this.getAllUsers();
      } catch (error) {
        this.$toast.error('Erro')
      }
    },

    async getAllUsers() {
      try {
        const response = await this.$api.get('/cupoms');
        this.items = response.data;
      } catch (error) {
        this.$toast.error('Error')
      }
    },

    async destroy(item) {
      try {
      await this.$api.delete(`/cupoms/destroy/${item.id}`);
      await this.getAllUsers();
      this.$toast.success('Cupom Removido')
    }catch (error){
      this.$toast.error('Erro ao remover cupom')
    }
  },
 }
}
</script>

<style>

</style>