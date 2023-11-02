<template>
  <OrganizationChart :data="orgData" @click-node="clickNode" />
  <footer class="foot">
    <p>
      Blog
      <a href="https://leejams.github.io/" target="_blank">LeeJam</a>
      Github
      <a
        href="https://github.com/LeeJams/Organization-Chart-Vue3"
        target="_blank"
        >Vue-Tree-Chart</a
      >
    </p>
  </footer>
</template>

<script>
import OrganizationChart from "./components/OrganizationChart.vue";

export default {
  name: "app",
  components: {
    OrganizationChart,
  },
  data() {
    return {
      orgData: {
        title: "CEO",
        member: [
          {
            name: "Oliver",
            image_url:
              "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
          },
        ],
        children: [
          {
            title: "MANAGEMENT",
            member: [
              {
                name: "Jake",
                add: "Junior Staff",
                image_url:
                  "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
              },
              {
                name: "Noah",
                add: "Senior Staff",
                image_url:
                  "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
              },
              {
                name: "James",
                add: "Senior Manager",
                image_url:
                  "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
              },
            ],
          },
          {
            title: "DEVELOPMENT",
            member: [
              {
                name: "Emma",
                add: "CTO",
                image_url:
                  "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
              },
            ],
            children: [
              {
                title: "FRONTEND",
                titleClass: "frontend-title",
                contentClass: "frontend-content",
                member: [
                  {
                    name: "David",
                    add: "Senior Staff",
                  },
                  {
                    name: "Ava",
                    add: "Senior Staff",
                  },
                  {
                    name: "Sophia",
                    add: "Senior Staff",
                  },
                ],
              },
              {
                title: "BACKEND",
                titleClass: "backend-title",
                contentClass: "backend-content",
                member: [
                  {
                    name: "Kyle",
                    add: "Senior Staff",
                  },
                  {
                    name: "Richard",
                    add: "Senior Staff",
                  },
                  {
                    name: "Daniel",
                    add: "Senior Staff",
                  },
                ],
              },
            ],
          },
          {
            title: "DESIGN",
            member: [
              {
                name: "Jacob",
                add: "Senior Staff",
              },
            ],
          },
          {
            title: "MARKETING",
          },
          {
            title: "SALES",
            children: [
              {
                title: "SALES A TEAM",
              },
              {
                title: "SALES B TEAM",
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    clickNode: function (node) {
      console.log(node);
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  width: 100%;
}
body {
  margin: 0;
  padding: 0;
}
.foot {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #333;
  padding: 24px;
  overflow: hidden;
  color: #999;
  font-size: 14px;
  text-align: center;
  z-index: 999;
}
.foot a {
  color: #fff;
  margin: 0 0.5em;
}
.backend-title {
  background-color: #66abd3;
  color: #fff;
}
.backend-content {
  text-align: center;
}
.frontend-title {
  background-color: #333;
  color: #fff;
}
.frontend-content {
  text-align: center;
}
</style>
