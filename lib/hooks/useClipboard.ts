async function copyToClipboard(text:string) {
  try {
    await navigator.clipboard.writeText(text)
    alert('ID successfully copied to clipboard')
  } catch (_) {
    alert('Failed to copy ID to clipboard.')
  }
}

export default function useClipboard() {
  return {
    copyToClipboard
  }
}