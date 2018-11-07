export interface ISkillInfo {
    name: string;
    icon_url?: string;
}

export interface ISkillSummary extends ISkillInfo {
    name: string;
    id: string;
    count: number;
    users: IUserAttribution[];
    icon_url?: string;
}
 export interface IUserAttribution {
    userId: number;
    name: string;
} 