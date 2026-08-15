import { Dialog } from "@base-ui/react/dialog";
import {
  ArrowUpRight,
  CheckCircle,
  NavArrowRight,
  Xmark,
} from "iconoir-react";
import type { PortfolioItem } from "../data/portfolio";

type CaseDialogProps = {
  item: PortfolioItem | null;
  onOpenChange: (open: boolean) => void;
};

export function CaseDialog({ item, onOpenChange }: CaseDialogProps) {
  const actionLabel =
    item?.status === "public"
      ? "Ver código no GitHub"
      : item?.status === "lab"
        ? "Conversar sobre o laboratório"
        : "Solicitar demonstração";

  return (
    <Dialog.Root open={Boolean(item)} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="dialog-backdrop" />
        <Dialog.Viewport className="dialog-viewport">
          {item ? (
            <Dialog.Popup className="case-dialog">
              <div className="case-dialog__topline">
                <span className="eyebrow">
                  {item.status === "lab" ? "LAB · EM CONSTRUÇÃO" : item.category}
                </span>
                <Dialog.Close className="icon-button" aria-label="Fechar detalhes do projeto">
                  <Xmark width={22} height={22} strokeWidth={1.8} aria-hidden />
                </Dialog.Close>
              </div>

              <Dialog.Title className="case-dialog__title">
                {item.editorialTitle ?? item.title}
              </Dialog.Title>
              <Dialog.Description className="case-dialog__description">
                {item.summary}
              </Dialog.Description>

              {item.editorialTitle ? (
                <p className="case-dialog__original-title">Projeto: {item.title}</p>
              ) : null}

              <div className="case-dialog__grid">
                <section>
                  <p className="case-dialog__label">Problema</p>
                  <p>{item.problem}</p>
                </section>
                <section>
                  <p className="case-dialog__label">Minha contribuição</p>
                  <p>{item.contribution}</p>
                </section>
                <section className="case-dialog__outcome">
                  <p className="case-dialog__label">Resultado</p>
                  <p>
                    <CheckCircle width={20} height={20} strokeWidth={1.8} aria-hidden />
                    {item.outcome}
                  </p>
                </section>
              </div>

              <div className="case-dialog__flow" aria-label="Fluxo simplificado">
                {item.flow.map((step, index) => (
                  <div className="dialog-flow-step" key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                    {index < item.flow.length - 1 ? (
                      <NavArrowRight width={18} height={18} strokeWidth={1.7} aria-hidden />
                    ) : null}
                  </div>
                ))}
              </div>

              <ul className="tag-list" aria-label="Tecnologias">
                {item.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>

              <div className="case-dialog__actions">
                <a className="button button--dark" href={item.href}>
                  {actionLabel}
                  <ArrowUpRight width={19} height={19} strokeWidth={1.8} aria-hidden />
                </a>
                <Dialog.Close className="button button--ghost">Voltar ao portfólio</Dialog.Close>
              </div>
            </Dialog.Popup>
          ) : null}
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
