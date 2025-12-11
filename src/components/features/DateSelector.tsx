import { useEffect, useRef } from 'preact/hooks';
import { selectedDate, allCheckins, sessionUser } from '../App';
import { formatLocalDate } from '../../utils/helpers';
import { selectedName, isFormExpanded } from '../pages/MainApp';

// Helper function to normalize names for comparison
function normalizeName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '');
}

// Check if session user is checked in for a given date
function isSessionUserCheckedIn(dateStr: string): boolean {
  const user = sessionUser.value;
  if (!user) return true; // No session user, don't pre-select

  const checkins = allCheckins.value[dateStr] || [];
  return checkins.some((c: { name?: string }) =>
    c.name && normalizeName(c.name) === normalizeName(user)
  );
}

function handleDateSelect(dateStr: string) {
  selectedDate.value = dateStr;

  // If session user exists and is NOT checked in for this date, pre-select their name
  if (sessionUser.value && !isSessionUserCheckedIn(dateStr)) {
    selectedName.value = sessionUser.value;
    isFormExpanded.value = true;
  } else {
    // User is already checked in, reset the form
    selectedName.value = '';
    isFormExpanded.value = false;
  }
}

export function DateSelector() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to today on initial load only
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Use setTimeout to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      // Always scroll to today on mount, regardless of selected date
      const todayButton = scrollContainer.querySelector('[data-today="true"]') as HTMLElement;
      if (todayButton) {
        // Use scrollIntoView with inline: 'start' to position today at the left
        todayButton.scrollIntoView({ behavior: 'instant', inline: 'start', block: 'nearest' });
      }
    }, 50);

    return () => clearTimeout(timeoutId);
  }, []); // Only run once on mount

  // Generate dates: 14 days in past + today + 14 days in future
  const dates = [];
  const today = new Date();
  const todayStr = formatLocalDate(today);

  for (let i = -14; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = formatLocalDate(date);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = date.getDate();
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });

    // Get check-in count for this date
    const checkins = allCheckins.value[dateStr] || [];
    const checkinCount = checkins.length;

    const isToday = dateStr === todayStr;
    const isPast = i < 0;

    dates.push({
      value: dateStr,
      dayName,
      dayNum,
      monthName,
      isToday,
      isPast,
      checkinCount,
    });
  }

  return (
    <div class="date-selector">
      <div class="date-scroll" ref={scrollRef}>
        {dates.map((date) => (
          <button
            key={date.value}
            class={`date-btn ${selectedDate.value === date.value ? 'selected' : ''} ${date.isPast ? 'past' : ''}`}
            onClick={() => handleDateSelect(date.value)}
            data-date={date.value}
            data-today={date.isToday ? 'true' : undefined}
          >
            <span class="day-name">{date.dayName}</span>
            <span class="day-num">{date.dayNum}</span>
            <span class="month-name">{date.monthName}</span>
            {date.isToday && <span class="today-badge">Today</span>}
            {date.checkinCount > 0 && (
              <span class="checkin-badge">{date.checkinCount}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
