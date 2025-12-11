import { ComponentChildren } from 'preact';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  subtitle?: string;
  children: ComponentChildren;
  showCloseButton?: boolean;
}

export function Modal({ isOpen, onClose, title, subtitle, children, showCloseButton = true }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div class="modal active" onClick={(e) => {
      if (e.target === e.currentTarget && onClose) {
        onClose();
      }
    }}>
      <div class="modal-content" onClick={(e) => e.stopPropagation()}>
        <div class="modal-header">
          <div>
            <h2>{title}</h2>
            {subtitle && <p style="font-size: 12px; color: #666; margin: 4px 0 0 0;">{subtitle}</p>}
          </div>
          {showCloseButton && onClose && (
            <button class="close-btn" onClick={onClose}>&times;</button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
