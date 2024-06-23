document.addEventListener('dblclick', (event) => {
    const videoPlayer = document.querySelector('video');
    if (!videoPlayer) {
        return;
    }

    const videoRect = videoPlayer.getBoundingClientRect();
    const clickX = event.clientX - videoRect.left;
    const clickY = event.clientY - videoRect.top;
    if (clickX < 0 || clickX > videoRect.width || clickY < 0 || clickY > videoRect.height) {
        return;
    }

    const tapAreaPercentage = 0.2; // 20% area on each side of the video
    const tapAreaWidth = videoRect.width * tapAreaPercentage;
    if (clickX <= tapAreaWidth) {
        // rewind if tap is in the left area
        replaceEvent(event, new KeyboardEvent('keydown', { keyCode: 74,  code: 'KeyJ' }))
        return;
    }

    if (clickX >= videoRect.width - tapAreaWidth) {
        // fast-forward if tap is in the right area
        replaceEvent(event, new KeyboardEvent('keydown', { keyCode: 76,  code: 'KeyL' }))
    }
}, true); // Use capture phase to ensure we intercept the double-click early

function replaceEvent(originalEvent, newEvent) {
    // Prevent fullscreen toggle on double-tap
    originalEvent.stopImmediatePropagation();
    originalEvent.preventDefault();

    document.dispatchEvent(newEvent);
}