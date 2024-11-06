<script>
import ProjectItemTemplate from "@/components/ProjectItemTemplate.vue";
import ExpandedProjectTemplate from "@/components/ExpandedProjectTemplate.vue";

export default {
  name: "addProjectScreen",
  components: {ProjectItemTemplate, ExpandedProjectTemplate},

  data() {
    return {
      projectName: "",
      description: "",
      shortDescription: "",
      repoLink: "",
      technologies: [],
      mainImg: "",
      mainImgUrl: "",
      images: [],
      imageUrls: [],
      date: ""
    }
  },
  methods: {
    async checkForLogin() {
      let localKey = localStorage.getItem("loginKey")
      if (localKey) {
        let response = await fetch(import.meta.env.VITE_API_URL+`/checkLoginKey?key=${localKey}`)
        if(response.ok){
          return
        }
      }
      this.$router.push("/");

    },

    async saveProject() {
      try {
        let project = {
          projectName: this.projectName,
          description: this.description,
          shortDescription: this.shortDescription,
          repoLink: this.repoLink,
          technologies: this.technologies,
          mainImg: this.mainImg.name,
          imageNames: this.getFileNames(this.images),
          date: this.date,
        };
        let response = await fetch(import.meta.env.VITE_API_URL + '/project/add',
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(project)
            }
        )
        if (response.ok) {
          await this.addImage(this.mainImg)
          for (let image of this.images) {
            await this.addImage(image)
          }
          this.$router.push({name: 'mainView'})
        }
      } catch (e) {
        console.error("Upload went wrong")
        console.error(e)
      }

    },

    getFileNames(files) {
      let names = []
      for (let file of files) {
        names.push(file.name);
      }
      return names
    },
    async addImage(image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('projectName', this.projectName);
      let response = await fetch(import.meta.env.VITE_API_URL + `/image/upload`,
          {
            method: "POST",
            body: formData
          })

      console.log(response.status)
    },
    updateMainImg(file) {
      this.mainImgUrl = URL.createObjectURL(file);
      this.mainImg = file
      this.imageUrls[0] = URL.createObjectURL(file);
      this.images[0] = file
      this.$refs.expandedTemplate.resetCarousel()
      console.log(this.images.length, "full screen")
    },
    nameUpdate(name) {
      this.projectName = name
    },
    smallDescUpdate(text) {
      this.shortDescription = text;
    },
    imageUpdate(file) {
      this.imageUrls.push(URL.createObjectURL(file));
      this.images.push(file)

    },
    technologyUpdate(tech) {
      this.technologies.push(tech)
    },
    repoLinkUpdate(link) {
      this.repoLink = link
    },
    dateUpdate(date) {
      this.date = date
    },
    descUpdate(description) {
      this.description = description
    }

  },
  beforeMount() {
    this.checkForLogin()
  }
}
</script>

<template>

  <div id="container">
    <div id="project">
      <project-item-template
          @smallDescUpdate="smallDescUpdate"
          @nameUpdate="nameUpdate"
          @newMainImg="updateMainImg"
          :name="projectName"
          :small-description="shortDescription"
          :main-img="mainImgUrl"/>
      <expanded-project-template
          ref="expandedTemplate"
          @newImg="imageUpdate"
          @newTechology="technologyUpdate"
          @newRepolink="repoLinkUpdate"
          @newDate="dateUpdate"
          @newName="nameUpdate"
          @newDesc="descUpdate"
          :technologies="technologies"
          :images="imageUrls"
          :repo-link="repoLink"
          :date="date"
          :description="description"
          :name="projectName"
      />
    </div>
    <button @click="saveProject">Save project</button>

  </div>

</template>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
}

#project {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>