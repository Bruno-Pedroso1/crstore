<template>
  <v-container>
    <v-row
      class="d-flex justify-center"
    >
      <div
        class="text-center"
      >
        <h1>
          Bem-vindo Admin
        </h1>
        <img
          src="../admin/loja3.png"
          style="width: 190px; height: 90px;"
          >
        </div>
    </v-row>
    <v-row>
      <v-col>
      <v-card
        rounded="xl"
        class="mx-auto"
        max-width="344"
        color="black"
        outlined
      >
    <v-list-item-content>
        <v-list-item-title 
          class="text-h5 mb-1 text-center"
        >
          Cadastrar Usuario
          <v-icon 
            size="35"
          >
            mdi-account
          </v-icon>
        </v-list-item-title>
      </v-list-item-content>
      <v-card-actions>
        <v-btn
          href="/admin/user"
          outlined
          rounded
          text
          block
        >
          Acessar
      </v-btn>
    </v-card-actions>
      </v-card>
    </v-col>
    <v-col>
      <v-card
        rounded="xl"
        class="mx-auto"
        max-width="344"
        color="black"
        outlined
      >
    <v-list-item-content>
        <v-list-item-title 
          class="text-h5 mb-1 text-center"
          >
          Cadastrar Categoria
          <v-icon 
            size="35"
          >
            mdi-library-shelves
        </v-icon>
        </v-list-item-title>
      </v-list-item-content>
      <v-card-actions>
        <v-btn
          href="/admin/categories"
          outlined
          rounded
          text
          block
      >
        Acessar
      </v-btn>
    </v-card-actions>
      </v-card>
    </v-col>
    <v-col>
      <v-card
        rounded="xl"
        class="mx-auto"
        max-width="344"
        color="black"
        outlined
      >
    <v-list-item-content>
        <v-list-item-title
          class="text-h5 mb-1 text-center"
        >
          Cadastrar Cupom
          <v-icon 
            size="35"
          >
            mdi-cart-percent
      </v-icon>
        </v-list-item-title>
      </v-list-item-content>
      <v-card-actions>
        <v-btn
          href="/admin/cupoms"
          outlined
          rounded
          text
          block
        >
          Acessar
      </v-btn>
    </v-card-actions>
      </v-card>
    </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          rounded="xl"
          class="mx-auto"
          max-width="344"
          color="black"
          outlined
        >
    <v-list-item-content>
        <v-list-item-title
          class="text-h5 mb-1 text-center"
        >
          Cadastrar Pagamento
          <v-icon
            size="35"
          > 
            mdi-credit-card-outline
        </v-icon>
        </v-list-item-title>
      </v-list-item-content>
      <v-card-actions>
        <v-btn
          href="/admin/payments"
          outlined
          rounded
          text
          block
        >
          Acessar
      </v-btn>
    </v-card-actions>
      </v-card>
      </v-col>
      <v-col>
        <v-card
          rounded="xl"
          class="mx-auto"
          max-width="344"
          color="black"
          outlined
        >
    <v-list-item-content>
        <v-list-item-title
          class="text-h5 mb-1 text-center"
        >
          Cadastrar Endereço
          <v-icon 
            size="35"
          > 
            mdi-home-account
        </v-icon>
        </v-list-item-title>
      </v-list-item-content>
      <v-card-actions>
        <v-btn
          href="/admin/adresses"
          outlined
          rounded
          text
          block
        >
          Acessar
      </v-btn>
    </v-card-actions>
      </v-card>
      </v-col>
      <v-col>
        <v-card
          rounded="xl"
          class="mx-auto"
          max-width="344"
          color="black"
          outlined
        >
    <v-list-item-content>
        <v-list-item-title
          class="text-h5 mb-1 text-center"
        >
          Cadastrar Produto
          <v-icon
            size="35"
          >
            mdi-shopping-outline
          </v-icon>
        </v-list-item-title>
      </v-list-item-content>
      <v-card-actions>
        <v-btn
          href="/admin/products"
          outlined
          rounded
          text
          block
        >
          Acessar
      </v-btn>
    </v-card-actions>
      </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          rounded="xl"
          class="mx-auto"
          max-width="344"
          color="black"
          outlined
        >
    <v-list-item-content>
        <v-list-item-title
          class="text-h5 mb-1 text-center"
        >
          Cadastrar Pedido
          <v-icon
            size="35"
          >
            mdi-cart
        </v-icon>
        </v-list-item-title>
      </v-list-item-content>
      <v-card-actions>
        <v-btn
          href="/admin/orders"
          outlined
          rounded
          text
          block
        >
          Acessar
      </v-btn>
    </v-card-actions>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>




<script>
export default {

}
</script>

<style>

</style>