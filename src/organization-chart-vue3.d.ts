declare module "organization-chart-vue" {
  import { DefineComponent } from "vue";

  export interface OrganizationChartNode {
    /** The title text to display for this node in the organization chart */
    title: string;

    /**
     * Member information associated with this node
     */
    member?: {
      /** The name of the member to display */
      name?: string;
      /** Additional information about the member */
      add?: string;
      /** URL path to the member's profile image */
      image_url?: string;
    }[];

    /** An array of child nodes that appear below this node in the hierarchy */
    children?: OrganizationChartNode[];

    /**
     * CSS class name(s) to apply to the title element
     * Can be a single class string or an array of class strings
     */
    titleClass?: string | string[];

    /**
     * CSS class name(s) to apply to the content container
     * Can be a single class string or an array of class strings
     */
    contentClass?: string | string[];
  }

  export interface OrganizationChartProps {
    /**
     * The hierarchical data structure representing your organization chart.
     * Must follow the OrganizationChartNode interface
     */
    data: OrganizationChartNode;

    /**
     * Callback function that fires when a node is clicked
     * @param node - The node data that was clicked
     */
    onClickNode?: (node: OrganizationChartNode) => void;
  }

  /**
   * A Vue component for rendering interactive organization charts
   * @param props - The component props
   */
  const OrganizationChart: DefineComponent<OrganizationChartProps>;

  export default OrganizationChart;
}
