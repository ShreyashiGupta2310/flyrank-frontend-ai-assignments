export type Theme = "light" | "dark" | "system";
export type Locale = "en-US" | "en-GB" | "es-ES" | "fr-FR";

export interface SettingsFormData {
  displayName: string;
  email: string;
  siteTitle: string;
  theme: Theme;
  locale: Locale;
  newsletterOptIn: boolean;
  bio: string;
}

export type SettingsFormErrors = Partial<Record<keyof SettingsFormData, string>>;

export const DEFAULT_SETTINGS: SettingsFormData = {
  displayName: "",
  email: "",
  siteTitle: "",
  theme: "system",
  locale: "en-US",
  newsletterOptIn: false,
  bio: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSettingsForm(data: SettingsFormData): SettingsFormErrors {
  const errors: SettingsFormErrors = {};

  const displayName = data.displayName.trim();
  if (!displayName) {
    errors.displayName = "Display name is required.";
  } else if (displayName.length < 2) {
    errors.displayName = "Display name must be at least 2 characters.";
  } else if (displayName.length > 50) {
    errors.displayName = "Display name must be 50 characters or fewer.";
  }

  const email = data.email.trim();
  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  const siteTitle = data.siteTitle.trim();
  if (!siteTitle) {
    errors.siteTitle = "Site title is required.";
  } else if (siteTitle.length > 80) {
    errors.siteTitle = "Site title must be 80 characters or fewer.";
  }

  const bio = data.bio.trim();
  if (bio.length > 200) {
    errors.bio = "Bio must be 200 characters or fewer.";
  }

  return errors;
}

export function hasValidationErrors(errors: SettingsFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
