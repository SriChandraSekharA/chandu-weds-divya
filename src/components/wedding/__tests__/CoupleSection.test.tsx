import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "../LanguageContext";
import CoupleSection from "../CoupleSection";

const renderSection = () =>
  render(
    <LanguageProvider>
      <CoupleSection />
    </LanguageProvider>
  );

describe("CoupleSection", () => {
  it("renders both names and parents", () => {
    renderSection();
    expect(screen.getByText("Sri Chandra sekhar")).toBeInTheDocument();
    expect(screen.getByText("Divya Sri")).toBeInTheDocument();
    expect(screen.getByText("Younger Son of")).toBeInTheDocument();
    expect(screen.getByText("Daughter of")).toBeInTheDocument();
    expect(screen.getByText("Sri. Venkata Ramana Murthy &")).toBeInTheDocument();
    expect(screen.getByText("Smt. Shashi Kala")).toBeInTheDocument();
    expect(screen.getByText("Sri. Karunakar &")).toBeInTheDocument();
    expect(screen.getByText("Smt. Anantha Lakshmi")).toBeInTheDocument();
  });
});