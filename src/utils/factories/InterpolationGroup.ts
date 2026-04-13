export interface GroupConfigInStorage {
  name: string;
  interpolationIds: (string | number)[];
  enabledByUser: boolean;
}

export class InterpolationGroup {
  enabledByUser: boolean;
  createdAt: number;
  name: string;
  groupId: string;
  interpolationIds: string[];

  createGroupId(name: string) {
    return `group-${name?.trim()?.toLowerCase()}`;
  }

  constructor(config: { name: string; interpolationIds: string[] }) {
    this.createdAt = Date.now();
    this.enabledByUser = true;
    this.name = config.name;
    this.groupId = this.createGroupId(config.name);
    this.interpolationIds = config.interpolationIds;
  }
}
