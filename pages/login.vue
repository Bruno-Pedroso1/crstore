<template>
  <v-container class="d-flex justify-center text-center">
    <v-form>
      <img src="./admin/loja3.png" alt="" style="height: 10%;">
      <h1 style="height: 10%;">Faça seu login </h1>
      <v-text-field
      style="width: 350px;"
      solo
      outlined 
      label="E-mail"
      >
    </v-text-field>
    <div id="app">
      <v-app id="inspire">
        <v-form>
          <v-row>
            <v-col>
              <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Senha"
              counter
              solo
              outlined
              @click:append="show1 = !show1"
              ></v-text-field>
              <v-btn class="mr-3">Entrar</v-btn>
              <v-btn>Cadastrar </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-btn 
        class="mt-4"
        href="/"
        >Voltar a página inicial</v-btn>
  </v-app>
</div>
    </v-form>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      show1: false,
      show2: true,
      password: 'Password',
      rules: {
        required: value => !!value || 'Campo Obrigatório.',
        min: v => v.length >= 8 || 'Minimo 8 caracteres',
        emailMatch: () => ('Usuário ou senha inválidos'),
      },
    }
  },
}

</script>

<style>

</style>