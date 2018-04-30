<template>
  <div class="wrapper">
    <div class="content">
      <img src="../../common/image/404.jpg" class="notfoundimg" @click="handleOnImgClick">
      <div class="para">Sorry, that page doesn’t live here anymore.</div>
      <div class="para-m">Sorry...<br/>That page doesn’t live here anymore.</div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "errorpage404",
    methods: {
      handleOnImgClick() {
        let token = localStorage.getItem('token')
        if (token) {
          let userIdentity = localStorage.getItem('userIdentity')
          this.$router.push({name: userIdentity})
        }
        this.$router.push({name: 'login'})
      }
    }
  }
</script>

<style>
  html body {
    background: #fff;
  }
</style>

<style lang="scss" scoped>
  .notfoundimg {
    cursor: pointer;
  }

  @media screen and (min-width: 701px) {
    .content {
      padding-top: 200px;
      margin-top: -12%;
      .notfoundimg {
        width: 50%;
      }
      .para {
        font-weight: bold;
        position: relative;
        top: -3em;
        font-size: 1.3em;
      }
      .para-m {
        display: none;
      }
    }

  }

  @media screen and (max-width: 700px) {
    .content {
      position: fixed;
      top: 15%;
      left: 0;
      .notfoundimg {
        width: 100%;
      }
    }
    .para {
      display: none;
    }
    .para-m {
      position: relative;
      top: -1em;
      font-weight: bold;
    }
  }

</style>
