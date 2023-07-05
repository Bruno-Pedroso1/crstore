<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row class="text-center">
          <v-col>
            <h1 style="font-size: 60px;">Cadastre-se</h1>
          </v-col>
        </v-row>
        <v-row class="justify-center">
            <img src="./loja3.png"/>
        </v-row>
      </v-col>
      <v-col>
        <v-card>
          <v-row>
            <v-col>
              <v-text-field
            v-model="name"
                outlined
                color="green"
                placeholder="Seu Nome"
                label="Seu Nome"
              >
            </v-text-field>
          <v-text-field
                v-model="username"
                outlined
                color="green"
                placeholder="Username"
                label="Username"
                >
              </v-text-field>
              <v-text-field
                v-model="cpf"
                outlined
                color="green"
                placeholder="CPF"
                label="CPF"
                >
              </v-text-field>
            </v-col>
            <v-col>

              <v-text-field
              v-model="phone"
                outlined
                color="green"
                placeholder="Telefone"
                label="Telefone"
                >
              </v-text-field>
              <v-autocomplete
                v-model="role"
                :items="cargo"
                outlined
                color="green"
                placeholder="Cargo"
                label="Cargo"
              >
            </v-autocomplete>
            <v-text-field
            v-model="email"
            outlined
            color="green"
            placeholder="E-mail"
            label="E-mail"
            >
          </v-text-field>
        </v-col>
      </v-row>
      <v-col>
      <v-text-field
          v-model="password"
          outlined
          color="green"
          placeholder="Senha"
          label="Senha"
          >
        </v-text-field>
    </v-col>  
      <v-col>
            <v-btn
            block
            color="green"
            @click="persist"
            >
            Cadastrar
          </v-btn>
        </v-col>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      cargo: ['Cliente','Entregador'],
    }
  }
}
</script>

<style>

</style>