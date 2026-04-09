export interface OrganizationChartMember {
  id?: string;
  name?: string;
  add?: string;
  image_url?: string;
  [key: string]: unknown;
}

export interface OrganizationChartNode {
  id?: string;
  title: string;
  member?: OrganizationChartMember[];
  children?: OrganizationChartNode[];
  titleClass?: string | string[];
  contentClass?: string | string[];
  [key: string]: unknown;
}

export interface OrganizationChartProps {
  data: OrganizationChartNode;
  defaultExpandAll?: boolean;
}

export interface OrganizationChartSelectPayload {
  kind: "node" | "member";
  node: OrganizationChartNode;
  member?: OrganizationChartMember;
  id?: string;
  path: string[];
}

export interface OrganizationChartTogglePayload {
  node: OrganizationChartNode;
  path: string[];
  value: boolean;
}

export interface OrganizationChartTitleSlotProps {
  node: OrganizationChartNode;
  depth: number;
  path: string[];
}

export interface OrganizationChartMemberSlotProps {
  node: OrganizationChartNode;
  member: OrganizationChartMember;
  depth: number;
  path: string[];
}

export interface OrganizationChartSlots {
  "node-title"?: (props: OrganizationChartTitleSlotProps) => unknown;
  member?: (props: OrganizationChartMemberSlotProps) => unknown;
}
