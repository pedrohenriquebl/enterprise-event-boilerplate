export interface Theme {
  id: string;
  name: string;
  variables: Record<string, string>;
  assets?: {
    logo: string;
    logoFooter?: string;
    banner: string;
    favicon: string;
  };
}
