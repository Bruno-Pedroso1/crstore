<template>
  <v-app
    dark
  >
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
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
    >
    <v-app-bar-nav-icon 
      @click.stop="drawer = !drawer"
    />
    <v-btn
      icon @click.stop="miniVariant = !miniVariant"
    >
      <v-icon>
        mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}
      </v-icon>
    </v-btn>
    <v-spacer></v-spacer>
      Bem Vindo {{ user.name }}
    <v-spacer/>
        <v-btn
          v-if="logado && $route.path !== '/login'"
          @click="sairConta"
        >
          sair
        </v-btn>
      <v-btn
        v-if="!logado && $route.path !== '/login'"
        to="/login"
      >
        fazer login
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>
        &copy; CRSTORE - Loja de Eletrônicos
      </span>
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
      logado: false,
      user: {
        username: null,
        role: null,
        name: null,
      },
      items: [
      {
        icon: 'mdi-home-account',
        title: 'Página Inicial CRStore',
        to: '/',
      },
      {
        icon: 'mdi-shield-crown',
        title: 'ADMIN CRStore',
        to: '/admin/adminFront'
      }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'CRStore',
    }
  },
  
  async created() {
    await this.getUserByToken();
  },

  methods: {
    async getUserByToken() {
      const { data } = await this.$api.get('/users/by-token');
      if (data) {
        this.user = {
          username: data.username,
          role: data.role,
          name: data.name,
        };
        this.logado = true;
        if(!(this.user.role) || this.user.role !== 'admin') {
          this.items.pop();
        };
      }
    },
    sairConta() {
      this.logado = false;
      localStorage.removeItem('forget-key');
      this.$router.push('/login');
    },
  },


  }
</script>
