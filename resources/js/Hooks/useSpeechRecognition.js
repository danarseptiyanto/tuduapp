import { useState, useEffect, useRef, useCallback } from "react";

export default function useSpeechRecognition({ onResult }) {
	const [isListening, setIsListening] = useState(false);
	const [isSupported, setIsSupported] = useState(false);
	const recognitionRef = useRef(null);

	useEffect(() => {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		setIsSupported(!!SpeechRecognition);
	}, []);

	const start = useCallback(() => {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognition) return;

		if (recognitionRef.current) {
			recognitionRef.current.abort();
		}

		const recognition = new SpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;
		recognition.lang = "en-US";

		recognition.onresult = (event) => {
			let finalTranscript = "";
			for (let i = event.resultIndex; i < event.results.length; i++) {
				if (event.results[i].isFinal) {
					finalTranscript += event.results[i][0].transcript;
				}
			}
			if (finalTranscript && onResult) {
				onResult(finalTranscript);
			}
		};

		recognition.onerror = () => {
			setIsListening(false);
		};

		recognition.onend = () => {
			setIsListening(false);
		};

		recognitionRef.current = recognition;
		recognition.start();
		setIsListening(true);
	}, [onResult]);

	const stop = useCallback(() => {
		if (recognitionRef.current) {
			recognitionRef.current.stop();
			recognitionRef.current = null;
		}
		setIsListening(false);
	}, []);

	useEffect(() => {
		return () => {
			if (recognitionRef.current) {
				recognitionRef.current.abort();
				recognitionRef.current = null;
			}
		};
	}, []);

	return { isListening, start, stop, isSupported };
}
