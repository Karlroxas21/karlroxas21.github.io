import { useState } from 'react';

import { detectOS, type OSFamily } from '../utils/detect-os';

/**
 * The visitor's OS family, read once on mount. The site is a client-only SPA, so there is no
 * server render to mismatch — a lazy initializer is enough and avoids a second paint.
 */
export function useOS(): OSFamily {
    const [os] = useState<OSFamily>(detectOS);
    return os;
}
