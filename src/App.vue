<template>
  <div class="content">
    <div class="flex__container">
      <header v-if="view">
        <img src="./assets/logo.svg" width="50" alt="git search" />
        <p>Welcome to Cine Search!</p>
      </header>
      <main>
        <search v-if="view"></search>
        <h1 v-else>
          <i class="fas fa-heart"></i>
          Favoritos
        </h1>
        <card></card>
      </main>
    </div>
    <div class="bottom-menu">
      <button type="button" class="btn-menu-bottom" @click="changeView(true)">
        <i class="fas fa-th-list"></i> Listagem
      </button>
      <button type="button" class="btn-menu-bottom" @click="changeView(false)">
        <i class="fas fa-heart"></i> Favoritos
      </button>
    </div>
  </div>
</template>

<script>
import card from "@/components/card__list.vue";
import search from "@/components/search.vue";

export default {
  data: () => ({
    menu: true
  }),
  components: {
    card,
    search
  },
  methods: {
    changeView(status) {
      this.$store.commit("SET_VIEW", status);
      if (!status) {
        const movies = JSON.parse(localStorage.getItem("movies"));
        if (movies) {
          this.$store.commit("SET_MOVIES", movies);
        } else {
          this.$store.commit("SET_MOVIES", []);
        }
      } else {
        this.$store.commit("SET_MOVIES", []);
      }
    }
  },
  computed: {
    view() {
      return this.$store.state.view;
    }
  }
};
</script>

<style scoped>
.content {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
}
.flex__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
}
header {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  animation: fade__in 600ms backwards;
  animation-delay: 500ms;
}
main {
  animation: intro__left 500ms backwards;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-weight: 400;
  font-size: 1.2rem;
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bottom-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: white;
  box-shadow: -1px -2px 14px 0px #00000012;
  display: flex;
}

.btn-menu-bottom {
  width: 50%;
  background: none;
  border: unset;
  cursor: pointer;
  color: darkgrey;
  font-family: "Montserrat", sans-serif !important;
}
.btn-menu-bottom:focus {
  color: black;
  outline: none;
}
.btn-menu-bottom:hover {
  background: aliceblue;
}

@keyframes fade__in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes intro__left {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  70% {
    transform: translateX(5);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
