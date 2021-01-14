<template>
	<b-row>
		<b-col cols="12">
			<b-jumbotron>
				<b-row>
					<b-col
						cols="12">
						<b-media>
							<b-row>
								<b-col cols="3">
									<aside :class="{ active: active}">
										<nav>
											<a href="#">Label1</a>
											<a href="#">Label2</a>
											<a href="#">Label3</a>
										</nav>
									</aside>
								</b-col>
								<b-col
									v-for="(image, i) of images"
									:key="i"
									cols="9"
									sm="5"
									md="3"
									class="mb-4">
									<div id="imgstyling"
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

							</b-row>
						</b-media>
					</b-col>
				</b-row>
			</b-jumbotron>
		</b-col>
	</b-row>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
	name: 'ImageList',
	computed: {
		...mapGetters({
			user: 'user',
		})
	},
	data () {
		return {
			images: [],
			errors: [],
			active: true
		}
	},
	created () {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem(
			'jwtToken'
		)
		this.getImages()
	},
	methods: {
		getImages () {
			axios.get(`http://localhost:3000/uploads`, {
				params: {
					user: this.user.userId
				}
			})
				.then(response => {
					this.images = response.data
				})
				.catch(e => {
					this.errors.push(e)
					if (e.response.status === 401) {
						this.$router.push({
							name: 'Login'
						})
					}
				})
		},
		uploadImages () {
			this.$router.push({
				name: 'UploadImages'
			})
		}
	}
}
</script>

<style>
#imgstyling{
	transition: .5s;
	width: 100%;
}
#imgstyling:hover{
	transform: scale(1.5);
	height: 100%;
	width: 100%;
	min-height: 100%; 
	background-position: center;
  	background-repeat: no-repeat;
  	background-size: cover;
}
.container {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    padding: 10px;
    min-height: calc(100vh - 20px);
    background-color: rgba($color: #81B121, $alpha: .8);
    border: solid #fff;
    border-width: 0 1px 0 0;
    z-index: 999;
    transition: all .5s ease-in-out;
    .control {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      margin-bottom: 10px;
      i{
        font-size: 2rem;
        cursor: pointer;
        transition: all .5s ease-in-out;
      }
    }
    &.show {
      width: 180px;
      .control > i {
        color: #fff;
        transform: rotateZ(-180deg);
      }
      .navigation-icons {
        color: #fff;
      }
    }
    .navigation-icons {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 50px;
      float: left;
      i {
        font-size: 2rem;
        padding: 10px 0;
        cursor: pointer;
        transition: all .5s ease-in-out;
        &:hover {
          color: #fff;
        }
      }
    }
    .navigation-links {
      padding-top: 14px;
      float: left;
      div {
        font-size: 1.35rem;
        padding-left: 10px;
        margin-bottom: 18px;
        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
    }
  }
  @mixin nav-childs($values...) {
    @each $var in $values {
      &:nth-child(#{$var}) {
        transition: transform linear calc(.1s * #{$var}), display .5s;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    @include nav-childs(1,2,3,4,5);
  }
  .fade-enter, .fade-leave-to {
    transform: scale(0);
}
aside
{
  width: 200px;
  background: #cecece;
  height: 100vh;
  
}
&.active
{
  display: block;
}
a
{
  display: block;
  padding: 10px 5px;
  color: #666; 
}
</style>