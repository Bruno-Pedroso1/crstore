<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/v-slot-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1
          class="d-flex align-center flex-column"
        >
          Cadastro de Pedidos
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
          <template
            #item:actions="{ item }"
          >
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
    <v-dialog
      v-model="dialog"
    >
      <v-card>
        <v-card-title>
          <v-row>
            <v-col
              cols="2"
            >
              <v-text-field
                v-model="idOrder"
                outlined
                disabled
                color="green"
                placeholder="ID do Pedido"
                label="ID do Pedido"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="status"
                :items="st"
                outlined
                color="green"
                placeholder="Status do Pedido"
                label="Status do Pedido"
              >
              </v-autocomplete>
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
              <!-- <v-autocomplete
                v-model="idUserCostumer"
                outlined
                color="green"
                item-text="name"
                item-value="id"
                placeholder="ID do Comprador"
                :items="user.filter(user => user.role === 'Comprador')"
                label="Nome do Comprador"
              >
              </v-autocomplete>
              <v-autocomplete
                v-model="idUserDeliver"
                outlined
                item-text="name"
                item-value="id"
                :items="user.filter(user => user.role === 'Entregador')"
                color="green"
                placeholder="Nome do Entregador"
                label="Nome do Entregador"
              >
              </v-autocomplete> -->
              <v-autocomplete
                v-model="idAdress"
                item-value="id"
                item-text="id"
                :items="adress"
                outlined
                color="green"
                placeholder="ID do Endereço"
                label="ID do Endereço"
              >
              </v-autocomplete>
              <v-autocomplete
                v-model="idPayment"
                item-value="id"
                item-text="id"
                :items="payments"
                outlined
                color="green"
                placeholder="ID do Pagamento"
                label="ID do Pagamento"
              >
              </v-autocomplete>
              <v-autocomplete
                v-model="idCupom"
                item-value="id"
                item-text="code"
                :items="cupoms"
                outlined
                color="green"
                placeholder="Código do Cupom"
                label="Código do Cupom"
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
      cupoms: [],
      pagamento: [],
      st: ['Finalizado', 'Em trânsito', 'Pronto para retirada', 'Cancelado'],
      items: [],
      usuario: [],
      dialog: false,
      idOrder: null,
      name: null,
      payments: [],
      order: null,
      adress: [],
      user: {},
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
          text: 'ID do Comprador',
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
    await this.getAllOrders();
    await this.getUsuarios();
    await this.getAdress();
    await this.getPayment();
    await this.getCupom();
  },

  methods: {

    clear() {
      this.idCupom = null;
      this.id = null;
      this.idPayment = null;
      this.idAdress = null;
      this.idUserCostumer = null;
      this.idUserDeliver = null;
      this.totalDiscount = null;
      this.total = null;
      this.status =null;
    },
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
          status: this.status,
          total: this.total,
          totalDiscount: this.totalDiscount,
          idUserCostumer: this.idUserCostumer,
          idUserDeliver: this.idUserDeliver,
          idAdress: this.idAdress,
          idPayment: this.idPayment,
          idCupom: this.idCupom,
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
        this.idOrder = null;
        this.dialog = false;
        await this.getAllOrders();
      } catch (error) {
        this.$toast.error('Erro')
      }
    },

    async getAllOrders (){
      try {
        const order = await this.$api.$get(`/orders`);
        this.items = order;
      } catch (error) {
        return this.$toast.error('Erro');
      }
    },

    async getUsuarios (){
      try {
        const user = await this.$api.$get(`/user`)
        this.user = user
      } catch (error) {
        return this.$toast.error(error.message);
      }
    },
    async getAdress (){
        const adress = await this.$api.$get(`/adresses`)
        this.adress = adress
    },
    async getPayment (){
        const payments = await this.$api.$get(`/payments`)
        this.payments = payments
    },
    async getCupom (){
        const cupoms = await this.$api.$get(`/cupoms`)
        this.cupoms = cupoms
    },

    async destroy(item) {
      try {
        await this.$api.delete(`/orders/destroy/${item.id}`);
        await this.getAllOrders();
        this.$toast.success('Pedido Removido')
      } catch (error){
        this.$toast.error('Erro ao remover pedido')
      }
    },
}
}
</script>

<style>

</style>