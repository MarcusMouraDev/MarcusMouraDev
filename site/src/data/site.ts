export const publicProfile = {
  name: "Marcus Moura",
  email: "mpfagundesmoura@gmail.com",
  siteUrl: "https://marcus-moura-portfolio.mpfagundesmoura.chatgpt.site",
  github: "https://github.com/MarcusMouraDev",
  linkedin: "https://www.linkedin.com/in/marcuspaulomoura",
  whatsapp: "https://wa.me/5531993555554",
  title: "Marcus Moura — Software, automação, dados e IA",
  description:
    "Portfólio de Marcus Moura: software, automação, dados e inteligência artificial aplicada a processos reais.",
  tagline: "Ideias ganham forma. Processos viram produto.",
} as const;

export const mailTo = (subject?: string) =>
  subject
    ? `mailto:${publicProfile.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${publicProfile.email}`;
