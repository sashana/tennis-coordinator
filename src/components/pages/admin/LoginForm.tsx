/**
 * LoginForm - Site admin authentication form
 */
import { sport } from '../../../config/sport';
import { loginError } from './adminState';
import { handleLogin, goToLanding } from './adminActions';

export function LoginForm() {
  return (
    <div class="site-admin-page">
      <div class="site-admin-container">
        <div class="site-admin-login-card">
          <div class="site-admin-header">
            <span class="site-admin-icon">🔐</span>
            <h1>Site Administration</h1>
            <p class="site-admin-subtitle">{sport.appName} Platform</p>
          </div>

          <form onSubmit={handleLogin} class="site-admin-form">
            <div class="form-group">
              <label for="admin-pin">Administrator PIN</label>
              <input
                id="admin-pin"
                type="password"
                placeholder="Enter your PIN"
                class="site-admin-input"
                autoFocus
              />
            </div>

            {loginError.value && (
              <div class="site-admin-error">
                <span class="error-icon">⚠️</span>
                {loginError.value}
              </div>
            )}

            <button type="submit" class="site-admin-submit">
              Sign In
            </button>
          </form>

          <div class="site-admin-footer">
            <button onClick={goToLanding} class="back-to-home">
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
