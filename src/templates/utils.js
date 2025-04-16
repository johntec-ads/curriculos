// Utilitário para formatação de datas e ordenação
export function formatDate(date) {
  if (!date) return 'Presente';
  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
  });
}

export function sortByDate(items) {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB - dateA;
  });
}