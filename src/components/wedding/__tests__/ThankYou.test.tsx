import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider, t } from "../LanguageContext";
import GiftPledgeForm from "../GiftPledgeForm";

const insert = vi.fn();

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({ insert: (payload: unknown) => insert(payload) }),
  },
}));

const renderForm = () =>
  render(
    <MemoryRouter>
      <LanguageProvider>
        <GiftPledgeForm onSaved={() => {}} />
      </LanguageProvider>
    </MemoryRouter>,
  );

describe("GiftPledgeForm", () => {
  beforeEach(() => {
    insert.mockReset();
    insert.mockResolvedValue({ error: null });
  });

  it("requires a guest name", async () => {
    renderForm();
    fireEvent.click(screen.getByRole("button", { name: t("en", "thanks.submit") }));
    expect(await screen.findByText(t("en", "thanks.error_name"))).toBeInTheDocument();
    expect(insert).not.toHaveBeenCalled();
  });

  it("saves a tree pledge with the tree count", async () => {
    renderForm();
    fireEvent.change(screen.getByLabelText(t("en", "thanks.name")), { target: { value: "Ravi" } });
    fireEvent.change(screen.getByLabelText(t("en", "thanks.trees")), { target: { value: "5" } });
    fireEvent.click(screen.getByRole("button", { name: t("en", "thanks.submit") }));

    await waitFor(() =>
      expect(insert).toHaveBeenCalledWith({
        guest_name: "Ravi",
        gift_type: "cauvery",
        tree_count: 5,
        message: null,
      }),
    );
    expect(await screen.findByText(t("en", "thanks.success"))).toBeInTheDocument();
  });

  it("omits the tree count for gift cards", async () => {
    renderForm();
    fireEvent.change(screen.getByLabelText(t("en", "thanks.name")), { target: { value: "Divya" } });
    fireEvent.click(screen.getByRole("button", { name: t("en", "thanks.gift_amazon") }));
    fireEvent.click(screen.getByRole("button", { name: t("en", "thanks.submit") }));

    await waitFor(() =>
      expect(insert).toHaveBeenCalledWith({
        guest_name: "Divya",
        gift_type: "amazon",
        tree_count: null,
        message: null,
      }),
    );
  });

  it("has Telugu translations for the new keys", () => {
    ["thanks.title", "thanks.submit", "thanks.wall_title", "gift.pledge_cta"].forEach((key) => {
      expect(t("te", key)).not.toBe(key);
    });
  });
});
