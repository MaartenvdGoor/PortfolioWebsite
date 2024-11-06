<script>
export default {
  name: "loginScreen",

  data(){
    return {
      username:"",
      password:"",
      failedLogin:false,
      errorMessage:""
    }
  },

  methods:{
    async login(){
      try {
        let response = await fetch(import.meta.env.VITE_API_URL+`/login?username=${this.username}&password=${this.password}`)
        if(response.ok){

          let result = await response.json()
          localStorage.setItem("loginKey", result.key)
          this.$router.push("/")
        }
        else if(response.status === 401){
          console.log("Bad login")
          this.errorMessage = "Login failed. Incorrect credentials."
          this.failedLogin = true

        }
        else {
          console.log("Bad login")
          this.errorMessage = "something went wrong please try again"
          this.failedLogin = true
        }
      }
      catch (err){
        console.log(err)
        this.errorMessage = "something went wrong please try again"
        this.failedLogin = true
      }

    }
  }
}
</script>

<template>
  <div id="container">
    <div id="card">
      <h1 id="title">Login</h1>
      <div id="input">
        <p>username:</p>
        <input id="username" type="text" v-model="username" placeholder="username" />
        <p>password:</p>
        <input id="password" type="password" v-model="password" placeholder="password" />
        <p v-if="failedLogin" style="color: red">{{ errorMessage }}</p>
        <button @click="login">Login</button>
      </div>
    </div>


  </div>

</template>

<style scoped>
#container{
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
#card{
  width: 20%;
}

#title{
  border-bottom: 1px white solid;
  text-align: center;
  padding-bottom: 10px;
}
#input{
  display: flex;
  flex-direction: column;
}
#input p{
  margin: 0;

}
#input input{
  margin-bottom: 10px;
}
#input button{
  margin-top: 10px;
  height: 40px;
}

</style>