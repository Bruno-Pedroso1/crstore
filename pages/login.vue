<template>
  <v-container class="d-flex justify-center text-center">
    <v-form 
    @submit.prevent="logna" 
    >
    <img 
      src="./admin/loja3.png" 
      style="height: 25%;">
    <h1 
      style="height: 10%;"
    >
    Faça seu login 
    </h1>
    <v-text-field
      v-model="login.username"
      label="Username"
      outlined
      required
      placeholder="Username"
      color="red"
      prepend-inner-icon="mdi-email"
      >
    </v-text-field>
    <div>
      <v-form
      @submit.prevent="logna"
      >
        <v-row>
          <v-col>
            <v-text-field 
              v-model="login.password"
              label="Senha"
              style="margin-top: -8%"
              solo
              outlined
              placeholder="Senha"
              color="red"
              :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
              :type="show ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock"
              @click:append="toggleShow"
              >
              </v-text-field>

            <v-btn 
              class="mr-3"
              @click="logna"
              >Entrar
            </v-btn>

            <v-btn
              href="/cadastro"
              >Cadastrar 
            </v-btn>

          </v-col>
        </v-row>
      </v-form>
    
      <v-btn 
        class="mt-5"
        href="/"
        >
        Voltar a página inicial
      </v-btn>

  </div>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data(){
    return{
      valid: false,
      show:false,
      login:{
        username: null,
        password: null
      },
      rule: [
        v => !!v || 'Esse campo é obrigatorio'
      ]
    }
  },
  methods:{

    async logna(){
      const forget ={
        username: this.login.username,
        password: this.login.password
      }
      try {
        const response = await this.$api.post('/users/login', forget)
        // eslint-disable-next-line eqeqeq
        if(response.data.type == "sucess"){
          localStorage.setItem("forget-key", response.data.data.token)
          this.$toast.success("Login efetuado com sucesso")
          this.$router.push("/")
        }else{
          this.$toast.error(response.data.message)
        }
      } catch (error) {
        this.$toast.error('Errol');
      }
    },
    toggleShow(){
      this.show = !this.show
    },
  }
}


</script>

<style>

</style>