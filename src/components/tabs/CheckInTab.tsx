import { DateSelector } from '../features/DateSelector';
import { CheckInForm } from '../features/CheckInForm';
import { GamesList } from '../features/GamesList';
import { WeatherWidget } from '../features/WeatherWidget';

export function CheckInTab() {
  return (
    <div>
      <DateSelector />

      <WeatherWidget />

      <CheckInForm />

      <GamesList />
    </div>
  );
}
