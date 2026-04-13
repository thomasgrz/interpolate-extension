export interface GroupConfigInStorage {
  name: string;
  createdAt: number;
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
    return `group-config-${name?.trim()?.toLowerCase()}`;
  }

  createStorageRecord() {
    return {
      enabledByUser: this.enabledByUser,
      createdAt: this.createdAt,
      name: this.name,
      groupId: this.groupId,
      interpolationIds: this.interpolationIds,
    };
  }

  constructor(config: {
    name: string;
    interpolationIds: string[];
    createdAt?: number;
  }) {
    this.createdAt = config.createdAt ?? Date.now();
    this.enabledByUser = true;
    this.name = config.name;
    this.groupId = this.createGroupId(config.name);
    this.interpolationIds = config.interpolationIds;
  }
}
