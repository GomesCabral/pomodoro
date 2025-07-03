import { format } from 'date-fns';

export function formatDate(timestamp: number) {
  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    // Retorna uma string padrão ou vazia em caso de data inválida
    return 'Invalid date';
  }

  return format(date, 'dd/MM/yyyy HH:mm');
}
