import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "../LanguageContext";
import EventsSection from "../EventsSection";

describe("EventsSection", () => {
  it("renders Muhurtham only and shows the updated time", () => {
    render(
      <LanguageProvider>
        <EventsSection />
      </LanguageProvider>
    );
    expect(screen.getByText("Muhurtham")).toBeInTheDocument();
    expect(screen.getByText("9:33 AM")).toBeInTheDocument();
    expect(screen.queryByText("Dinner")).not.toBeInTheDocument();
  });
});