import React from 'react'

const getTimePassed = (eventDate) => {
  // Diferença do tempo atual para o tempo do incidente em milissegundos
  const ms = new Date().getTime() - eventDate.getTime();
  // Converte e arredonda para o número mais próximo
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Precisa checar dps
  const years = Math.floor(days / 365);
  if (years > 0) {
    return `${years} ${years === 1 ? 'ano' : 'anos'}`;
  }
  if (months > 0) {
    return `${months} ${months === 1 ? 'mês' : 'meses'}`;
  }
  if (days > 0) {
    return `${days} ${days === 1 ? 'dia' : 'dias'}`;
  }
  if (hours > 0) {
    return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  }
  if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  }
  if (seconds > 0) {
    return `${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`;
  }
  return 'agora'; // Fallback para eventos mais recentes
};

export default getTimePassed;