import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, Whatsapp } from "iconoir-react";
import { mailTo, publicProfile } from "../../data/site";
import { useStagger } from "../../motion";
import type { RevealProps } from "./types";

type ContactSectionProps = {
  reveal: RevealProps;
};

const contactLinks = [
  { href: mailTo(), label: "E-mail", Icon: Mail, external: false },
  { href: publicProfile.whatsapp, label: "WhatsApp", Icon: Whatsapp, external: true },
  { href: publicProfile.linkedin, label: "LinkedIn", Icon: Linkedin, external: true },
  { href: publicProfile.github, label: "GitHub", Icon: Github, external: true },
];

export function ContactSection({ reveal }: ContactSectionProps) {
  const stagger = useStagger();

  return (
    <motion.section className="contact section-shell" id="contato" aria-labelledby="contact-title" {...reveal}>
      <img className="dot-field dot-field--contact" src="/assets/mm-dot-field.svg" alt="" aria-hidden />
      <div className="contact-kicker">Software, automação, dados e IA.</div>
      <h2 id="contact-title">
        Quer <span>conversar?</span>
      </h2>
      <p>Se o assunto for software, automação, dados ou IA, me chama.</p>
      <a className="button button--dark" href={mailTo()}>
        Conversar
        <ArrowUpRight width={20} height={20} strokeWidth={1.8} aria-hidden />
      </a>
      <div className="contact-links">
        {contactLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
            {...stagger(index)}
          >
            <link.Icon aria-hidden /> {link.label}
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}
