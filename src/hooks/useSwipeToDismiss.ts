/**
 * Swipe-to-dismiss hook for bottom sheet drawers
 *
 * Provides touch handling for dismissing drawers by swiping down.
 * Returns props to spread on the drawer element.
 */

import { useRef, useCallback } from 'preact/hooks';
import { signal } from '@preact/signals';

interface SwipeToDismissOptions {
  onDismiss: () => void;
  threshold?: number; // Percentage of drawer height to trigger dismiss (0-1)
  enabled?: boolean;
}

interface TouchState {
  startY: number;
  currentY: number;
  isDragging: boolean;
}

export function useSwipeToDismiss({
  onDismiss,
  threshold = 0.25, // 25% of drawer height
  enabled = true,
}: SwipeToDismissOptions) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const touchState = useRef<TouchState>({
    startY: 0,
    currentY: 0,
    isDragging: false,
  });

  // Use signal for reactive transform updates
  const translateY = signal(0);
  const isDragging = signal(false);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!enabled) return;

    const touch = e.touches[0];
    const drawer = drawerRef.current;

    // Only start drag from the handle area (top 60px) or if already scrolled to top
    if (drawer) {
      const touchY = touch.clientY - drawer.getBoundingClientRect().top;
      const isAtTop = drawer.scrollTop <= 0;
      const isInHandleArea = touchY < 60;

      if (!isAtTop && !isInHandleArea) {
        return;
      }
    }

    touchState.current = {
      startY: touch.clientY,
      currentY: touch.clientY,
      isDragging: true,
    };
    isDragging.value = true;
  }, [enabled]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!enabled || !touchState.current.isDragging) return;

    const touch = e.touches[0];
    const deltaY = touch.clientY - touchState.current.startY;

    // Only allow downward swipes (positive deltaY)
    if (deltaY > 0) {
      e.preventDefault(); // Prevent scroll while swiping
      touchState.current.currentY = touch.clientY;
      translateY.value = deltaY;
    } else {
      // Reset if trying to swipe up
      translateY.value = 0;
    }
  }, [enabled]);

  const handleTouchEnd = useCallback(() => {
    if (!enabled || !touchState.current.isDragging) return;

    const drawer = drawerRef.current;
    const deltaY = touchState.current.currentY - touchState.current.startY;

    // Calculate threshold based on drawer height
    const drawerHeight = drawer?.offsetHeight || 300;
    const dismissThreshold = drawerHeight * threshold;

    if (deltaY > dismissThreshold) {
      // Animate out and dismiss
      translateY.value = drawerHeight;
      setTimeout(() => {
        onDismiss();
        translateY.value = 0;
      }, 200);
    } else {
      // Snap back
      translateY.value = 0;
    }

    touchState.current.isDragging = false;
    isDragging.value = false;
  }, [enabled, threshold, onDismiss]);

  // Get the style to apply to the drawer
  const getDrawerStyle = () => {
    const y = translateY.value;
    if (y === 0) {
      return {};
    }
    return {
      transform: `translateY(${y}px)`,
      transition: isDragging.value ? 'none' : 'transform 0.2s ease-out',
    };
  };

  return {
    drawerRef,
    swipeHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    getDrawerStyle,
    translateY,
  };
}
