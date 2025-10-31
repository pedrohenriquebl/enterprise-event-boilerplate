import { Injectable } from '@nestjs/common';

export type Theme = {
  id: string;
  name: string;
  variables: Record<string, string>;
  assets?: Partial<{
    logo: string;
    banner: string;
    favicon: string;
  }>;
};

@Injectable()
export class ThemesService {
  async findAll(): Promise<Theme[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      {
        id: 'default',
        name: 'Default Theme',
        variables: {
          '--background': '#ffffff',
          '--body-bg': '#FAFAFA',
          '--foreground': '#202020',
          '--text-primary': '#202020',
          '--text-details': '#808080',
          '--text-secondary': '#151631',
          '--cards-bg': '#F9F9F9',
          '--component-bg': '#E9E9E9',
          '--language-bg-primary': '#222222',
          '--secondary-bg': '#151631',
          '--language-auth-primary-bg': '#F2F2F2',
          '--accent-green': '#4DCF47',
          '--accent-green-dark': '#078E38',
          '--primary': '#0066ff',
          '--accent': '#00b894',
          '--profile-border': '1px solid #D9D9D9',
          '--selected-sidebar-bg-gradient':
            'linear-gradient(90deg, var(--accent-green-dark) 6%, var(--accent-green) 100%)',
          '--button-disabled-bg': '#808080',
          '--status-completed-bg': '#C2FFBF',
          '--text-status-completd': '#078E38',
          '--background-status-incompletd': '#FFD3D0',
          '--text-status-incompletd': '#EE5146',
          '--input-border': '1px solid #282828',
          '--scroll-bar-thumb': '#BFBFBF',
          '--scroll-bar-track': '#F2F2F2',
          '--cards-shadow': '0 1px 2px rgba(0,0,0,0.04)',
          '--foreground-contrast': '#0f172a',
        },
        assets: {
          logo: 'logo-default.png',
          banner: 'banner-default.png',
          favicon: 'favicon-default.ico',
        },
      },
      {
        id: 'dark',
        name: 'Dark',
        variables: {
          '--background': '#0a0a0a',
          '--body-bg': '#0a0a0a',
          '--foreground': '#e6eef8',
          '--text-primary': '#e6eef8',
          '--text-details': '#9aa3b2',
          '--text-secondary': '#cbd5e1',
          '--cards-bg': '#0f1720',
          '--component-bg': '#141418',
          '--language-bg-primary': '#111111',
          '--secondary-bg': '#0f1220',
          '--language-auth-primary-bg': '#0e0e0e',
          '--accent-green': '#2ecc71',
          '--accent-green-dark': '#1f8f4a',
          '--primary': '#3399ff',
          '--accent': '#66e7b8',
          '--profile-border': '1px solid #222222',
          '--selected-sidebar-bg-gradient':
            'linear-gradient(90deg, var(--accent-green-dark) 6%, var(--accent-green) 100%)',
          '--button-disabled-bg': '#666666',
          '--status-completed-bg': '#194d24',
          '--text-status-completd': '#1f8f4a',
          '--background-status-incompletd': '#4c1f1f',
          '--text-status-incompletd': '#ff8a80',
          '--input-border': '1px solid #444444',
          '--scroll-bar-thumb': '#2e2e2e',
          '--scroll-bar-track': '#0e0e0e',
          '--cards-shadow': '0 1px 2px rgba(0,0,0,0.6)',
          '--foreground-contrast': '#ffffff',
        },
        assets: {
          logo: 'logo-dark.png',
          banner: 'banner-dark.png',
          favicon: 'favicon-dark.ico',
        },
      },
      {
        id: 'sunset',
        name: 'Sunset (Brand A)',
        variables: {
          '--background': '#fff7ed',
          '--body-bg': '#fff7ed',
          '--foreground': '#2b2b2b',
          '--text-primary': '#202020',
          '--text-details': '#8b8b8b',
          '--text-secondary': '#151631',
          '--cards-bg': '#fff2e6',
          '--component-bg': '#ffe9d6',
          '--language-bg-primary': '#3a2b2b',
          '--secondary-bg': '#1b1b2b',
          '--language-auth-primary-bg': '#fff8f4',
          '--accent-green': '#4DCF47',
          '--accent-green-dark': '#078E38',
          '--primary': '#ff6b6b',
          '--accent': '#ffb86b',
          '--profile-border': '1px solid #e6dcd0',
          '--selected-sidebar-bg-gradient':
            'linear-gradient(90deg, var(--accent-green-dark) 6%, var(--accent-green) 100%)',
          '--button-disabled-bg': '#b0b0b0',
          '--status-completed-bg': '#C2FFBF',
          '--text-status-completd': '#078E38',
          '--background-status-incompletd': '#FFD3D0',
          '--text-status-incompletd': '#EE5146',
          '--input-border': '1px solid #282828',
          '--scroll-bar-thumb': '#d0c6bf',
          '--scroll-bar-track': '#fff8f4',
          '--cards-shadow': '0 1px 4px rgba(0,0,0,0.04)',
          '--foreground-contrast': '#2b2b2b',
        },
        assets: {
          logo: 'logo-sunset.png',
          banner: 'banner-sunset.png',
          favicon: 'favicon-sunset.ico',
        },
      },
    ];
  }
}
