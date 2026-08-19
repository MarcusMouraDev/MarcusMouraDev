import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, Whatsapp } from "iconoir-react";
import { mailTo, publicProfile } from "../../data/site";
import type { RevealProps } from "./types";

type ContactSectionProps = {
  reveal: RevealProps;
};

export function ContactSection({ reveal }: ContactSectionProps) {
  return (
    <motion.section className="contact section-shell" id="contato" aria-labelledby="contact-title" {...reveal}>
      <img className="dot-field dot-field--contact" src="/assets/mm-dot-field.png" alt="" aria-hidden />
      <div className="contact-kicker">Tecnologia com propósito. Processos com clareza.</div>
      <h2 id="contact-title">
        Vamos construir <span>algo útil?</span>
      </h2>
      <p>Se você trabalha com software, automação, dados ou IA aplicada, vamos conversar.</p>
      <a className="button button--dark" href={mailTo()}>
        Conversar
        <ArrowUpRight width={20} height={20} strokeWidth={1.8} aria-hidden />
      </a>
      <div className="contact-links">
        <a href={mailTo()}>
          <Mail aria-hidden /> E-mail
        </a>
        <a href={publicProfile.whatsapp} target="_blank" rel="noreferrer">
          <Whatsapp aria-hidden /> WhatsApp
        </a>
        <a href={publicProfile.linkedin} target="_blank" rel="noreferrer">
          <Linkedin aria-hidden /> LinkedIn
        </a>
        <a href={publicProfile.github} target="_blank" rel="noreferrer">
          <Github aria-hidden /> GitHub
        </a>
      </div>
    </motion.section>
  );
}
