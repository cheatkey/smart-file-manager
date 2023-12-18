import dayjs from 'dayjs';

export const getTimeDifference = (date: Date) => {
  const now = dayjs();
  const targetDate = dayjs(date);
  const diffMonths = now.diff(targetDate, 'month');
  const diffDays = now.diff(targetDate, 'day') % 30;
  const diffHours = now.diff(targetDate, 'hour') % 24;
  const diffMinutes = now.diff(targetDate, 'minute') % 60;

  if (diffMonths > 0) return `${diffMonths}개월 전`;
  if (diffDays > 0 && diffHours > 0) return `${diffDays}일 ${diffHours}시간 전`;
  if (diffHours > 0) return `${diffHours}시간 전`;
  return `${diffMinutes}분 전`;
};
