import type { OrganizationChartMember, OrganizationChartNode } from "../types";

export function getRootPath(node: OrganizationChartNode): string[] {
  return [node.id ?? "root"];
}

export function getChildPath(
  parentPath: string[],
  node: OrganizationChartNode,
  index: number
): string[] {
  return [...parentPath, node.id ?? String(index)];
}

export function getNodeKey(
  node: OrganizationChartNode,
  path: string[]
): string {
  return node.id ?? path.join(".");
}

export function getMemberKey(
  nodeKey: string,
  member: OrganizationChartMember,
  index: number
): string {
  return member.id ?? `${nodeKey}:member:${index}`;
}

export function getMemberPath(
  nodePath: string[],
  member: OrganizationChartMember,
  index: number
): string[] {
  return [...nodePath, member.id ?? `member-${index}`];
}
