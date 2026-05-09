import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { LanguageProvider, useLanguage, t } from "../LanguageContext";

const Probe = () => {
  const { lang, toggle } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="title">{t(lang, "hero.title")}</span>
      <button onClick={toggle}>toggle</button>
    </div>
  );
};

describe("LanguageContext", () => {
  it("defaults to English and translates keys", () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );
    expect(screen.getByTestId("lang").textContent).toBe("en");
    expect(screen.getByTestId("title").textContent).toBe("Wedding Invitation");
  });

  it("toggles to Telugu", () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );
    act(() => {
      screen.getByText("toggle").click();
    });
    expect(screen.getByTestId("lang").textContent).toBe("te");
    expect(screen.getByTestId("title").textContent).toBe("వివాహ శుభలేఖ");
  });

  it("returns key when translation is missing", () => {
    expect(t("en", "nonexistent.key")).toBe("nonexistent.key");
  });

  it("contains updated couple and event details", () => {
    expect(t("en", "couple.son_of")).toBe("Younger Son of");
    expect(t("en", "couple.groom_father")).toBe("Sri. Venkata Ramana Murthy &");
    expect(t("en", "couple.groom_mother")).toBe("Smt. Shashi Kala");
    expect(t("en", "couple.bride_father")).toBe("Sri. Karunakar &");
    expect(t("en", "couple.bride_mother")).toBe("Smt. Anantha Lakshmi");
    expect(t("en", "events.time_muhurtham")).toBe("9:33 AM");
  });
});