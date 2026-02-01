export interface FintechStyles {
    primaryColor?: string;
    borderRadius?: string;
    fontFamily?: string;
}

export interface FintechConfig {
    apiKey: string;
    baseURL?: string;
    styles?: FintechStyles;
}
