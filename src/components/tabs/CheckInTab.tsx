import { currentCheckins } from '../App';
import { DateSelector } from '../features/DateSelector';
import { CheckInForm } from '../features/CheckInForm';
import { CheckinList } from '../features/CheckinList';
import { MatchList } from '../features/MatchList';
import { WeatherWidget } from '../features/WeatherWidget';
import { checkinListExpanded } from '../pages/MainApp';

export function CheckInTab() {
  return (
    <div>
      <DateSelector />

      <WeatherWidget />

      <CheckInForm />

      <MatchList />

      <div class="checkins" style="margin-top: 24px; padding-top: 24px; border-top: 2px solid #f0f0f0;">
        <h2
          onClick={() => { checkinListExpanded.value = !checkinListExpanded.value; }}
          style="cursor: pointer; display: flex; align-items: center; gap: 8px;"
        >
          <span>{checkinListExpanded.value ? '▼' : '▶'}</span>
          <span>Check-ins (<span>{currentCheckins.value.length}</span>)</span>
        </h2>
        {checkinListExpanded.value && <CheckinList />}
      </div>
    </div>
  );
}
