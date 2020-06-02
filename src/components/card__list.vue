<template>
  <div id="page">
    <!-- card wors -->
    <div id="container__spinner" v-if="stateRequest">
      <span id="first">
        <i class="fa fa-search flip"></i>
      </span>
      <span>
        <i class="fa fa-search flip"></i>
      </span>
    </div>

    <div class="container__card flex" v-else>
      <div class="card" v-for="movie of movies" v-bind:key="movie.imdbID">
        <div class="area-to-btn" @mouseover="current = movie">
          <favorite v-on:add-favorite="save()" v-on:remove-favorite="remove()"></favorite>
        </div>
        <div class="container__img">
          <img :src="movie.Poster" alt />
        </div>
        <div class="info">
          <p class="name">{{movie.Title}}</p>
          <p>Ano: {{movie.Year}}</p>
          <p>Categoria: {{movie.Type}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import favorite from "@/components/favorite.vue";
export default {
  data: () => ({
    screenModal: false,
    current: {}
  }),
  components: {
    favorite
  },
  computed: {
    movies() {
      return this.$store.state.movies;
    },
    stateRequest() {
      return this.$store.state.stateRequest;
    }
  },
  methods: {
    save() {
      let movies = [];
      try {
        let movie_list = JSON.parse(localStorage.getItem("movies"));
        movies = [...movie_list];
      } catch (e) {
        console.error(e);
      }
      movies.push(this.current);
      localStorage.setItem("movies", JSON.stringify(movies));
    },
    remove() {
      try {
        let movie_list = JSON.parse(localStorage.getItem("movies"));
        movie_list = movie_list.filter(item => {
          return item.imdbID !== this.current.imdbID;
        });
        localStorage.setItem("movies", JSON.stringify(movie_list));
        this.build()
      } catch (e) {
        console.error(e);
      }
    },
    build() {
      const movies = JSON.parse(localStorage.getItem("movies"));
      if (movies) {
        this.$store.commit("SET_MOVIES", movies);
      }
    }
  },
  mounted() {
    this.build();
  }
};
</script>

<style lang="scss" scoped>
#page {
  display: flex;
  justify-content: center;
}
#container__spinner {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  span {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 2rem;
    color: rgb(216, 216, 216);
    animation: pulse 1s ease-in-out infinite;
  }

  #first {
    font-size: small;
    left: 48%;
  }
}
.area-to-btn {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
}
.area-to-btn:hover {
  background: rgba(0, 0, 0, 0.582);
  opacity: 1;
}
.info {
  padding: 0px 0px 0px 15px;
}

.container__card {
  animation: intro 0.2s ease-in-out forwards;
  margin: 3rem 0rem 3rem 0rem;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;

  .card {
    position: relative;
    width: 270px;
    height: 390px;
    background: #fff;
    overflow: hidden;
    margin: 15px;
    border-radius: 5px;
    box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    .name {
      font-weight: 600;
    }

    .container__img {
      width: 100%;
      height: 15rem;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      background: black;

      img {
        width: 100%;
      }
    }
  }

  .card:hover {
    background-clip: rgba(0, 0, 0, 0.459);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.5, 1.5);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>