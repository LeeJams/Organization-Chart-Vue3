import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import OrganizationChart from "../src/components/OrganizationChart.vue";

function createChartData() {
  return {
    id: "company",
    title: "CEO",
    member: [
      {
        id: "oliver",
        name: "Oliver",
        add: "Chief Executive Officer",
      },
    ],
    children: [
      {
        id: "management",
        title: "Management",
        member: [
          {
            id: "jake",
            name: "Jake",
            add: "Senior Manager",
          },
        ],
      },
      {
        id: "engineering",
        title: "Engineering",
        children: [
          {
            id: "frontend",
            title: "Frontend",
          },
        ],
      },
    ],
  };
}

function createChartDataWithoutIds() {
  return {
    title: "CEO",
    children: [
      {
        title: "Engineering",
        children: [
          {
            title: "Frontend",
          },
        ],
      },
    ],
  };
}

describe("OrganizationChart", () => {
  it("renders nested nodes recursively", () => {
    const wrapper = mount(OrganizationChart, {
      props: {
        data: createChartData(),
      },
    });

    expect(wrapper.text()).toContain("CEO");
    expect(wrapper.text()).toContain("Management");
    expect(wrapper.text()).toContain("Engineering");
    expect(wrapper.text()).toContain("Frontend");
  });

  it("emits a typed select payload when a node title is clicked", async () => {
    const data = createChartData();
    const wrapper = mount(OrganizationChart, {
      props: {
        data,
      },
    });

    await wrapper.get(".org-title").trigger("click");

    expect(wrapper.emitted("click-node")?.[0]?.[0]).toEqual(data);
    expect(wrapper.emitted("select")?.[0]?.[0]).toEqual({
      kind: "node",
      node: data,
      id: "company",
      path: ["company"],
    });
  });

  it("emits a typed select payload when a member is clicked", async () => {
    const data = createChartData();
    const wrapper = mount(OrganizationChart, {
      props: {
        data,
      },
    });

    await wrapper.get(".org-content-item").trigger("click");

    expect(wrapper.emitted("click-node")?.[0]?.[0]).toEqual(data.member?.[0]);
    expect(wrapper.emitted("select")?.[0]?.[0]).toEqual({
      kind: "member",
      node: data,
      member: data.member?.[0],
      id: "oliver",
      path: ["company", "oliver"],
    });
  });

  it("does not mutate the original input data when expand state changes", async () => {
    const data = createChartData();
    const originalSnapshot = JSON.parse(JSON.stringify(data));
    const wrapper = mount(OrganizationChart, {
      props: {
        data,
      },
    });

    await wrapper.get(".org-extend-arrow").trigger("click");

    expect(data).toEqual(originalSnapshot);
    expect("extend" in data).toBe(false);
  });

  it("preserves collapse state for nodes keyed by id across prop updates", async () => {
    const wrapper = mount(OrganizationChart, {
      props: {
        data: createChartData(),
      },
    });

    await wrapper.get(".org-extend-arrow").trigger("click");
    expect(wrapper.find("tr[style]").attributes("style")).toContain("hidden");

    await wrapper.setProps({
      data: {
        ...createChartData(),
        title: "CEO (Updated)",
      },
    });

    expect(wrapper.find("tr[style]").attributes("style")).toContain("hidden");
  });

  it("collapses and re-expands the entire subtree when a parent node is toggled", async () => {
    const wrapper = mount(OrganizationChart, {
      props: {
        data: createChartData(),
      },
    });

    await wrapper.get(".org-extend-arrow").trigger("click");
    expect(
      wrapper
        .findAll("tr[style]")
        .every((row) => row.attributes("style").includes("hidden"))
    ).toBe(true);

    await wrapper.get(".org-extend-arrow").trigger("click");
    expect(
      wrapper
        .findAll("tr[style]")
        .every((row) => row.attributes("style").includes("visible"))
    ).toBe(true);
  });

  it("preserves collapse state for nodes without ids by falling back to path keys", async () => {
    const wrapper = mount(OrganizationChart, {
      props: {
        data: createChartDataWithoutIds(),
      },
    });

    await wrapper.get(".org-extend-arrow").trigger("click");
    expect(wrapper.find("tr[style]").attributes("style")).toContain("hidden");

    await wrapper.setProps({
      data: {
        ...createChartDataWithoutIds(),
        title: "CEO (Updated)",
      },
    });

    expect(wrapper.find("tr[style]").attributes("style")).toContain("hidden");
  });
});
