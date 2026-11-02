# Flunio 2.0 — Phase 7: natural audio for missions & stories

## What this update changes

- Plays recorded MP3 audio before using the existing browser speech-synthesis fallback.
- Uses a course + speaker + exact text manifest so different dialogue characters may have different ElevenLabs voices.
- Adds a **local, opt-in** ElevenLabs batch tool for missions and interactive stories in Slovak, Czech and Polish.
- Leaves the existing word/phrase generator, all lesson logic, progress, themes, XP, Premium, and Prisma unchanged.
- Never sends ElevenLabs requests from site visitors' browsers: the TTS API key stays only in the local `.env.local` used to generate audio.

## Prerequisites

Run these commands from the project root (on the `courses-ui` branch):

```powershell
npm install
npm run tts:learning -- --course=sk
npm run tts:learning -- --course=cs
npm run tts:learning -- --course=pl
```

These are **DRY RUNS**, with no paid API requests. They count lines and pending characters. For the current seed content, expect around 106 distinct lines (36 SK, 35 CS, 35 PL) and about 6,159 characters in total.

## Choose voices in ElevenLabs

Preview different native Slovak, Czech and Polish voices in the ElevenLabs Voice Library first. Choose voices with the right language and accent; multilingual models can read all three languages, but that does not guarantee native pronunciation in every voice.

Add these values to your existing `.env.local` (without sending your key to anyone):

```dotenv
ELEVENLABS_API_KEY=YOUR_PRIVATE_API_KEY
ELEVENLABS_VOICE_ID_Slovak_Female=VOICE_ID_FROM_ELEVENLABS
ELEVENLABS_VOICE_ID_Czech_Male=VOICE_ID_FROM_ELEVENLABS
ELEVENLABS_VOICE_ID_Polish=VOICE_ID_FROM_ELEVENLABS

# Optional: for varied dialogues, native speakers are preferable
ELEVENLABS_VOICE_ID_Slovak_Male=OPTIONAL_NATIVE_MALE_VOICE_ID
ELEVENLABS_VOICE_ID_Czech_Female=OPTIONAL_NATIVE_FEMALE_VOICE_ID
ELEVENLABS_VOICE_ID_Polish_Male=OPTIONAL_NATIVE_MALE_VOICE_ID
ELEVENLABS_VOICE_ID_Polish_Female=OPTIONAL_NATIVE_FEMALE_VOICE_ID
```

If you already use ElevenLabs for words and phrases, the 3 base voice IDs above may already exist in `.env.local`. **Do not overwrite `.env.local` and never commit it to Git.** For any optional voice, omit the entire line if you have not chosen it yet (do **not** paste the `OPTIONAL_...` placeholder).

## Generate a SMALL paid pilot

**These next commands cost ElevenLabs credits**. Execute them only when you have chosen appropriate native voices.

```powershell
npm run tts:learning -- --course=sk --section=stories --generate --limit=4
npm run tts:learning -- --course=cs --section=stories --generate --limit=4
npm run tts:learning -- --course=pl --section=stories --generate --limit=4
```

Listen to the generated MP3s in `public/audio/flunio-voice/sk/`, `cs/`, and `pl/`. Each source recording is linked through `app/learning/audio/voiceManifest.json` on the website. If pronunciation is unnatural, adjust the voice selection and re-generate only the affected lines.

## Approve the full paid batch when you're happy

```powershell
npm run tts:learning -- --generate --all
```

The generator skips already-recorded lines. To re-generate on purpose despite an existing file, add `--force` **(charges again)**. The exact bill depends on your ElevenLabs plan; the character count is an estimate, not a guarantee.

## Run checks

```powershell
npm run test:voice-v2
npm run build
```

## Files deployed to site

Commit and deploy **both** the audio files under `public/audio/flunio-voice/` and the manifest at `app/learning/audio/voiceManifest.json`. Without the audio files, the app falls back to browser speech synthesis. Static files are played repeatedly without additional ElevenLabs credits, though your hosting may have bandwidth/storage charges.

If your host/repository has a file-size limit, use a static asset/CDN strategy before generating a very large audio library. The current new mission/story corpus is small. Review voice licensing/usage conditions for your selected account and voices.

## Scope of this patch

This new generator targets only **missions and stories**. The earlier `npm run tts` generator for vocabulary/grammar still exists; it is not replaced by this patch.
