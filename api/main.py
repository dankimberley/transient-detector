import librosa
import numpy as np
import files

AUDIO_PATH = "api/inputs/120drums.mp3"

# convert a given amplitude to decibels
def amplitude_to_db(amplitude):
    epsilon = 1e-10
    return round(20 * np.log10(np.maximum(amplitude, epsilon)), 1)

# convert an audio file into an array of time objects, x: time (ms), y: amplitude (db)
def audio_to_millisecond_amplitude(audio_path):
    
    y, sr = librosa.load(audio_path, sr=None)
    samples_per_ms = sr // 1000
    amplitudes = []
    
    # Calculate amplitude for each millisecond
    for ms in range(0, len(y) // samples_per_ms):
        start = ms * samples_per_ms
        end = start + samples_per_ms
        amplitude = np.abs(y[start:end]).max()
        if (amplitude > 0):
            amplitudes.append({"time": ms, "amplitude": amplitude_to_db(amplitude)})

    return amplitudes

def detect_transients(data):
    transients = []
    i = 1
    while i < len(data):
        if data[i]['amplitude'] > -200:
            transients.append({'time': data[i]['time'], 'amplitude': data[i]['amplitude']})
        i += 1
    
    return transients

amplitudes = audio_to_millisecond_amplitude(AUDIO_PATH)
transients = detect_transients(amplitudes)
files.write(transients)
print(transients)