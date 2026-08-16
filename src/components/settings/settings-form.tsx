import { useState } from "react";
import {
  DEFAULT_SETTINGS,
  SETTINGS_FIELD_ORDER,
  validateAllSettingsFields,
  validateSettingsField,
  type Language,
  type SettingsFormData,
  type Theme,
} from "../../utils/settings-validation";

type SettingsFormErrors = Partial<Record<keyof SettingsFormData, string>>;
type TouchedFields = Partial<Record<keyof SettingsFormData, boolean>>;

const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System default" },
];

const LANGUAGE_OPTIONS: { value: Language; label: string }[] = [
  { value: "en-US", label: "English (US)" },
  { value: "hi", label: "Hindi" },
  { value: "fr", label: "French" },
];

const FIELD_IDS: Record<keyof SettingsFormData, string> = {
  displayName: "displayName",
  email: "email",
  siteTitle: "siteTitle",
  theme: "theme",
  language: "language",
  bio: "bio",
  newsletter: "newsletter",
};

function hasErrors(errors: SettingsFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

function focusFirstInvalidField(errors: SettingsFormErrors): void {
  for (const field of SETTINGS_FIELD_ORDER) {
    if (errors[field]) {
      document.getElementById(FIELD_IDS[field])?.focus();
      break;
    }
  }
}

export function SettingsForm() {
  const [values, setValues] = useState<SettingsFormData>(DEFAULT_SETTINGS);
  const [errors, setErrors] = useState<SettingsFormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function setFieldError(
    field: keyof SettingsFormData,
    error: string | null,
  ): void {
    setErrors((current) => {
      const next = { ...current };
      if (error) {
        next[field] = error;
      } else {
        delete next[field];
      }
      return next;
    });
  }

  function updateField<K extends keyof SettingsFormData>(
    field: K,
    value: SettingsFormData[K],
  ): void {
    setValues((current) => ({ ...current, [field]: value }));
    setSuccessMessage("");

    if (touched[field] || submitted) {
      setFieldError(field, validateSettingsField(field, value));
    }
  }

  function handleBlur(field: keyof SettingsFormData): void {
    setTouched((current) => ({ ...current, [field]: true }));
    setFieldError(field, validateSettingsField(field, values[field]));
  }

  function shouldShowError(field: keyof SettingsFormData): boolean {
    return Boolean(errors[field] && (touched[field] || submitted));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setSubmitted(true);
    setSuccessMessage("");

    const nextErrors = validateAllSettingsFields(values);
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      focusFirstInvalidField(nextErrors);
      return;
    }

    setSuccessMessage("Settings saved successfully.");
  }

  function handleReset(): void {
    setValues(DEFAULT_SETTINGS);
    setErrors({});
    setTouched({});
    setSubmitted(false);
    setSuccessMessage("");
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="displayName">Display name</label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          value={values.displayName}
          onChange={(event) => updateField("displayName", event.target.value)}
          onBlur={() => handleBlur("displayName")}
          aria-invalid={shouldShowError("displayName")}
          aria-describedby={
            shouldShowError("displayName") ? "displayName-error" : undefined
          }
          autoComplete="name"
        />
        {shouldShowError("displayName") && (
          <p id="displayName-error" className="field-error">
            {errors.displayName}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          onBlur={() => handleBlur("email")}
          aria-invalid={shouldShowError("email")}
          aria-describedby={shouldShowError("email") ? "email-error" : undefined}
          autoComplete="email"
        />
        {shouldShowError("email") && (
          <p id="email-error" className="field-error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="siteTitle">Site title</label>
        <input
          id="siteTitle"
          name="siteTitle"
          type="text"
          value={values.siteTitle}
          onChange={(event) => updateField("siteTitle", event.target.value)}
          onBlur={() => handleBlur("siteTitle")}
          aria-invalid={shouldShowError("siteTitle")}
          aria-describedby={
            shouldShowError("siteTitle") ? "siteTitle-error" : undefined
          }
        />
        {shouldShowError("siteTitle") && (
          <p id="siteTitle-error" className="field-error">
            {errors.siteTitle}
          </p>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="theme">Theme</label>
          <select
            id="theme"
            name="theme"
            value={values.theme}
            onChange={(event) =>
              updateField("theme", event.target.value as Theme)
            }
            onBlur={() => handleBlur("theme")}
            aria-invalid={shouldShowError("theme")}
            aria-describedby={
              shouldShowError("theme") ? "theme-error" : undefined
            }
          >
            {THEME_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {shouldShowError("theme") && (
            <p id="theme-error" className="field-error">
              {errors.theme}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            name="language"
            value={values.language}
            onChange={(event) =>
              updateField("language", event.target.value as Language)
            }
            onBlur={() => handleBlur("language")}
            aria-invalid={shouldShowError("language")}
            aria-describedby={
              shouldShowError("language") ? "language-error" : undefined
            }
          >
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {shouldShowError("language") && (
            <p id="language-error" className="field-error">
              {errors.language}
            </p>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="bio">Bio / tagline</label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          value={values.bio}
          maxLength={200}
          onChange={(event) => {
            const nextValue = event.target.value;
            if (nextValue.length <= 200) {
              updateField("bio", nextValue);
            }
          }}
          onBlur={() => handleBlur("bio")}
          aria-invalid={shouldShowError("bio")}
          aria-describedby={
            shouldShowError("bio") ? "bio-error bio-hint" : "bio-hint"
          }
        />
        <p id="bio-hint" className="field-hint">
          {values.bio.length}/200
        </p>
        {shouldShowError("bio") && (
          <p id="bio-error" className="field-error">
            {errors.bio}
          </p>
        )}
      </div>

      <div className="form-group form-group--checkbox">
        <label htmlFor="newsletter" className="checkbox-label">
          <input
            id="newsletter"
            name="newsletter"
            type="checkbox"
            checked={values.newsletter}
            onChange={(event) =>
              updateField("newsletter", event.target.checked)
            }
            onBlur={() => handleBlur("newsletter")}
            aria-invalid={shouldShowError("newsletter")}
            aria-describedby={
              shouldShowError("newsletter") ? "newsletter-error" : undefined
            }
          />
          Newsletter
        </label>
        {shouldShowError("newsletter") && (
          <p id="newsletter-error" className="field-error">
            {errors.newsletter}
          </p>
        )}
      </div>

      {successMessage && (
        <p className="form-success" role="status">
          {successMessage}
        </p>
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Save settings
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </form>
  );
}
