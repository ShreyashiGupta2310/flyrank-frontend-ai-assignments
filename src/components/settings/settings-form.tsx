import { useState, type FormEvent } from "react";
import {
  DEFAULT_SETTINGS,
  hasValidationErrors,
  validateSettingsForm,
  type SettingsFormData,
  type SettingsFormErrors,
} from "../../utils/settings-validation";

const THEME_OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System default" },
] as const;

const LOCALE_OPTIONS = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
  { value: "es-ES", label: "Spanish" },
  { value: "fr-FR", label: "French" },
] as const;

export function SettingsForm() {
  const [formData, setFormData] = useState<SettingsFormData>(DEFAULT_SETTINGS);
  const [errors, setErrors] = useState<SettingsFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof SettingsFormData, boolean>>>({});
  const [savedMessage, setSavedMessage] = useState("");

  function updateField<K extends keyof SettingsFormData>(
    field: K,
    value: SettingsFormData[K],
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSavedMessage("");

    if (touched[field]) {
      const nextErrors = validateSettingsForm({ ...formData, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: nextErrors[field] }));
    }
  }

  function handleBlur(field: keyof SettingsFormData) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const nextErrors = validateSettingsForm(formData);
    setErrors((prev) => ({ ...prev, [field]: nextErrors[field] }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavedMessage("");

    const nextErrors = validateSettingsForm(formData);
    setErrors(nextErrors);
    setTouched({
      displayName: true,
      email: true,
      siteTitle: true,
      bio: true,
    });

    if (hasValidationErrors(nextErrors)) {
      return;
    }

    setSavedMessage("Settings saved successfully.");
  }

  function handleReset() {
    setFormData(DEFAULT_SETTINGS);
    setErrors({});
    setTouched({});
    setSavedMessage("");
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="displayName">Display name</label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          value={formData.displayName}
          onChange={(e) => updateField("displayName", e.target.value)}
          onBlur={() => handleBlur("displayName")}
          aria-invalid={Boolean(errors.displayName)}
          aria-describedby={errors.displayName ? "displayName-error" : undefined}
          autoComplete="name"
        />
        {errors.displayName && (
          <p id="displayName-error" className="field-error" role="alert">
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
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          autoComplete="email"
        />
        {errors.email && (
          <p id="email-error" className="field-error" role="alert">
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
          value={formData.siteTitle}
          onChange={(e) => updateField("siteTitle", e.target.value)}
          onBlur={() => handleBlur("siteTitle")}
          aria-invalid={Boolean(errors.siteTitle)}
          aria-describedby={errors.siteTitle ? "siteTitle-error" : undefined}
        />
        {errors.siteTitle && (
          <p id="siteTitle-error" className="field-error" role="alert">
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
            value={formData.theme}
            onChange={(e) => updateField("theme", e.target.value as SettingsFormData["theme"])}
          >
            {THEME_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="locale">Language</label>
          <select
            id="locale"
            name="locale"
            value={formData.locale}
            onChange={(e) => updateField("locale", e.target.value as SettingsFormData["locale"])}
          >
            {LOCALE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="bio">Bio / tagline</label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          value={formData.bio}
          onChange={(e) => updateField("bio", e.target.value)}
          onBlur={() => handleBlur("bio")}
          aria-invalid={Boolean(errors.bio)}
          aria-describedby={errors.bio ? "bio-error bio-hint" : "bio-hint"}
          placeholder="A short description for your profile or site"
        />
        <p id="bio-hint" className="field-hint">
          {formData.bio.length}/200 characters
        </p>
        {errors.bio && (
          <p id="bio-error" className="field-error" role="alert">
            {errors.bio}
          </p>
        )}
      </div>

      <div className="form-group form-group--checkbox">
        <label htmlFor="newsletterOptIn" className="checkbox-label">
          <input
            id="newsletterOptIn"
            name="newsletterOptIn"
            type="checkbox"
            checked={formData.newsletterOptIn}
            onChange={(e) => updateField("newsletterOptIn", e.target.checked)}
          />
          Subscribe to product updates and newsletter
        </label>
      </div>

      {savedMessage && (
        <p className="form-success" role="status">
          {savedMessage}
        </p>
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Save settings
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
}
