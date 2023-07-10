<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
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
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn
      href="/login">
        <v-icon>
          mdi-account
        </v-icon>
        Fazer Login
      </v-btn>

    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
      {
          icon: 'mdi-home-account',
          title: 'Página Inicial CRStore',
          to: '/',
        },
        {
          icon: 'mdi-shield-crown',
          title: 'ADMIN CRStore',
          to: '/admin/adminFront',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'CRStore',
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
