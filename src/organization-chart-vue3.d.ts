import { DefineComponent } from "vue";

export interface OrganizationChartNode {
  title: string;
  member?: {
    name?: string;
    add?: string;
    image_url?: string;
  }[];
  children?: OrganizationChartNode[];
  titleClass?: string | string[];
  contentClass?: string | string[];
}

export interface OrganizationChartProps {
  data: OrganizationChartNode;
  onClickNode?: (node: OrganizationChartNode) => void;
}

declare const OrganizationChart: DefineComponent<OrganizationChartProps>;

export default OrganizationChart;
