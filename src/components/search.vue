<template>
  <div class="input__search">
    <div class="custom__select">
      <div class="select-box">
        <div class="select-box__current" tabindex="1">
          <div
            class="select-box__value"
            v-for="(item, index) of searchTypes"
            v-bind:key="item.name"
          >
            <input
              class="select-box__input"
              type="radio"
              :id="index"
              :value="index+1"
              name="Ben"
              checked="checked"
              @change="typeSelected = item"
            />
            <p class="select-box__input-text">{{item.name}}</p>
          </div>
          <img
            class="select-box__icon"
            src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
            alt="Selecionar"
            aria-hidden="true"
          />
        </div>
        <ul class="select-box__list">
          <li v-for="(_item,index) of searchTypes" v-bind:key="_item.name">
            <label class="select-box__option" :for="index" aria-hidden="aria-hidden">{{_item.name}}</label>
          </li>
        </ul>
      </div>
    </div>
    <input
      v-model="textParam"
      v-on:input="keepTimeToCallSearch(); setStateRequest()"
      :type="typeSelected.type"
    />
    <button type="submit" @click="keepTimeToCallSearch(); setStateRequest()">
      <i class="fa fa-search flip"></i>
    </button>
  </div>
</template>

<script>
import http from "../services/http";
import _ from "lodash";

export default {
  data: () => ({
    searchTypes: [
      { name: "Filmes", value: "type=movie&s=", type: "text" },
      { name: "Séries", value: "type=series&s=", type: "text" },
    ],
    typeSelected: {},
    textParam: ""
  }),
  methods: {
    keepTimeToCallSearch: _.debounce(function() {
      this.search();
    }, 1000),

    search() {
      if (this.textParam.length > 1 || this.typeSelected.type == "number") {
        this.textParam.trim();

        const query = `${this.typeSelected.value}${this.textParam}`;

        http.getBy(query).then(res => {
          this.$store.commit("SET_MOVIES", res.data.Search);
          this.$store.commit("SET_STATE_REQUEST", false);
        });
      }
    },
    setStateRequest() {
      if (!this.$store.state.stateRequest) {
        this.$store.commit("SET_STATE_REQUEST", true);
      }
    }
  },
  mounted() {
    this.typeSelected = this.searchTypes[0];
  }
};
</script>

<style lang="scss" scoped>
.custom__select {
  width: 25%;
}
.input__search {
  width: 100%;
  display: flex;
  background: #ffffff;
  box-shadow: 0 15px 30px -10px transparentize(#000, 0.9);
  justify-content: space-between;
  z-index: 1;
}
input {
  border: unset;
  width: 62%;
  background: #ffffff;
}
*:focus {
  outline: none;
}
// Estilos do select <>

.select-box {
  position: relative;
  display: block;
  width: 100%;
  margin: 0 auto;
  font-size: small;

  &__current {
    position: relative;
    box-shadow: 0 15px 30px -10px transparentize(#000, 0.9);
    cursor: pointer;
    outline: none;

    &:focus {
      & + .select-box__list {
        opacity: 1;
        animation-name: none;

        .select-box__option {
          cursor: pointer;
        }
      }
      .select-box__icon {
        transform: translateY(-50%) rotate(180deg);
      }
    }
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    width: 15px;
    opacity: 0.3;
    transition: 0.2s ease;
  }

  &__value {
    display: flex;
  }

  &__input {
    display: none;

    &:checked + .select-box__input-text {
      display: block;
    }
  }

  &__input-text {
    display: none;
    width: 100%;
    margin: 0;
    padding: 15px;
    background-color: #fff;
  }

  &__list {
    position: absolute;
    width: 100%;
    padding: 0;
    list-style: none;
    opacity: 0;

    animation-name: HideList;
    animation-duration: 0.5s;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: step-start;
    box-shadow: 0 15px 30px -10px transparentize(#000, 0.9);
  }

  &__option {
    display: block;
    padding: 15px;
    background-color: #fff;

    &:hover,
    &:focus {
      color: #546c84;
      background-color: #fbfbfb;
    }
  }
}

// estilos do select </>

button[type="submit"] {
  width: 9%;
  background: #fff;
  font-size: large;
  border: unset;
  color: #bababa;
  cursor: pointer;
}

@keyframes HideList {
  from {
    transform: scaleY(1);
  }
  to {
    transform: scaleY(0);
  }
}
</style>