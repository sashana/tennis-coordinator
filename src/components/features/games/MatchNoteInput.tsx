/**
 * MatchNoteInput - Booking details input for matches
 */
import { useState, useEffect } from 'preact/hooks';
import { matchNotes, saveMatchNote } from '../../../hooks/useFirebase';

interface MatchNoteInputProps {
  matchKey: string;
}

export function MatchNoteInput({ matchKey }: MatchNoteInputProps) {
  const existingNote = matchNotes.value[matchKey] || '';
  const [localValue, setLocalValue] = useState(existingNote);

  // Sync local value when external note changes
  useEffect(() => {
    setLocalValue(matchNotes.value[matchKey] || '');
  }, [matchNotes.value[matchKey]]);

  const handleBlur = () => {
    const trimmedValue = localValue.trim();
    const currentNote = matchNotes.value[matchKey] || '';
    // Only save if value actually changed
    if (trimmedValue !== currentNote) {
      saveMatchNote(matchKey, trimmedValue);
    }
  };

  return (
    <div style="padding: 8px 12px; background: var(--color-bg-muted, #f9f9f9); border-radius: var(--radius-lg, 8px); margin-top: 8px;">
      <div style="font-size: 11px; color: var(--color-gray-base, #666); margin-bottom: 4px; font-weight: 500;">
        Booking Details
      </div>
      <input
        type="text"
        placeholder="e.g. Courtside Court 1, 12PM"
        value={localValue}
        onInput={(e) => {
          setLocalValue((e.target as HTMLInputElement).value);
        }}
        onBlur={handleBlur}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid var(--color-border, #e0e0e0)',
          borderRadius: '6px',
          fontSize: '14px',
          background: 'white',
        }}
      />
    </div>
  );
}
