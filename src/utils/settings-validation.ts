export type Theme = "light" | "dark" | "system";

export type Language = "en-US" | "hi" | "fr";

export interface SettingsFormData {
  displayName: string;
  email: string;
  siteTitle: string;
  theme: Theme;
  language: Language;
  bio: string;
  newsletter: boolean;
}

export const DEFAULT_SETTINGS: SettingsFormData = {
  displayName: "",
  email: "",
  siteTitle: "",
  theme: "system",
  language: "en-US",
  bio: "",
  newsletter: false,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const THEMES: Theme[] = ["light", "dark", "system"];
const LANGUAGES: Language[] = ["en-US", "hi", "fr"];

export function validateDisplayName(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return "Display name is required.";
  }
  if (trimmed.length < 2) {
    return "Display name must be at least 2 characters.";
  }
  if (trimmed.length > 50) {
    return "Display name must be 50 characters or fewer.";
  }
  return null;
}

export function validateEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return "Email is required.";
  }
  if (!EMAIL_PATTERN.test(trimmed)) {
    return "Enter a valid email address.";
  }
  return null;
}

export function validateSiteTitle(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return "Site title is required.";
  }
  if (trimmed.length > 80) {
    return "Site title must be 80 characters or fewer.";
  }
  return null;
}

export function validateTheme(value: Theme): string | null {
  if (!THEMES.includes(value)) {
    return "Select a valid theme.";
  }
  return null;
}

export function validateLanguage(value: Language): string | null {
  if (!LANGUAGES.includes(value)) {
    return "Select a valid language.";
  }
  return null;
}

export function validateBio(value: string): string | null {
  if (value.trim().length > 200) {
    return "Bio must be 200 characters or fewer.";
  }
  return null;
}

export function validateNewsletter(_value: boolean): string | null {
  return null;
}

export const SETTINGS_FIELD_ORDER: (keyof SettingsFormData)[] = [
  "displayName",
  "email",
  "siteTitle",
  "theme",
  "language",
  "bio",
  "newsletter",
];

export function validateSettingsField(
  field: keyof SettingsFormData,
  value: SettingsFormData[keyof SettingsFormData],
): string | null {
  switch (field) {
    case "displayName":
      return validateDisplayName(value as string);
    case "email":
      return validateEmail(value as string);
    case "siteTitle":
      return validateSiteTitle(value as string);
    case "theme":
      return validateTheme(value as Theme);
    case "language":
      return validateLanguage(value as Language);
    case "bio":
      return validateBio(value as string);
    case "newsletter":
      return validateNewsletter(value as boolean);
  }
}

export function validateAllSettingsFields(
  data: SettingsFormData,
): Partial<Record<keyof SettingsFormData, string>> {
  const errors: Partial<Record<keyof SettingsFormData, string>> = {};

  for (const field of SETTINGS_FIELD_ORDER) {
    const error = validateSettingsField(field, data[field]);
    if (error) {
      errors[field] = error;
    }
  }

  return errors;
}
