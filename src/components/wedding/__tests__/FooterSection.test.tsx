import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "../LanguageContext";
import FooterSection from "../FooterSection";

describe("FooterSection", () => {
  it("renders a working WhatsApp share link", () => {
    render(
      <LanguageProvider>
        <FooterSection />
      </LanguageProvider>
    );
    const link = screen.getByRole("link", { name: /Share on WhatsApp/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("wa.me"));
    expect(link).toHaveAttribute("target", "_blank");
  });
});
