document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const preview = document.getElementById('preview');
    const recording = document.getElementById('recording');
    let mediaRecorder;
    let recordedChunks = [];

    startBtn.addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { cursor: "motion" },
                audio: false
            });
            preview.srcObject = stream;
            mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp8' });
            
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                recording.src = url;
                recordedChunks = [];
            };

            mediaRecorder.start();
            startBtn.disabled = true;
            stopBtn.disabled = false;
        } catch (err) {
            console.error("Error: " + err);
        }
    });

    stopBtn.addEventListener('click', () => {
        mediaRecorder.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
        preview.srcObject.getTracks().forEach(track => track.stop());
    });
});
