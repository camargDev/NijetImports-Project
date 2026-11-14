// Utilitários de <dialog> nativo: fechar por botão, clique no fundo e devolver o foco.
export function openDialog(dialog, opener) {
  if (!dialog || dialog.open) return;
  dialog.__opener = opener || document.activeElement;
  dialog.showModal();
}
export function initDialogs() {
  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
      if (e.target.closest('[data-close-dialog]')) dialog.close();
    });
    dialog.addEventListener('close', () => {
      const op = dialog.__opener;
      if (op && document.contains(op)) op.focus();
    });
  });
}
