<template>
  <OrganizationChart
    :data="orgData"
    @click-node="clickNode"
    @select="handleSelect"
  />
  <footer class="foot">
    <p>
      Blog
      <a href="https://leejams.github.io/" target="_blank">LeeJam</a>
      Github
      <a
        href="https://github.com/LeeJams/Organization-Chart-Vue3"
        target="_blank"
        >Organization-Chart-Vue3</a
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
        id: "company",
        title: "CEO",
        member: [
          {
            id: "oliver",
            name: "Oliver",
            image_url:
              "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
          },
        ],
        children: [
          {
            id: "product",
            title: "PRODUCT",
            titleClass: "product-title",
            contentClass: "product-content",
            member: [
              {
                id: "mia",
                name: "Mia",
                add: "Product Lead",
                image_url:
                  "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
              },
            ],
            children: [
              {
                id: "design",
                title: "DESIGN",
                titleClass: "design-title",
                contentClass: "design-content",
                member: [
                  {
                    name: "Ava",
                    add: "Brand Designer",
                  },
                ],
              },
            ],
          },
          {
            id: "engineering",
            title: "ENGINEERING",
            titleClass: "engineering-title",
            contentClass: "engineering-content",
            member: [
              {
                id: "emma",
                name: "Emma",
                add: "CTO",
                image_url:
                  "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
              },
            ],
            children: [
              {
                id: "frontend",
                title: "FRONTEND",
                titleClass: "frontend-title",
                contentClass: "frontend-content",
                member: [
                  {
                    name: "David",
                    add: "Lead Engineer",
                  },
                  {
                    name: "Sophia",
                    add: "UI Engineer",
                  },
                ],
              },
              {
                id: "backend",
                title: "BACKEND",
                titleClass: "backend-title",
                contentClass: "backend-content",
                member: [
                  {
                    name: "Kyle",
                    add: "Lead Engineer",
                  },
                  {
                    name: "Lucas",
                    add: "Platform Engineer",
                  },
                ],
              },
            ],
          },
          {
            id: "operations",
            title: "OPERATIONS",
            titleClass: "operations-title",
            contentClass: "operations-content",
            member: [
              {
                name: "Noah",
                add: "Operations Manager",
              },
            ],
          },
          {
            id: "growth",
            title: "GROWTH",
            titleClass: "growth-title",
            contentClass: "growth-content",
            member: [
              {
                name: "Zoe",
                add: "Marketing Lead",
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    clickNode: function (node) {
      console.log("click-node", node);
    },
    handleSelect: function (payload) {
      console.log("select", payload);
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
  background: #42b883;
  padding: 24px;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  z-index: 999;
}
.foot a {
  color: #fff;
  margin: 0 0.5em;
}
.backend-title {
  background-color: #5d8fe8;
  color: #fff;
}
.backend-content {
  text-align: left;
  background: #f5f8ff;
}
.frontend-title {
  background-color: #283044;
  color: #fff;
}
.frontend-content {
  text-align: center;
  background: #f5f7fb;
}
.product-title {
  background-color: #ff8a5b;
  color: #fff;
}
.product-content {
  text-align: center;
  background: #fff4ef;
}
.design-title {
  background-color: #ffb347;
  color: #fff;
}
.design-content {
  text-align: center;
  background: #fff8ea;
}
.engineering-title {
  background-color: #4f6bed;
  color: #fff;
}
.engineering-content {
  text-align: center;
  background: #eef2ff;
}
.operations-title {
  background-color: #3dbb7a;
  color: #fff;
}
.operations-content {
  text-align: center;
  background: #eefcf4;
}
.growth-title {
  background-color: #d95dd7;
  color: #fff;
}
.growth-content {
  text-align: right;
  background: #fff0ff;
}
</style>
