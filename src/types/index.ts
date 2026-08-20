// Configuration for the Sapliy UI provider
export interface SapliyStyles {
    primaryColor?: string;
    borderRadius?: string;
    fontFamily?: string;
}

export interface SapliyConfig {
    apiKey: string;
    baseURL?: string;
    styles?: SapliyStyles;
}
