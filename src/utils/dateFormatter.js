export function formatDateTime(value,lang='ar') {
    return new Date(value).toLocaleDateString(`${lang}-EG`, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }
  