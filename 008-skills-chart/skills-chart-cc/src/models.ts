export interface ISkillInfo {
    name: string;
    icon_url?: string;
}

export interface ISkillSummary extends ISkillInfo {
    id: string;
    count: number;
    users: IUserAttribution[];
}

export interface IUserAttribution {
    userId: number;
    name: string;
}