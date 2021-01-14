<template>
  <b-row>
    <b-col cols="12">
      <b-jumbotron>
        <b-row>
          <b-col cols="12">
            <b-media>
              <b-row>
                <b-col cols="3">
                  <aside :class="{ active: active }">
                    <nav>
                      <a href="#">Label1</a>
                      <a href="#">Label2</a>
                      <a href="#">Label3</a>
                      {{ this.user.username }}

                      <li v-for="username in Us">
                        {{ username.username }}
                      </li>
                    </nav>
                  </aside>
                </b-col>

                <b-col
                  v-for="(image, i) of images"
                  :key="i"
                  cols="1"
                  sm="5"
                  md="3"
                  class="mb-4"
                >
                  <label>
                    <input type="checkbox" />
                    <span></span>
                  </label>
                  <div
                    class="add-button"
                    :style="{
                      'background-image':
                        'url(' + '/uploads/' + image.image + ')',
                    }"
                  ></div>
                </b-col>
                <b-col v-if="images.length === 0" class="text-center">
                  <h1>
                    Doh! Looks like there is not any single image present in
                    database.
                  </h1>
                  <b-btn
                    size="md"
                    variant="primary"
                    @click="uploadImages()"
                    class="cursor"
                  >
                    Upload images
                  </b-btn>
                </b-col>
              </b-row>
            </b-media>
          </b-col>
        </b-row>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "DistributeData",
  computed: {
    ...mapGetters({
      user: "user",
  //    User: "User"
    }),
  },
  data() {
    return {
      Us: [],
      images: [],
      errors: [],
      active: true,
    };
  },
    created() {
    /* console.log(
      (axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "jwtToken"
      ))
    ); */
    //console.log(localStorage.getItem("Userrole"));
    this.getImages(); 
    this.getUser();
  }, 
	 mounted(){
	  axios.get('http://localhost:3000/users')
	  .then((response) => {
      console.log(this.user.username);
     // console.log(this.user)
		  console.log(response.data);
		  this.Us = response.data;
	  })
	  .catch((error) => {
		  console.log(error);
	  });
  }, 
  methods: {
    getImages() {
      axios.get(`http://localhost:3000/uploads`, {
          params: {
            user: this.user.userId,
          },
        })
        .then((response) => {
		  this.images = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
          if (e.response.status === 401) {
            this.$router.push({
              name: "Login",
            });
          }
        });
	},
	getUser(){
		axios.get('http://localhost:3000/users')
	  .then((response) => {
		  console.log(response.data);
		  this.Us = response.data;
	  })
	  .catch((error) => {
		  console.log(error);
	  });
	}, 
    uploadImages() {
      this.$router.push({
        name: "UploadImages",
      });
    },
  },
};
</script>

<style>
:root {
  span {
    width: 15px;
    height: 15px;
    border: 1px solid #cccccc;
  }
  input {
    display: none;
    &:checked ~ span {
      background: #cccccc;
    }
  }
}

#imgstyling {
  width: 100%;
}
/* @mixin nav-childs($values...) {
    @each $var in $values {
      &:nth-child(#{$var}) {
        /* transition: transform linear calc(.1s * #{$var}), display .5s; 
      }
    }
  } */
aside {
  width: true;
  background: #cecece;
  height: true;
}
&.active {
  display: block;
}
a {
  display: block;
  padding: 10px 5px;
  color: #666;
}
</style>