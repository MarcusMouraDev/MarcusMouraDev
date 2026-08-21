import { motion } from "motion/react";
import { useMountStagger } from "../motion";

export function SiteHeader() {
  const mount = useMountStagger();

  return (
    <motion.header className="site-header" {...mount(0, 0, -8)}>
      <a className="wordmark" href="#top" aria-label="Marcus Moura, início">
        MM<span aria-hidden="true" />
      </a>
      <nav aria-label="Navegação principal">
        <a href="#projetos">Projetos</a>
        <a href="#sobre">Sobre</a>
        <a href="#contato">Contato</a>
      </nav>
    </motion.header>
  );
}
