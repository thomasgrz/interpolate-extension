export interface GroupConfigInStorage {
  name: string;
  groupId: string;
  createdAt: number;
  interpolationIds: (string | number)[];
  enabledByUser: boolean;
  type: "group";
  isActive: boolean;
}

export const createGroupId = () => {
  return `group-config-${Math.floor(Math.random() * 10000)}`;
};

export class InterpolationGroup {
  enabledByUser: boolean;
  createdAt: number;
  name: string;
  groupId: string;
  interpolationIds: (string | number)[];
  type: string;
  isActive: boolean | null;

  createStorageRecord() {
    return {
      enabledByUser: this.enabledByUser,
      createdAt: this.createdAt,
      name: this.name,
      groupId: this.groupId,
      interpolationIds: this.interpolationIds,
      type: this.type,
    };
  }

  constructor(config: {
    name: string;
    interpolationIds: (number | string)[];
    createdAt?: number;
    groupId?: string;
  }) {
    this.createdAt = config.createdAt ?? Date.now();
    this.enabledByUser = true;
    this.name = config.name;
    this.groupId = config.groupId ?? createGroupId();
    this.interpolationIds = config.interpolationIds;
    this.type = "group";
    this.isActive = null;
  }
}
