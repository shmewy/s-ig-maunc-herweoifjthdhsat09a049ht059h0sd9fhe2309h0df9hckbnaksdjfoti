document.getElementById('startBtn').addEventListener('click', async () => {
    const preview = document.getElementById('preview');
    const recording = document.getElementById('recording');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    
    startBtn.disabled = true;
    stopBtn.disabled = false;

    const constraints = {
        video: {
            width: { ideal: 1920 }, // High resolution width
            height: { ideal: 1080 }, // High resolution height
            aspectRatio: 16 / 9, // Ensure 16:9 aspect ratio
            frameRate: { ideal: 90 } // Frame rate
        },
        audio: true
    };

    try {
        const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
        preview.srcObject = stream;

        const options = { mimeType: 'video/webm; codecs=vp9' };
        const mediaRecorder = new MediaRecorder(stream, options);
        
        const chunks = [];
        mediaRecorder.ondataavailable = e => chunks.push(e.data);
        mediaRecorder.onstop = e => {
            const completeBlob = new Blob(chunks, { type: chunks[0].type });
            recording.src = URL.createObjectURL(completeBlob);
            recording.controls = true;
        };

        stopBtn.onclick = () => {
            mediaRecorder.stop();
            startBtn.disabled = false;
            stopBtn.disabled = true;
            stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
    } catch (err) {
        console.error('Error: ' + err);
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
});
