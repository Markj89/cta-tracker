/**
 * UseModal
 * @type {Hook}
 */

import { useState } from 'react';

export default function useModal() {
    const [isVisible, setVisible] = useState(false);

    function toggleModal() {
        setVisible(!isVisible);
    }

    return {
        isVisible,
        toggleModal
    }
}