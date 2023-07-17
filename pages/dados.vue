<template>
  <v-container>
    <p class="text-center" style="font-size: xx-large;">
      Meus Dados
    </p>
    <v-row>
      <v-col>
        <v-card>
          Nome: {{ user.name }}
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          Username: {{ user.username }}
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          E-mail: {{ user.email }}
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          CPF: {{ user.cpf }}
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          Telefone: {{ user.phone }}
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-btn block class="mt-5" @click="editar = true">
        Editar Informações
      </v-btn>
    </v-row>


    <v-dialog v-model="editar">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="2">
            </v-col>
            <v-col>
              <v-text-field v-model="name" outlined color="green" placeholder="Nome do Usuario" label="Nome do Usuario">
              </v-text-field>
              <v-text-field v-model="username" outlined color="green" placeholder="Username" label="Username">
              </v-text-field>
              <v-text-field v-model="cpf" v-mask="'###.###.###-##'" outlined color="green" placeholder="###.###.###-##"
                label="CPF">
              </v-text-field>
              <v-text-field v-model="phone" v-mask="'(##)#####-####'" outlined color="green" placeholder="(##)#####-####"
                label="Telefone">
              </v-text-field>
              <v-text-field v-model="email" outlined color="green" placeholder="E-mail" label="E-mail">
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="persist">
            Salvar Alterações
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {

  data() {
    return {
      editar: false,
      id: null,
      items: [],
      logado: false,
      name: null,
      username: null,
      phone: null,
      email: null,
      cpf: null,
      user: {
        token: null,
        username: null,
        role: null,
        name: null,
        email: null,
        cpf: null,
        phone: null,
      },
      headers: [
        {
          text:'ID',
          value: 'id',
          align: 'center'
        },
        {
          text: 'Nome',
          value: 'name',
          align: 'center'
        },
        {
          text: 'Username',
          value: 'username',
          align: 'center'
        },
        {
          text: 'Telefone',
          value: 'phone',
          align: 'center'
        },
        {
          text: 'E-mail',
          value: 'email',
          align: 'center'
        },
        {
          text: 'CPF',
          value: 'cpf',
          align: 'center'
        },]
    }
  },
  async created() {
    await this.getUserByToken();
  },

  methods: {

    update(item) {
      this.id = item.id
      this.name = item.name;
      this.username = item.username;
      this.cpf = item.cpf;
      this.phone = item.phone;
      this.email = item.email;
      this.dialog = true;
    },


    async getUserByToken() {
      const { data } = await this.$api.get('/users/by-token');
      if (data) {
        this.user = data;
        this.logado = true;
      }
    },
    async persist() {
      try {
        const request = {
          name: this.name,
          cpf: this.cpf,
          email: this.email,
          username: this.username,
          phone: this.phone,
        }
        
          await this.$api.patch(`/users/${this.user.id}`, request);
          this.$toast.success('Usuario Editado');        
        this.editar = false;
      } catch (error) {
        this.$toast.error('1Erro')
      }
    },
  }
}
</script>

<style></style>