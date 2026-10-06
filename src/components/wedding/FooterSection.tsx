import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MessageCircle, Link as LinkIcon } from "lucide-react";
import mandalaImg from "@/assets/mandala-top.png";
import { useLanguage, t } from "./LanguageContext";

const FooterSection = () => {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [copied, setCopied] = useState(false);

  const invitationUrl = typeof window !== "undefined" ? window.location.origin : "";
  const whatsappMessage = encodeURIComponent(
    `You are invited to the wedding of Sri Chandra Sekhar & Divya Sri! 💒 ${invitationUrl}`
  );

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${whatsappMessage}`, "_blank");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(invitationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = invitationUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section ref={ref} className="relative min-h-[60vh] flex items-center justify-center py-12 md:py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none">
        <img
          src={mandalaImg}
          alt=""
          className="w-[500px] h-[500px] max-w-[90vw] max-h-[90vw] animate-spin-slow rounded-full object-cover"
          style={{
            WebkitMaskImage: "radial-gradient(circle, black 55%, transparent 72%)",
            maskImage: "radial-gradient(circle, black 55%, transparent 72%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center w-full">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.8 }}
          className="font-script text-3xl md:text-4xl gradient-rose-gold-text mb-6">
          {t(lang, "footer.invite")}
        </motion.p>

        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6, duration: 0.8 }}
          className="font-body text-lg text-foreground/70 mb-4">
          {t(lang, "footer.request")}
        </motion.p>

        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.8, duration: 0.8 }}
          className="font-body text-base text-muted-foreground italic">
          {t(lang, "footer.quote")}
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1, duration: 1 }} className="mt-12">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4" />
          <p className="font-body text-sm tracking-[0.3em] uppercase text-gold/40">{t(lang, "footer.with")}</p>
          <p className="font-body text-sm text-gold/30 mt-2">{t(lang, "footer.families")}</p>
        </motion.div>

        {/* Share buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ delay: 1.2, duration: 0.8 }} 
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/30 rounded-full text-gold hover:from-gold/30 hover:to-gold/20 transition-all duration-300 font-body text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            {t(lang, "footer.share_whatsapp")}
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/30 rounded-full text-gold hover:from-gold/30 hover:to-gold/20 transition-all duration-300 font-body text-sm"
          >
            <LinkIcon className="w-4 h-4" />
            {copied ? t(lang, "footer.link_copied") : t(lang, "footer.copy_link")}
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default FooterSection;
