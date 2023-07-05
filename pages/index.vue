<template>
  <v-container>
    <v-div class="d-flex justify-center">
        <h1>
          Bem Vindos a CRStore
        </h1>
    </v-div>
    <h5
    class="d-flex justify-center"
    >Abaixo estão os Produtos disponiveis

    </h5>
    <v-row class="mt-5">
      <v-col>
        
        <v-dialog v-model="pagamentos">
          <v-card>
            Total= R${{ quantidade * preçotec}}
        <v-autocomplete
        v-model="name"
        class="mt-1"
              :items="fp"
                outlined
                color="black"
                placeholder="Forma de Pagamento"
                label="Forma de Pagamento"
                >
              </v-autocomplete>

              <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            block
            @click="orders1=true, persist()"

            >
            Cadastrar Pagamento
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
        <v-dialog v-model="orders1">
          <v-card>
            <v-text-field
                v-model="status"
                :items="st"
                outlined
                color="green"
                placeholder="Status do Pedido"
                label="Status do Pedido"
                disabled
              >
              </v-text-field>
              <v-text-field
                v-model="total"
                disabled
                outlined
                color="green"
                placeholder="Valor total do pedido"
                label="Valor total do pedido"
              >
              </v-text-field>
              <v-autocomplete
                v-model="idUserCostumer"
                outlined
                color="green"
                item-text="name"
                item-value="id"
                placeholder="ID do Comprador"
                :items="usuario.filter(user => user.role === 'Comprador')"
                label="Nome do Comprador"
              >
              </v-autocomplete>
              <v-autocomplete
                v-model="idUserDeliver"
                outlined
                item-text="name"
                item-value="id"
                :items="usuario.filter(user => user.role === 'Entregador')"
                color="green"
                placeholder="Nome do Entregador"
                label="Nome do Entregador"
              >
              </v-autocomplete>
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
                item-text="name"
                :items="pagamento"
                outlined
                color="green"
                placeholder="Forma do Pagamento"
                label="Forma do Pagamento"
                >
              </v-autocomplete>
              <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            block
            @click="persistOrder"

          >
            Cadastrar Pedido
          </v-btn>
        </v-card-actions>
      </v-card>
        </v-dialog>
      <v-dialog
      v-model="dialog"
      >
      <v-card>
        <v-text-field
        v-model="quantidade"
        class="mt-1"
                outlined
                color="black"
                placeholder="Informe a quantidade"
                label="Informe a quantidade"
                >
              </v-text-field>
              Total= R${{ total }}
              <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            block
            @click="pagamentos=true, dialog=false"
          >
            Comprar
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
      <v-dialog
      v-model="dialogo"
      overlay-color="black">
        <v-card>
        <v-text-field
        v-model="quantidade"
        class="mt-1"
                outlined
                color="black"
                placeholder="Informe a quantidade"
                label="Informe a quantidade"
                >
              </v-text-field>
              Total= R${{ total }}
              <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            block
            @click="pagamentos=true, dialog=false"
          >
            Comprar
          </v-btn>
        </v-card-actions>
      </v-card>
        </v-dialog>
        <v-dialog
  v-model="dialogoo"
        overlay-color="black">
        <v-card>
        <v-text-field
        v-model="quantidade"
        class="mt-1"
                outlined
                color="black"
                placeholder="Informe a quantidade"
                label="Informe a quantidade"
                >
              </v-text-field>
              Total= R${{ total }}
              <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            block
            @click="pagamentos=true, dialog=false"
          >
            Comprar
          </v-btn>
        </v-card-actions>
      </v-card>
        </v-dialog>
        <v-card
        class="mx-auto"
        max-width="344"
        outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          Mouse Gamer
        </v-list-item-title>
        <v-list-item-subtitle>CRUSADER RGB 7200DPI Preto Fortrek G COLORIDO</v-list-item-subtitle>
        <v-img
          max-height="300"
          src="data:image/jpeg;base64,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"/>
      </v-list-item-content>

    </v-list-item>

    <v-card-actions>
      <h4>Preço: R$ {{ preçomo }} </h4>
      <v-btn
      class="ml-5"
      outlined
      rounded
      color="green"
      @click="dialogo = true; clear()"
      ><v-icon>
        mdi-cart
      </v-icon>
      Compre Agora
    </v-btn>
    </v-card-actions>
  </v-card>
</v-col>
<v-col>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
    >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          Teclado Gamer
        </v-list-item-title>
        <v-list-item-subtitle>Teclado Mecânico Gamer Switch Blue Led Rgb 7 Cores Rainbow </v-list-item-subtitle>
        <v-img
        height="300" 
        src="https://m.media-amazon.com/images/I/61Tn5a431IL._AC_UL400_.jpg"/>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
<h4>Preço: R$ {{ preçotec }} </h4>
      <v-btn
      class="ml-5"
        outlined
        rounded
        color="green"
        @click="dialog=true;clear()"
        ><v-icon>
          mdi-cart
        </v-icon>
        Compre Agora
      </v-btn>
    </v-card-actions>
  </v-card>
</v-col>
<v-col>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          Headset
        </v-list-item-title>
        <v-list-item-subtitle>Headset Gamer Mancer Crater, Rainbow, Drivers 50mm, Preto, MCR-CRT-RGB01</v-list-item-subtitle>
        <v-img
        max-height="300" 
        src="data:image/webp;base64,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"/>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <h4>Preço: R$ {{preçohed }} </h4>
      <v-btn
      class="ml-5"
        outlined
        rounded
        color="green"
        @click="dialogoo=true; clear()"
      ><v-icon>
        mdi-cart
      </v-icon>
        Compre Agora
      </v-btn>
    </v-card-actions>
  </v-card>
</v-col>
</v-row>
</v-container>
</template>

<script >

export default {
  data(){
    return{
      pag:null,
      orders1: false,
      pagamentos:false,
      dialogo: false,
      dialogoo: false,
      quantidade: null,
      dialog: false,
      preçotec: 170.00,
      preçohed: 70.00,
      preçomo: 57.90,
      name: null,
      idPayment: null,
      search: null,
      cupoms: [],
      pagamento: [],
      st: ['Pedido Realizado'],
      items: [],
      usuario: [],
      idOrder: null,
      total: null,
      adress: [],
      fp: ['PIX','Débito','Crédito', 'Dinheiro'],
      status: 'Pedido Realizado',
      headers: [
        {
          text: 'Nome',
          value: 'name',
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
          text: 'ID do Comprador',
          value: 'idUserCostumer',
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

        { text: "", value: "actions", filterable: false},
      ]
    }
  },

  watch: {
    quantidade() {
      this.atribuiTotal();
    }
  },

  async created() {
    await this.getAllPayments();
    await this.getAllOrders();
    await this.getUsuarios();
    await this.getAdress();
    await this.getpag();
  },

  methods: {

    clear(){
      this.total = null;
      this.quantidade = null;
    },
    
    async getAllPayments() {
      try {
        const response = await this.$api.get('/payments');
        this.items = response.data;
      } catch (error) {
        this.$toast.error('Error')
      }
    },
    async getpag() {
      try {
        const response = await this.$api.get('/payments');
        this.pagamento = response.data;
      } catch (error) {
        this.$toast.error('Error')
      }
    },
    async getUsuarios() {
      try {
        const response = await this.$api.get('/user');
        this.usuario = response.data;
      } catch (error) {
        this.$toast.error('Error')
      }
    },
    
    async getAdress() {
      try {
        const response = await this.$api.get('/adresses');
        this.adress = response.data;
      } catch (error) {
        this.$toast.error('Error')
      }
    },

    async persistOrder() {
      try {
        const request = {
          idCupom: this.idCupom,
          idPayment: this.idPayment,
          idAdress: this.idAdress,
          idUserDeliver: this.idUserDeliver,
          idUserCostumer: this.idUserCostumer,
          totalDiscount: this.totalDiscount,
          total: this.total,
          status: 'Em Trânsito',
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
        this.status = 'Em trânsito';
        this.idOrder = null;
        await this.getAllOrders();
      } catch (error) {
        this.$toast.error('Erro')
      }
    },
    async getAllOrders() {
      try {
        const response = await this.$api.get('/orders');
        this.items = response.data;
      } catch (error) {
        this.$toast.error('Error')
      }
    },
    async persist() {
      try {
        const request = {
          name: this.name,
        }
        if (this.id) {
          await this.$api.patch(`/payments/${this.id}`, request);
          this.$toast.success('Pagamento Editado')
        }else {
          await this.$api.post(`/payments`, request);
          this.$toast.success('Pagamento Cadastrado')
        }
        this.name = null;
        await this.getAllPayments();
      } catch (error) {
        this.$toast.error('Erro')
      }
    },

    atribuiTotal() {
      this.total = this.quantidade * this.preçotec;
    }
    }
    }
</script>

<style>

</style>