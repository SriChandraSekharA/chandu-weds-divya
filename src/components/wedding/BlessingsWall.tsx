import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage, t } from "./LanguageContext";

export interface Pledge {
  id: string;
  guest_name: string;
  gift_type: string;
  tree_count: number | null;
  message: string | null;
  created_at: string;
}

const BlessingsWall = ({ refreshKey }: { refreshKey: number }) => {
  const { lang } = useLanguage();
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data } = await supabase
        .from("gift_pledges")
        .select("id, guest_name, gift_type, tree_count, message, created_at")
        .order("created_at", { ascending: false });
      if (!active) return;
      setPledges((data as Pledge[]) ?? []);
      setLoading(false);
    };
    load();
    return () => {
      active = false;
    };
  }, [refreshKey]);

  const totalTrees = pledges.reduce((sum, p) => sum + (p.tree_count ?? 0), 0);

  return (
    <div className="mt-12">
      <h3 className="mb-6 text-center font-display text-2xl gradient-rose-gold-text">
        {t(lang, "thanks.wall_title")}
      </h3>

      <div className="mb-8 grid grid-cols-2 gap-4 text-center">
        <div className="gold-border-ornate rounded-lg bg-card/80 p-4">
          <p className="font-display text-3xl gradient-rose-gold-text">{totalTrees}</p>
          <p className="font-body text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {t(lang, "thanks.total_trees")}
          </p>
        </div>
        <div className="gold-border-ornate rounded-lg bg-card/80 p-4">
          <p className="font-display text-3xl gradient-rose-gold-text">{pledges.length}</p>
          <p className="font-body text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {t(lang, "thanks.total_guests")}
          </p>
        </div>
      </div>

      {!loading && pledges.length === 0 && (
        <p className="text-center font-body text-sm italic text-muted-foreground">
          {t(lang, "thanks.wall_empty")}
        </p>
      )}

      <ul className="space-y-4">
        {pledges.map((p, i) => (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
            className="gold-border-ornate rounded-lg bg-card/80 p-4 md:p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-display text-lg text-gold">{p.guest_name}</p>
              <p className="font-body text-sm text-muted-foreground">
                {t(lang, p.gift_type === "cauvery" ? "thanks.gift_cauvery" : "thanks.gift_amazon")}
                {p.tree_count ? ` · ${p.tree_count} ${t(lang, "thanks.trees_label")}` : ""}
              </p>
            </div>
            {p.message && (
              <p className="mt-2 font-body text-base italic text-muted-foreground">“{p.message}”</p>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default BlessingsWall;
