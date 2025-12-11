interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

export function Toast({ message, type }: ToastProps) {
  const getIcon = () => {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      default: return 'ℹ';
    }
  };

  return (
    <div class={`toast toast-${type}`}>
      <span class="toast-icon">{getIcon()}</span>
      <span class="toast-message">{message}</span>
    </div>
  );
}
