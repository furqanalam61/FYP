<template>
	<b-row>
		<b-col cols="12">
			<b-jumbotron>
				<b-row>
					<b-col
						cols="12">
						<b-media>
							<b-row>
								<b-col
									v-for="(image, i) of images"
									:key="i"
									cols="12"
									sm="5"
									md="3"
									class="mb-4">
									<div @click="clickeMethod()"
										class="add-button"
										:style="{ 'background-image': 'url(' + '/uploads/' + image.image + ')' }">
									</div>
								</b-col>
								<b-col
									v-if="images.length === 0"
									class="text-center">
									<h1>Doh! Looks like you haven't uploaded any images.</h1>
									<b-btn
										size="md"
										variant="primary"
										@click="uploadImages()"
										class="cursor">
										Upload images
									</b-btn>
								</b-col>


								
								
								<button @click="btnNext">Go to</button>

								<button @click="distributePageBtn()">Distribute Page</button>						


								
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
  name: "ImageList",
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  data() {
    return {
      images: [],
      errors: [],
    };
  },
  created() {
    console.log(
      (axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "jwtToken"
      ))
    );
    console.log(localStorage.getItem("Userrole"));
    this.getImages();
  },
  methods: {
    getImages() {
      axios
        .get(`http://localhost:3000/uploads`, {
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
    btnNext() {
      if (localStorage.getItem("Userrole") === "Annontator") {
        this.$router.push({
          name: "LabelImage",
        });
      } else {
        console.log(localStorage.getItem("Userrole"));
      }
    },
    distributePageBtn() {
      this.$router.push({
        name: "DistributeData",
      });
    },
    clickeMethod() {
      this.$router.push({
        name: "LabelImage",
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
