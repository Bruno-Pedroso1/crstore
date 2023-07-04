<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/v-slot-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">
          Cadastro de Endereços
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
                placeholder="ID do Endereço"
                label="ID do Endereço"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="zipCode"
                outlined
                color="green"
                placeholder="CEP"
                label="CEP"
              >
              </v-text-field>
              <v-text-field
                v-model="state"
                outlined
                color="green"
                placeholder="Estado"
                label="Estado"
              >
              </v-text-field>
              <v-text-field
                v-model="city"
                outlined
                color="green"
                placeholder="Cidade"
                label="Cidade"
              >
              </v-text-field>
              <v-text-field
                v-model="street"
                outlined
                color="green"
                placeholder="Rua"
                label="Rua"
              >
              </v-text-field>
              <v-text-field
                v-model="district"
                outlined
                color="green"
                placeholder="Distrito"
                label="Distrito"
              >
              </v-text-field>
              <v-text-field
                v-model="numberForget"
                outlined
                color="green"
                placeholder="Número"
                label="Número"
              >
              </v-text-field>
              <v-autocomplete
                v-model="idUser"
                item-value="id"
                item-text="name"
                :items="usuario"
                outlined
                color="green"
                placeholder="Nome do Usuário"
                label="Nome do Usuário"
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
      usuario: [],
      items: [],
      dialog: false,
      id: null,
      idUser: null,
      numberForget: null,
      district: null,
      street: null,
      city: null,
      state: null,
      zipCode: null,
      headers: [
        {
          text: 'ID',
          value: 'id',
          align: 'center'
        },
        {
          text: 'CEP',
          value: 'zipCode',
          align: 'center'
        },
        {
          text: 'Estado',
          value: 'state',
          align: 'center'
        },
        {
          text: 'Cidade',
          value: 'city',
          align: 'center'
        },
        {
          text: 'Rua',
          value: 'street',
          align: 'center'
        },
        {
          text: 'Distrito',
          value: 'district',
          align: 'center'
        },
        {
          text: 'Número',
          value: 'numberForget',
          align: 'center'
        },
        {
          text: 'ID do Usuário',
          value: 'idUser',
          align: 'center'
        },
        { text: "", value: "actions", filterable: false},
      ]
    }
  },
  async created() {
    await this.getAllUsers();
    await this.getUsuario();
  },

  methods: {
    clear() {
      this.id = null;
      this.idUser = null;
      this.numberForget = null;
      this.district = null;
      this.street = null;
      this.city = null;
      this.state = null;
      this.zipCode = null;
    },

    update(item) {
      this.id = item.id;
      this.idUser = item.idUser;
      this.numberForget = item.numberForget;
      this.district = item.district;
      this.street = item.street;
      this.city = item.city;
      this.state = item.state;
      this.zipCode = item.zipCode
      this.dialog = true;
    },

    async persist() {
      try {
        const request = {
          zipCode: this.zipCode,
          state: this.state,
          city: this.city,
          street: this.street,
          district: this.district,
          numberForget: this.numberForget,
          idUser: this.idUser,
        }
        if (this.id) {
          await this.$api.patch(`/adresses/${this.id}`, request);
          this.$toast.success('Endereço Editado')
        }else {
          await this.$api.post(`/adresses/`, request);
          this.$toast.success('Endereço Cadastrado')
        }
        this.zipCode = null;
        this.idUser = null;
        this.numberForget = null;
        this.district = null;
        this.street = null;
        this.city = null;
        this.state = null;
        this.id = null;
        this.dialog = false;
        await this.getAllUsers();
      } catch (error) {
        this.$toast.error('Erro')
      }
    },

    async getAllUsers() {
      try {
        const response = await this.$api.get('/adresses');
        this.items = response.data;
      } catch (error) {
        this.$toast.error('Error')
      }
    },
    async getUsuario() {
      try {
        const response = await this.$api.get('/user');
        this.usuario = response.data;
      } catch (error) {
        this.$toast.error('Error')
      }
    },

    async destroy(item) {
      try {
      await this.$api.delete(`/adresses/destroy/${item.id}`);
      await this.getAllUsers();
      this.$toast.success('Endereço Removido')
    }catch (error){
      this.$toast.error('Erro ao remover endereço')
    }
  },
 }
}
</script>

<style>

</style>