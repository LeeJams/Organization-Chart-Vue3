import type { DefineComponent } from "vue";
import OrganizationChartComponent from "./components/OrganizationChart.vue";
import type { OrganizationChartProps } from "./types";

const OrganizationChart =
  OrganizationChartComponent as unknown as DefineComponent<OrganizationChartProps>;

export type {
  OrganizationChartMember,
  OrganizationChartNode,
  OrganizationChartProps,
  OrganizationChartSelectPayload,
  OrganizationChartSlots,
} from "./types";

export default OrganizationChart;
