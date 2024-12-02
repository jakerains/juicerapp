import { pipeline } from '@xenova/transformers';

interface WhisperPipeline {
  transcribe: (audio: File) => Promise<{
    text: string;
    chunks: Array<{ timestamp: [number, number]; text: string }>;
  }>;
}

let whisperPipeline: WhisperPipeline | null = null;

export async function initializeLocalModel(modelId: string): Promise<void> {
  try {
    whisperPipeline = await pipeline('automatic-speech-recognition', modelId);
  } catch (error) {
    console.error('Failed to initialize model:', error);
    throw new Error('Failed to initialize local model');
  }
}

export async function runLocalTranscription(
  audioFile: File, 
  modelId: string
): Promise<{ text: string; timestamps: Array<{ time: number; text: string }> }> {
  if (!whisperPipeline) {
    await initializeLocalModel(modelId);
  }

  try {
    const result = await whisperPipeline(audioFile, {
      chunk_length_s: 30,
      stride_length_s: 5,
      return_timestamps: true
    });

    return {
      text: result.text,
      timestamps: result.chunks.map((chunk: any) => ({
        time: chunk.timestamp[0],
        text: chunk.text
      }))
    };
  } catch (error) {
    console.error('Transcription failed:', error);
    throw new Error('Failed to transcribe audio using local model');
  }
}