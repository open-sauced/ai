import { describe, it, expect, beforeEach, vi } from 'vitest';
import { checkAuthentication } from '../../src/utils/checkAuthentication';


const hasOptedLogOut =  vi.fn().mockResolvedValue(false);
const getCookie = vi.fn();
const checkTokenValidity = vi.fn().mockResolvedValue(true);
const setAccessTokenInChromeStorage = vi.fn();
const removeAuthTokenFromStorage = vi.fn();
const logError = vi.fn();

describe('checkAuthentication', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should remove auth token from storage if user has opted out', async () => {
        hasOptedLogOut.mockResolvedValue(true);
        await checkAuthentication(
            hasOptedLogOut,
            getCookie,
            checkTokenValidity,
            setAccessTokenInChromeStorage,
            removeAuthTokenFromStorage,
            logError,
        );
        expect(removeAuthTokenFromStorage).toHaveBeenCalled();
    });

    it('should remove auth token from storage if cookie is not found', async () => {
        getCookie.mockImplementation((details, callback) => callback(null));
        await checkAuthentication(
            hasOptedLogOut,
            getCookie,
            checkTokenValidity,
            setAccessTokenInChromeStorage,
            removeAuthTokenFromStorage,
            logError,
        );
        expect(removeAuthTokenFromStorage).toHaveBeenCalled();
    });
})
    