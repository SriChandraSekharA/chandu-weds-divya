import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "../LanguageContext";
import CountdownSection from "../CountdownSection";

describe("CountdownSection", () => {
  it("renders all four countdown unit labels", () => {
    render(
      <LanguageProvider>
        <CountdownSection />
      </LanguageProvider>
    );
    expect(screen.getByText("Days")).toBeInTheDocument();
    expect(screen.getByText("Hours")).toBeInTheDocument();
    expect(screen.getByText("Minutes")).toBeInTheDocument();
    expect(screen.getByText("Seconds")).toBeInTheDocument();
    expect(screen.getByText("The Big Day")).toBeInTheDocument();
  });
});