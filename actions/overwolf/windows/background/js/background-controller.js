import { kWindowNames } from '../../../scripts/constants/window-names.js';
import { RunningGameService } from '../../../scripts/services/running-game-service.js';
import { WindowsService } from '../../scripts/services/windows-service.js';
import { GepService } from '../../../scripts/services/gep-service.js';
import { kGameClassIds, kGamesFeatures } from '../../../scripts/constants/games-features.js';
import { EventBus } from '../../scripts/services/event-bus.js';

export class BackgroundController {
    constructor() {
        this.runningGameService = new RunningGameService();
    }

    async run() {
        // These objects will be available via calling
        // overwolf.windows.getMainWindow() in other windows
        window.owEventBus = this.owEventBus;
        window.owEventsStore = this.owEventsStore;
        window.owInfoUpdatesStore = this.owInfoUpdatesStore;

        this.hasMultipleMonitors = await BackgroundController._hasMultipleMonitors();

        // Register handlers to hotkey events
        this._registerHotkeys();

        await this._restoreLaunchWindow();

        // Switch between desktop/in-game windows when launching/closing game
        this.runningGameService.addGameRunningChangedListener(isRunning => {
            this._onRunningGameChanged(isRunning);
        });

        overwolf.extensions.onAppLaunchTriggered.addListener(e => {
            if (e && e.source !== 'gamelaunchevent') {
                this._restoreAppWindow();
            }
        });

        // Listen to changes in window states
        overwolf.windows.onStateChanged.addListener(() => {
            this._onWindowStateChanged();
        });
    }

    /**
     * App was launched with game launch
     * @private
     */
    static _launchedWithGameEvent() {
        return location.href.includes('source=gamelaunchevent');
    }


    /**
     * Listen to window state changes,
     * and close the app when all UI windows are closed
     * @private
     */
    async _onWindowStateChanged() {
        if (await this._canShutdown()) {
            this._startShutdownTimeout();
        } else {
            this._stopShutdownTimeout();
        }
    }

    /**
     * Check whether we can safely close the app
     * @private
     */
    async _canShutdown() {
        const isGameRunning = await this.runningGameService.isGameRunning();

        // Never shut down the app when a game is running,
        // so we won't miss any events
        if (isGameRunning) {
            return false;
        }

        const states = await WindowsService.getWindowsStates();

        // If all UI (non-background) windows are closed, we can close the app
        return Object.entries(states)
            .filter(([windowName]) => (windowName !== kWindowNames.BACKGROUND))
            .every(([windowName, windowState]) => (windowState === 'closed'));
    }

    /**
     * Start shutdown timeout, and close after 10 if possible
     * @private
     */
    _startShutdownTimeout() {
        this._stopShutdownTimeout();

        this.shutdownTimeout = setTimeout(async() => {
            if (await this._canShutdown()) {
                window.close(); // Close the whole app
            }
        }, 10000);
    }

    /**
     * Stop shutdown timeout
     * @private
     */
    _stopShutdownTimeout() {
        if (this.shutdownTimeout !== null) {
            clearTimeout(this.shutdownTimeout);
            this.shutdownTimeout = null;
        }
    }



    /**
     * Handle toggle hotkey press
     * @private
     */
    async _onHotkeyTogglePressed() {
        const states = await WindowsService.getWindowsStates();

        if (WindowsService.windowStateIsOpen(states[kWindowNames.SECOND])) {
            WindowsService.close(kWindowNames.SECOND);
            return;
        }

        if (WindowsService.windowStateIsOpen(states[kWindowNames.IN_GAME])) {
            WindowsService.close(kWindowNames.IN_GAME);
        } else {
            WindowsService.restore(kWindowNames.IN_GAME);
        }
    }

    /**
     * Handle second screen hotkey press
     * @private
     */
    async _onHotkeySecondScreenPressed() {
        const states = await WindowsService.getWindowsStates();

        if (WindowsService.windowStateIsOpen(states[kWindowNames.SECOND])) {
            WindowsService.close(kWindowNames.SECOND);
            WindowsService.restore(kWindowNames.IN_GAME);
        } else {
            WindowsService.restore(kWindowNames.SECOND);
            WindowsService.close(kWindowNames.IN_GAME);
        }
    }

    /**
     * Pass events to windows that are listening to them
     * @private
     */
    _onGameEvents(data) {
        data.events.forEach(event => {
            this.owEventsStore.push(event);

            this.owEventBus.trigger('event', event);

            if (event.name === 'matchStart') {
                this._restoreGameWindow();
            }
        });
    }

    /**
     * Pass info updates to windows that are listening to them
     * @private
     */
    _onInfoUpdate(infoUpdate) {
        this.owInfoUpdatesStore.push(infoUpdate);

        this.owEventBus.trigger('info', infoUpdate);
    }
}