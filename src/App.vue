<template>
  <main class="site-main">
    <header class="intro">
      <p class="label">Lightweight Vue 3 component</p>
      <h1>Interactive Organization Chart for Vue 3</h1>
      <p class="description">
        <strong>Organization Chart Vue3</strong> is an open-source npm package
        for rendering hierarchical team and company structures. Build
        collapsible org charts with TypeScript types, custom slots, and typed
        selection events.
      </p>
      <div class="actions">
        <a
          href="https://www.npmjs.com/package/organization-chart-vue3"
          target="_blank"
          rel="noopener noreferrer"
          >View on npm</a
        >
        <a
          href="https://github.com/LeeJams/Organization-Chart-Vue3"
          target="_blank"
          rel="noopener noreferrer"
          >GitHub documentation</a
        >
      </div>
      <p class="install-command">
        <code>npm install organization-chart-vue3</code>
      </p>
    </header>

    <section class="content-section" aria-labelledby="demo-title">
      <div class="section-heading">
        <h2 id="demo-title">Live organization chart demo</h2>
        <p>
          Select a node or member, and use the arrows to expand or collapse a
          branch.
        </p>
      </div>
      <div class="chart-scroll">
        <OrganizationChart
          :data="orgData"
          @click-node="clickNode"
          @select="handleSelect"
        />
      </div>
    </section>

    <section class="details-grid" aria-label="Organization Chart Vue3 details">
      <article class="info-card">
        <h2>Vue 3 org chart features</h2>
        <ul class="feature-list">
          <li>Interactive expand and collapse controls</li>
          <li>TypeScript definitions and typed selection events</li>
          <li>Custom <code>node-title</code> and <code>member</code> slots</li>
          <li>Stable IDs and paths for predictable updates</li>
          <li>Vue 3.3.4 or later and an MIT license</li>
        </ul>
      </article>

      <article class="info-card">
        <h2>Quick start</h2>
        <pre><code>&lt;script setup lang="ts"&gt;
import OrganizationChart from "organization-chart-vue3";
import "organization-chart-vue3/style.css";
&lt;/script&gt;

&lt;template&gt;
  &lt;OrganizationChart :data="orgData" @select="handleSelect" /&gt;
&lt;/template&gt;</code></pre>
      </article>
    </section>
  </main>

  <footer class="site-footer">
    <p>
      Open source by
      <a href="https://leejams.github.io/" target="_blank" rel="noopener noreferrer"
        >LeeJam</a
      >
      ·
      <a
        href="https://github.com/LeeJams/Organization-Chart-Vue3"
        target="_blank"
        rel="noopener noreferrer"
        >Source and full documentation</a
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
:root {
  color: #24352f;
  background: #f4f7f4;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  background: #f4f7f4;
}

a {
  color: inherit;
}

#app {
  width: 100%;
}

.site-main {
  width: min(1400px, calc(100% - 32px));
  margin: 0 auto;
  padding: 24px 0 56px;
}

.intro {
  padding: clamp(36px, 7vw, 76px);
  color: #effaf3;
  background: #16302b;
  border-radius: 24px;
}

.label {
  margin: 0 0 14px;
  color: #8cd2a9;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

h1 {
  max-width: 900px;
  margin: 0;
  font-size: clamp(2.4rem, 7vw, 5.5rem);
  line-height: 1;
  letter-spacing: -0.05em;
}

h2 {
  margin: 0;
  color: #16302b;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  letter-spacing: -0.03em;
}

.description {
  max-width: 720px;
  margin: 24px 0 0;
  color: #cae0d3;
  font-size: 1.1rem;
  line-height: 1.65;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 26px;
}

.actions a {
  padding: 12px 18px;
  border: 1px solid #88cfa5;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  color: #effaf3;
}

.install-command {
  width: fit-content;
  max-width: 100%;
  margin: 18px 0 0;
  padding: 12px 16px;
  overflow-x: auto;
  color: #d8eadf;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  font-size: 0.9rem;
  white-space: nowrap;
}

.content-section {
  margin-top: 24px;
  padding: clamp(24px, 4vw, 48px);
  background: #fff;
  border: 1px solid #e0e7df;
  border-radius: 20px;
}

.section-heading {
  display: flex;
  gap: 32px;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 32px;
}

.section-heading > p {
  max-width: 430px;
  margin: 0;
  color: #63746d;
  line-height: 1.65;
}

.chart-scroll {
  min-height: 560px;
  padding: 38px 20px 0;
  overflow-x: auto;
  background: #f7f9f6;
  border-radius: 14px;
}

.chart-scroll > .org-table {
  margin: 0 auto;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.info-card {
  min-width: 0;
  padding: clamp(24px, 4vw, 42px);
  background: #fff;
  border: 1px solid #e0e7df;
  border-radius: 20px;
}

.feature-list {
  display: grid;
  gap: 12px;
  margin: 24px 0 0;
  padding-left: 20px;
}

.feature-list li {
  color: #495c54;
  line-height: 1.55;
}

.info-card pre {
  margin: 24px 0 0;
  padding: 18px;
  overflow-x: auto;
  color: #dcebe1;
  background: #1e2926;
  border-radius: 12px;
  font-size: 0.82rem;
  line-height: 1.7;
}

.site-footer {
  padding: 8px 20px 36px;
  color: #607069;
  text-align: center;
}

.site-footer p {
  margin: 0;
}

.site-footer a {
  color: #205f45;
  font-weight: 750;
}

.backend-title {
  color: #fff;
  background-color: #5d8fe8;
}

.backend-content {
  background: #f5f8ff;
  text-align: left;
}

.frontend-title {
  color: #fff;
  background-color: #283044;
}

.frontend-content {
  background: #f5f7fb;
  text-align: center;
}

.product-title {
  color: #fff;
  background-color: #ff8a5b;
}

.product-content {
  background: #fff4ef;
  text-align: center;
}

.design-title {
  color: #fff;
  background-color: #ffb347;
}

.design-content {
  background: #fff8ea;
  text-align: center;
}

.engineering-title {
  color: #fff;
  background-color: #4f6bed;
}

.engineering-content {
  background: #eef2ff;
  text-align: center;
}

.operations-title {
  color: #fff;
  background-color: #3dbb7a;
}

.operations-content {
  background: #eefcf4;
  text-align: center;
}

.growth-title {
  color: #fff;
  background-color: #d95dd7;
}

.growth-content {
  background: #fff0ff;
  text-align: right;
}

@media (max-width: 900px) {
  .details-grid {
    grid-template-columns: 1fr;
  }

  .section-heading {
    display: grid;
    gap: 12px;
  }
}

@media (max-width: 560px) {
  .site-main {
    width: min(100% - 20px, 520px);
    padding-top: 10px;
  }

  .intro {
    border-radius: 16px;
  }

  .actions {
    display: grid;
  }

  .chart-scroll {
    padding-inline: 12px;
  }
}
</style>
