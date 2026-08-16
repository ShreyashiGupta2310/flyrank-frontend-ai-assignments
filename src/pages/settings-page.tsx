import { SettingsForm } from "../components/settings/settings-form";

export function SettingsPage() {
  return (
    <section className="page">
      <header className="page-header">
        <h1>Settings</h1>
        <p>Manage your profile and site preferences.</p>
      </header>
      <SettingsForm />
    </section>
  );
}
