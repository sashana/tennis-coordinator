// Calendar event generation utility

interface CalendarEventParams {
  date: string; // YYYY-MM-DD format
  title: string;
  description: string;
  location?: string;
  startTime?: string; // HH:MM format (24h)
  endTime?: string; // HH:MM format (24h)
}

// Format date for ICS (YYYYMMDD or YYYYMMDDTHHmmss)
function formatICSDate(dateStr: string, time?: string): string {
  const date = dateStr.replace(/-/g, '');
  if (time) {
    const formattedTime = time.replace(':', '') + '00';
    return `${date}T${formattedTime}`;
  }
  return date;
}

// Escape special characters for ICS format
function escapeICS(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

// Generate unique ID for calendar event
function generateUID(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}@tenniscoordinator`;
}

// Generate ICS file content
export function generateICSContent(params: CalendarEventParams): string {
  const { date, title, description, location, startTime, endTime } = params;
  const uid = generateUID();
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tennis Coordinator//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${timestamp}`,
  ];

  // Add date/time
  if (startTime && endTime) {
    // Timed event
    icsContent.push(`DTSTART:${formatICSDate(date, startTime)}`);
    icsContent.push(`DTEND:${formatICSDate(date, endTime)}`);
  } else if (startTime) {
    // Start time only - assume 2 hour duration
    icsContent.push(`DTSTART:${formatICSDate(date, startTime)}`);
    // Calculate end time (add 2 hours)
    const [hours, mins] = startTime.split(':').map(Number);
    const endHours = (hours + 2) % 24;
    const endTimeStr = `${endHours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    icsContent.push(`DTEND:${formatICSDate(date, endTimeStr)}`);
  } else {
    // All-day event
    icsContent.push(`DTSTART;VALUE=DATE:${formatICSDate(date)}`);
    // For all-day events, DTEND should be the next day
    const dateObj = new Date(date + 'T00:00:00');
    dateObj.setDate(dateObj.getDate() + 1);
    const nextDay = dateObj.toISOString().split('T')[0];
    icsContent.push(`DTEND;VALUE=DATE:${formatICSDate(nextDay)}`);
  }

  icsContent.push(`SUMMARY:${escapeICS(title)}`);
  icsContent.push(`DESCRIPTION:${escapeICS(description)}`);

  if (location) {
    icsContent.push(`LOCATION:${escapeICS(location)}`);
  }

  icsContent.push('END:VEVENT');
  icsContent.push('END:VCALENDAR');

  return icsContent.join('\r\n');
}

// Detect if running on mobile
function isMobile(): boolean {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// Generate Google Calendar URL
function generateGoogleCalendarUrl(params: CalendarEventParams): string {
  const { date, title, description, location, startTime, endTime } = params;

  // Format dates for Google Calendar (YYYYMMDDTHHMMSS or YYYYMMDD for all-day)
  let dates: string;
  if (startTime && endTime) {
    const start = `${date.replace(/-/g, '')}T${startTime.replace(':', '')}00`;
    const end = `${date.replace(/-/g, '')}T${endTime.replace(':', '')}00`;
    dates = `${start}/${end}`;
  } else if (startTime) {
    // Start time only - assume 2 hour duration
    const [hours, mins] = startTime.split(':').map(Number);
    const endHours = (hours + 2) % 24;
    const endTimeStr = `${endHours.toString().padStart(2, '0')}${mins.toString().padStart(2, '0')}00`;
    const start = `${date.replace(/-/g, '')}T${startTime.replace(':', '')}00`;
    const end = `${date.replace(/-/g, '')}T${endTimeStr}`;
    dates = `${start}/${end}`;
  } else {
    // All-day event
    const dateStr = date.replace(/-/g, '');
    const nextDate = new Date(date + 'T00:00:00');
    nextDate.setDate(nextDate.getDate() + 1);
    const nextDateStr = nextDate.toISOString().split('T')[0].replace(/-/g, '');
    dates = `${dateStr}/${nextDateStr}`;
  }

  const baseUrl = 'https://calendar.google.com/calendar/render';
  const queryParams = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: dates,
    details: description,
  });

  if (location) {
    queryParams.set('location', location);
  }

  return `${baseUrl}?${queryParams.toString()}`;
}

// Add to calendar - uses Google Calendar on mobile, ICS download on desktop
export function downloadICSFile(params: CalendarEventParams, filename?: string): void {
  if (isMobile()) {
    // On mobile, open Google Calendar which works reliably
    const googleUrl = generateGoogleCalendarUrl(params);
    window.open(googleUrl, '_blank');
  } else {
    // On desktop, use ICS file download
    const content = generateICSContent(params);
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `tennis-${params.date}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

// Helper to build calendar event from match data
export interface MatchCalendarData {
  date: string;
  matchType: string;
  players: { name: string; timeRange?: { start: string; end: string } }[];
  groupName: string;
  location?: string;
  notes?: string;
}

export function createCalendarEventFromMatch(data: MatchCalendarData): CalendarEventParams {
  const { date, matchType, players, groupName, location, notes } = data;

  // Build title
  const typeLabel = matchType.includes('doubles')
    ? 'Doubles'
    : matchType.includes('singles')
      ? 'Singles'
      : 'Tennis';
  const title = `${typeLabel} - ${groupName}`;

  // Build description
  let description = `Players: ${players.map((p) => p.name).join(', ')}`;

  if (notes) {
    description += `\n\nNotes: ${notes}`;
  }

  // Find time range from players (use first player with time range, or common overlap)
  let startTime: string | undefined;
  let endTime: string | undefined;

  const playersWithTime = players.filter((p) => p.timeRange);
  if (playersWithTime.length > 0) {
    // Use the latest start time and earliest end time for overlap
    const startTimes = playersWithTime.map((p) => p.timeRange!.start).sort();
    const endTimes = playersWithTime.map((p) => p.timeRange!.end).sort();
    startTime = startTimes[startTimes.length - 1]; // Latest start
    endTime = endTimes[0]; // Earliest end

    // If times don't make sense (end before start), just use first player's times
    if (startTime >= endTime) {
      startTime = playersWithTime[0].timeRange!.start;
      endTime = playersWithTime[0].timeRange!.end;
    }
  }

  return {
    date,
    title,
    description,
    location,
    startTime,
    endTime,
  };
}
