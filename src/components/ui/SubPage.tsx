import { ComponentChildren } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

interface SubPageProps {
  title: string;
  isOpen: boolean;
  onBack: () => void;
  children: ComponentChildren;
}

export function SubPage({ title, isOpen, onBack, children }: SubPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to top when opening
  useEffect(() => {
    if (isOpen && containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onBack}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.3)',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.25s ease-out',
        }}
      />

      {/* Sliding page */}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '500px',
          background: 'var(--color-bg-main, #f5f5f5)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.25s ease-out',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-md, 8px)',
            padding: 'var(--spacing-2xl, 16px)',
            background: 'var(--color-bg-card, #fff)',
            borderBottom: '1px solid var(--color-border, #e0e0e0)',
            flexShrink: 0,
          }}
        >
          <button
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              background: 'var(--color-bg-subtle, #f5f5f5)',
              border: 'none',
              borderRadius: 'var(--radius-full, 50%)',
              cursor: 'pointer',
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'var(--color-text-primary, #333)',
            }}
            aria-label="Go back"
          >
            ←
          </button>
          <h2 style={{ margin: 0, fontSize: 'var(--font-size-xl, 18px)', fontWeight: 600, color: 'var(--color-text-primary, #333)' }}>
            {title}
          </h2>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 'var(--spacing-2xl, 16px)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
