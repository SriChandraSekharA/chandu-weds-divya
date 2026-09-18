import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage, t } from "./LanguageContext";

type GiftType = "cauvery" | "amazon";

const schema = z.object({
  guest_name: z.string().trim().min(1).max(80),
  gift_type: z.enum(["cauvery", "amazon"]),
  tree_count: z.number().int().min(1).max(10000).nullable(),
  message: z.string().trim().max(500).nullable(),
});

const fieldClass =
  "w-full rounded-md border border-gold/40 bg-card/80 px-4 py-3 font-body text-base text-foreground placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none";

const GiftPledgeForm = ({ onSaved }: { onSaved: () => void }) => {
  const { lang } = useLanguage();
  const [name, setName] = useState("");
  const [giftType, setGiftType] = useState<GiftType>("cauvery");
  const [trees, setTrees] = useState("1");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError(t(lang, "thanks.error_name"));
      return;
    }

    const treeCount = giftType === "cauvery" ? Number(trees) : null;
    const parsed = schema.safeParse({
      guest_name: name,
      gift_type: giftType,
      tree_count: treeCount,
      message: message.trim() ? message : null,
    });

    if (!parsed.success) {
      setError(t(lang, giftType === "cauvery" ? "thanks.error_trees" : "thanks.error_name"));
      return;
    }

    setSaving(true);
    const { error: insertError } = await supabase.from("gift_pledges").insert(parsed.data);
    setSaving(false);

    if (insertError) {
      setError(t(lang, "thanks.error_save"));
      return;
    }

    setDone(true);
    setName("");
    setMessage("");
    setTrees("1");
    onSaved();
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gold-border-ornate rounded-lg bg-card/90 p-8 text-center"
      >
        <p className="font-display text-2xl gradient-rose-gold-text mb-4">{t(lang, "thanks.success")}</p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="font-body text-sm uppercase tracking-[0.2em] text-gold hover:underline"
        >
          {t(lang, "thanks.add_another")}
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="gold-border-ornate rounded-lg bg-card/90 p-6 md:p-8 space-y-5">
      <div>
        <label htmlFor="guest-name" className="mb-2 block font-body text-sm uppercase tracking-[0.14em] text-gold">
          {t(lang, "thanks.name")}
        </label>
        <input
          id="guest-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
          placeholder={t(lang, "thanks.name_placeholder")}
          className={fieldClass}
        />
      </div>

      <div>
        <span className="mb-2 block font-body text-sm uppercase tracking-[0.14em] text-gold">
          {t(lang, "thanks.gift")}
        </span>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(["cauvery", "amazon"] as GiftType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setGiftType(type)}
              className={`rounded-md border px-4 py-3 font-body text-sm transition-colors ${
                giftType === type
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-gold/30 text-muted-foreground hover:bg-gold/5"
              }`}
            >
              {t(lang, type === "cauvery" ? "thanks.gift_cauvery" : "thanks.gift_amazon")}
            </button>
          ))}
        </div>
      </div>

      {giftType === "cauvery" && (
        <div>
          <label htmlFor="tree-count" className="mb-2 block font-body text-sm uppercase tracking-[0.14em] text-gold">
            {t(lang, "thanks.trees")}
          </label>
          <input
            id="tree-count"
            type="number"
            min={1}
            max={10000}
            value={trees}
            onChange={(e) => setTrees(e.target.value)}
            className={fieldClass}
          />
        </div>
      )}

      <div>
        <label htmlFor="blessing" className="mb-2 block font-body text-sm uppercase tracking-[0.14em] text-gold">
          {t(lang, "thanks.message")}
        </label>
        <textarea
          id="blessing"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          rows={3}
          placeholder={t(lang, "thanks.message_placeholder")}
          className={fieldClass}
        />
      </div>

      {error && <p className="font-body text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-full border border-gold/70 bg-gold/15 px-6 py-3 font-body text-sm uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold/25 disabled:opacity-60"
      >
        {saving ? t(lang, "thanks.submitting") : t(lang, "thanks.submit")}
      </button>
    </form>
  );
};

export default GiftPledgeForm;
