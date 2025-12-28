/**
 * MemberPicker - Admin dropdown to view another member's games
 */
import { sessionUser, coreMembers } from '../../App';
import { viewingUser, showMemberPicker } from './myMatchesState';

export function MemberPicker() {
  return (
    <div
      style={{
        background: 'var(--color-gray-lightest, #f5f5f5)',
        borderRadius: 'var(--radius-lg, 8px)',
        padding: 'var(--spacing-xl, 12px)',
        marginBottom: 'var(--spacing-2xl, 16px)',
        position: 'relative',
      }}
    >
      <label
        style={{
          display: 'block',
          fontSize: 'var(--font-size-sm, 13px)',
          color: 'var(--color-gray-base, #666)',
          marginBottom: 'var(--spacing-sm, 6px)',
          fontWeight: '500',
        }}
      >
        View another member's games
      </label>
      <button
        data-member-picker-button
        onClick={(e) => {
          e.stopPropagation();
          showMemberPicker.value = !showMemberPicker.value;
        }}
        style={{
          width: '100%',
          padding: '10px 12px',
          background: 'white',
          border: '1px solid var(--color-border, #e0e0e0)',
          borderRadius: 'var(--radius-md, 6px)',
          fontSize: 'var(--font-size-base, 14px)',
          color: 'var(--color-text-secondary, #666)',
          cursor: 'pointer',
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>Select a member...</span>
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="currentColor"
          style={{
            transform: showMemberPicker.value ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
          }}
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      {showMemberPicker.value && (
        <div
          class="member-picker-dropdown"
          style={{
            position: 'absolute',
            top: '100%',
            left: 'var(--spacing-xl, 12px)',
            right: 'var(--spacing-xl, 12px)',
            marginTop: 'var(--spacing-xs, 4px)',
            background: 'white',
            border: '1px solid var(--color-border, #e0e0e0)',
            borderRadius: 'var(--radius-lg, 8px)',
            boxShadow: 'var(--shadow-xl, 0 4px 12px rgba(0,0,0,0.15))',
            zIndex: 100,
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          {coreMembers.value
            .filter((m) => m !== sessionUser.value)
            .sort((a, b) => a.localeCompare(b))
            .map((member) => (
              <button
                key={member}
                onClick={() => {
                  viewingUser.value = member;
                  showMemberPicker.value = false;
                }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'white',
                  border: 'none',
                  borderBottom: '1px solid var(--color-border, #e0e0e0)',
                  textAlign: 'left',
                  fontSize: 'var(--font-size-base, 14px)',
                  color: 'var(--color-text-primary, #333)',
                  cursor: 'pointer',
                }}
                className="hover-bg-subtle"
              >
                {member}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
