document.addEventListener('dblclick', (event) => {
    const videoPlayer = document.querySelector('video');
    if (!videoPlayer) {
        return;
    }

    const videoRect = videoPlayer.getBoundingClientRect();
    const clickX = event.clientX - videoRect.left;
    if (clickX < 0 || clickX > videoRect.width) {
        return;
    }

    const clickY = event.clientY - videoRect.top;
    if (clickY < 0 || clickY > videoRect.height) {
        return;
    }

    const tapAreaWidth = videoRect.width * 0.2; // 20% area on each side of the video
    if (clickX <= tapAreaWidth) {
        event.stopImmediatePropagation();
        event.preventDefault();
        document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 74,  code: 'KeyJ' }));
        return;
    }

    if (clickX >= videoRect.width - tapAreaWidth) {
        event.stopImmediatePropagation();
        event.preventDefault();
        document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 76,  code: 'KeyL' }));
    }
}, true); // Use capture phase to ensure we intercept the double-click early