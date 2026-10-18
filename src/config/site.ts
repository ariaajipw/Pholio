/**
 * Site configuration
 * Customize these values per client project
 * This file reads from site.json to share config with Node.js scripts
 */

import siteConfigJson from './site.json' with { type: 'json' };

interface SiteConfigJson {
  name: string;
  tagline: string;
  photographer: string;
  locale: string;
  baseUrl?: string;
  theme: {
    preset: 'editorial' | 'bold';
    brandColor?: string;
  };
  hero: {
    variant: 'overlap' | 'stagger';
  };
  header: {
    variant: 'centered-wordmark' | 'split-nav';
  };
  gallery: {
    views: Array<'grid' | 'stack'>;
  };
  features: {
    filter: boolean;
    lightbox: boolean;
    gridLines: boolean;
    whatsappFloating: boolean;
    entranceMotion: boolean;
  };
  contact: {
    email?: string;
    whatsapp?: string;
    instagram?: string;
    location?: string;
  };
  social: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
  navigation: Array<{
    label: string;
    href: string;
    featured?: boolean;
  }>;
}

const siteConfigJsonTyped = siteConfigJson as SiteConfigJson;

export interface SiteConfig {
  /** Site name displayed in header and metadata */
  name: string;
  /** Site tagline or short description */
  tagline: string;
  /** Photographer/business name */
  photographer: string;
  /** Default locale for the site */
  locale: string;
  /** Base URL for production (set when domain is known) */
  baseUrl?: string;
  /** Theme preset: 'editorial' | 'bold' */
  theme: {
    preset: 'editorial' | 'bold';
    /** Custom brand color (hex) - overrides preset */
    brandColor?: string;
  };
  /** Hero variant: 'overlap' | 'stagger' */
  hero: {
    variant: 'overlap' | 'stagger';
  };
  /** Header variant: 'centered-wordmark' | 'split-nav' */
  header: {
    variant: 'centered-wordmark' | 'split-nav';
  };
  /** Gallery views configuration */
  gallery: {
    views: Array<'grid' | 'stack'>;
  };
  /** Enabled features */
  features: {
    filter: boolean;
    lightbox: boolean;
    gridLines: boolean;
    whatsappFloating: boolean;
    entranceMotion: boolean;
  };
  /** Contact information */
  contact: {
    email?: string;
    whatsapp?: string;
    instagram?: string;
    location?: string;
  };
  /** Social links */
  social: Array<{
    name: string;
    url: string;
    icon: string; // SVG icon name or path
  }>;
  /** Navigation items */
  navigation: Array<{
    label: string;
    href: string;
    featured?: boolean;
  }>;
}

// Convert JSON config to SiteConfig type
function jsonToSiteConfig(json: SiteConfigJson): SiteConfig {
  return {
    name: json.name,
    tagline: json.tagline,
    photographer: json.photographer,
    locale: json.locale,
    baseUrl: json.baseUrl || undefined,
    theme: {
      preset: json.theme.preset,
      brandColor: json.theme.brandColor,
    },
    hero: {
      variant: json.hero.variant,
    },
    header: {
      variant: json.header.variant,
    },
    gallery: {
      views: json.gallery.views,
    },
    features: {
      filter: json.features.filter,
      lightbox: json.features.lightbox,
      gridLines: json.features.gridLines,
      whatsappFloating: json.features.whatsappFloating,
      entranceMotion: json.features.entranceMotion,
    },
    contact: json.contact,
    social: json.social,
    navigation: json.navigation,
  };
}

export const siteConfig: SiteConfig = jsonToSiteConfig(siteConfigJsonTyped);

export function getSiteConfig(): SiteConfig {
  return siteConfig;
}