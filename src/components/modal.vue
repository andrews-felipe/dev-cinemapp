<template>
  <div>
    <div class="container__card">
      <div class="card">
        <div class="container__img">
          <img :src="currentUser.avatar_url" alt />
        </div>
        <p v-show="loading" id="loading">Carregando...</p>
        <div class="info" v-show="!loading">
          <div class="head__principal">
            <p id="name">{{name}}</p>
            <img @click="goToGithub()" width="25" src="@/assets/gh-logo.svg" alt />
          </div>
          <p>
            <b>Local:</b>
            {{location}}
          </p>
          <p>
            <b>Empresa:</b>
            {{company}}
          </p>
          <b>Tecnologias:</b>
          <div class="tech__list">
            <p id="techs" v-for="tech of techs" v-bind:key="tech">{{tech}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="background__modal" @click="hideModal()"></div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data: () => ({
    techs: [],
    company: "",
    name: "",
    location: "",
    loading: true
  }),
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  mounted() {
    Axios.get(this.currentUser.repos_url).then(res => {
      res.data.forEach(repo => {
        if (!this.techs.includes(repo.language) && repo.language != null) {
          this.techs.push(repo.language);
        }
      });
    });

    Axios.get(this.currentUser.url).then(res => {
      const { company, name, location } = res.data;
      this.company = company;
      this.name = name;
      this.location = location;
      this.loading = false;
    });
  },
  methods: {
    hideModal() {
      this.$emit("hide");
    },
    goToGithub() {
      let win = window.open(this.currentUser.html_url, "_blank");
      win.focus();
    }
  }
};
</script>

<style lang="scss" scoped>
.container__card {
  position: fixed;
  left: 30%;
  top: 4%;
  background: white;
  width: 40%;
  z-index: 3;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 20px 10px #00000017;
  animation: intro .3s ease-in-out forwards;
}
.container__img img {
  width: 100%;
}
#name {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 5px;
}
.background__modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #00000078;
}
.tech__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  p {
    margin: 3px;
    margin-right: 7px;
  }
}
.info {
  padding: 15px;
  text-align: center;
}
.head__principal {
  display: flex;
  justify-content: center;
  cursor: pointer;
}
#loading {
  padding: 4rem;
  text-align: center;
}


</style>