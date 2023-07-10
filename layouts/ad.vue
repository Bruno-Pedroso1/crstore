<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      color="white"
      app
    >
    <v-list-group
    v-if="help"
        color="red"
        :value="true"
        prepend-icon="mdi-account-circle"
      >
        <template #activator>
          <v-list-item-title>{{user[0].title}}</v-list-item-title>
        </template>
        <v-list-group
        color="red"
        :value="true"
        prepend-icon="mdi-data"
        > 
        <template #activator>
          <v-list-item-title style="">Meus Dados</v-list-item-title>
        </template>
          <v-list-item
            color="red"
            to="/data"
          >
            Informações
          </v-list-item>
          <v-list-item
            color="red"
            to="/public/user/data/password"
          >
            Trocar senha
          </v-list-item>
          <v-list-item
          color="red"
          to="/public/user/adress"
        >
          Meus Endereços
        </v-list-item>
        </v-list-group>
        <v-list-item
          color="red"
          to="/public/user/order"
        >
          <strong>Meus Pedidos</strong>
        </v-list-item>
        <v-list-item
          color="red"
          @click="logout"
        >
          <strong>Logout</strong>
        </v-list-item>
      </v-list-group>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            // eslint-disable-next-line vue/no-v-text-v-html-on-component
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list-group
      v-if="entregador"
        color="red"
        :value="true"
        prepend-icon="mdi-car"
      >
        <template #activator>
          <v-list-item-title>
            Entregador
          </v-list-item-title>
        </template>
        <v-list-item
          color="red"
          to="/public/user/deliver/deliver"
        >
        <v-list-item-action>
          <v-icon>{{ "mdi-atv"}}</v-icon>
        </v-list-item-action>
          Entregas Disponiveis
        </v-list-item>
        <v-list-item
          color="red"
          to="/public/user/deliver/catched"
        >
        <v-list-item-action>
          <v-icon>{{ "mdi-bike-fast"}}</v-icon>
        </v-list-item-action>
          Entregas em andamento
        </v-list-item>
        <v-list-item
          color="red"
          to="/public/user/deliver/delivered"
        >
        <v-list-item-action>
          <v-icon>{{ "mdi-check"}}</v-icon>
        </v-list-item-action>
          Pedidos entregues
        </v-list-item>
      </v-list-group>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      elevation="0"
      hide-on-scroll
      color="white"
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        outlined
        to="/public/user/cart"
        color="white"
      >
      <v-icon style="margin-right: 2%;color:black" >
        {{ "mdi-cart" }}
      </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      help: false,
      entregador: false,
      user: [],
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to:'/'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'CRStore'
    }
  },
  async created () {
    await this.validateLoginAdmin();
  },

  methods: {
    logout(){
      try {
        localStorage.setItem('forget-key', "")
        return this.$router.push({ name: 'login' });
      } catch (error) {
        return this.$toast.info('Erro');
      }
    },
    async validateLoginAdmin (){
      const token = localStorage.getItem('forget-key')
      if(!token){
        this.items.unshift({
          icon: 'mdi-account',
          title: 'Login',
          to: '/login'
        })
        return this.$toast.info('Bem vindo anônimo');
      }
      const response = await this.$axios.post('http://localhost:3333/users/verify-token', {"authorization": `Bearer ${token}`})
      // eslint-disable-next-line eqeqeq
      if(response.data.role == "deliver"){
        this.entregador= true
      }
      // eslint-disable-next-line eqeqeq
      if (response.data.type == 'unauthorized') {
        this.$toast.info('Bem vindo a Lojinha!');
        this.help = true
        this.user.unshift({
          title: `Olá ${response.data.name}`,
        }
        )
        return this.$router.push({ name: 'index'});
      // eslint-disable-next-line eqeqeq
      }else if(response.data.type == 'expired'){
        this.$toast.info('Sua sessão expirou faça login novamente');
        this.items.unshift({
          icon: 'mdi-account',
          title: 'Login',
          to: '/login'
        })
      }else{
        this.$toast.success("Bem vindo chefinho!")
        this.help = true
        this.user.unshift({
          icon: 'mdi-account',
          title: `Olá ${response.data.name}`,
          to: '/user'
        })
        this.items.push({
          icon: 'mdi-credit-card',
          title: 'Pagamentos',
          to: '/admin/payments'
        },
        {
          icon: 'mdi-database',
          title: 'categorias',
          to: '/admin/categories',
        },
        {
          icon: 'mdi-food',
          title: 'produtos',
          to:'/admin/products'
        },
        {
          icon: 'mdi-card',
          title: 'Cupons',
          to:'/admin/cupoms'
        },
        {
          icon: 'mdi-notebook',
          title: 'Pedidos',
          to:'/admin/orders'
        })
      }
    } 
  }
}
</script>