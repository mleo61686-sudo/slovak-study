import fs from "node:fs";

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID;
const VOICE_ID_2 = process.env.ELEVENLABS_VOICE_ID_2;

if (!API_KEY) throw new Error("Missing ELEVENLABS_API_KEY in .env.local");
if (!VOICE_ID) throw new Error("Missing ELEVENLABS_VOICE_ID in .env.local");

export const XI_KEY: string = API_KEY;
export const VOICE1: string = VOICE_ID;
export const VOICE2: string =
    VOICE_ID_2 && VOICE_ID_2.trim() ? VOICE_ID_2 : VOICE_ID;

export const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export async function ttsToFile(
    kind: "word" | "phrase",
    text: string,
    file: string,
    voiceId: string,
    sentText: string
) {
    console.log(`[TTS] kind=${kind} text="${text}" voice=${voiceId}`);

    if (sentText !== text) {
        console.log(`[TTS-TEXT] override: "${text}" -> "${sentText}"`);
    }

    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    for (let attempt = 1; attempt <= 6; attempt++) {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "xi-api-key": XI_KEY,
                "Content-Type": "application/json",
                Accept: "audio/mpeg",
            },
            body: JSON.stringify({
                text: sentText,
                model_id: "eleven_multilingual_v2",
                voice_settings: {
                    stability: 0.65,
                    similarity_boost: 0.8,
                    style: 0,
                    use_speaker_boost: true,
                }
            }),
        });

        if (res.ok) {
            const buffer = new Uint8Array(await res.arrayBuffer());
            fs.writeFileSync(file, buffer);
            return;
        }

        const status = res.status;
        const msg = await res.text().catch(() => "");
        const retryable = status === 429 || status >= 500;

        if (!retryable || attempt === 6) {
            throw new Error(`ElevenLabs error ${status}: ${msg}`);
        }

        await sleep(400 * attempt * attempt);
    }
}