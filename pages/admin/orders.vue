<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/v-slot-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="d-flex align-center flex-column">
          Cadastro de Pedidos
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
                placeholder="ID do Pedido"
                label="ID do Pedido"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="status"
                outlined
                color="green"
                placeholder="Status do Pedido"
                label="Status do Pedido"
              >
              </v-text-field>
              <v-text-field
                v-model="total"
                outlined
                color="green"
                placeholder="Valor total do pedido"
                label="Valor total do pedido"
              >
              </v-text-field>
              <v-text-field
                v-model="totalDiscount"
                outlined
                color="green"
                placeholder="Valor do desconto"
                label="Valor do desconto"
              >
              </v-text-field>
              <v-text-field
                v-model="idUserCostumer"
                outlined
                color="green"
                placeholder="ID do Consumidor"
                label="ID do Consumidor"
              >
              </v-text-field>
              <v-text-field
                v-model="idUserDeliver"
                outlined
                color="green"
                placeholder="ID do Entregador"
                label="ID do Entregador"
              >
              </v-text-field>
              <v-text-field
                v-model="idAdress"
                outlined
                color="green"
                placeholder="ID do Endereço"
                label="ID do Endereço"
              >
              </v-text-field>
              <v-text-field
                v-model="idPayment"
                outlined
                color="green"
                placeholder="ID do Pagamento"
                label="ID do Pagamento"
              >
              </v-text-field>
              <v-text-field
                v-model="idCupom"
                outlined
                color="green"
                placeholder="ID do Cupom"
                label="ID do Cupom"
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
      id: null,
      name: null,
      headers: [
        {
          text: 'ID',
          value: 'id',
          align: 'center'
        },
        {
          text: 'Status',
          value: 'status',
          align: 'center'
        },
        {
          text: 'Valor Total do pedido',
          value: 'total',
          align: 'center'
        },
        {
          text: 'Desconto Total',
          value: 'totalDiscount',
          align: 'center'
        },
        {
          text: 'ID do Consumidor',
          value: 'idUserCostumer',
          align: 'center'
        },
        {
          text: 'ID do Entregador',
          value: 'idUserDeliver',
          align: 'center'
        },
        {
          text: 'ID do Endereço',
          value: 'idAdress',
          align: 'center'
        },
        {
          text: 'ID do Pagamento',
          value: 'idPayment',
          align: 'center'
        },
        {
          text: 'ID do Cupom',
          value: 'idCupom',
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
      this.idCupom = item.idCupom;
      this.id = item.id;
      this.idPayment = item.idPayment;
      this.idAdress = item.idAdress;
      this.idUserDeliver = item.idUserDeliver;
      this.idUserCostumer = item.idUserCostumer;
      this.totalDiscount = item.totalDiscount;
      this.total = item.total;
      this.status = item.status;
      this.dialog = true;
    },

    async persist() {
      try {
        const request = {
          idCupom: this.idCupom,
          idPayment: this.idPayment,
          idAdress: this.idAdress,
          idUserDeliver: this.idUserDeliver,
          idUserCostumer: this.idUserCostumer,
          totalDiscount: this.totalDiscount,
          total: this.total,
          status: this.status
        }
        if (this.id) {
          await this.$api.patch(`/orders/${this.id}`, request);
          this.$toast.success('Pedido Editado')
        }else {
          await this.$api.post(`/orders`, request);
          this.$toast.success('Pedido Cadastrado')
        }
        this.idCupom = null;
        this.idPayment = null;
        this.idAdress = null;
        this.idUserCostumer = null;
        this.idUserDeliver = null;
        this.totalDiscount = null;
        this.total = null;
        this.status = null;
        this.id = null;
        this.dialog = false;
        await this.getAllUsers();
      } catch (error) {
        this.$toast.error('Erro')
      }
    },

    async getAllUsers() {
      try {
        const response = await this.$api.get('/orders');
        this.items = response.data;
      } catch (error) {
        this.$toast.error('Error')
      }
    },

    async destroy(item) {
      try {
      await this.$api.delete(`/orders/destroy/${item.id}`);
      await this.getAllUsers();
      this.$toast.success('Pedido Removido')
    }catch (error){
      this.$toast.error('Erro ao remover pedido')
    }
  },
 }
}
</script>

<style>

</style>