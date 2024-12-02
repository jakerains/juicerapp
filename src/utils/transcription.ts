import { runLocalTranscription } from './localModel';
import { useModelStore } from '../store/modelStore';
const HUGGING_FACE_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY;

export async function transcribeAudio(file: File): Promise<{ text: string; timestamps: Array<{ time: number; text: string }> }> {
  const { modelType, selectedModel } = useModelStore.getState();

  if (modelType === 'local') {
    return runLocalTranscription(file, selectedModel);
  }

  return transcribeWithAPI(file, selectedModel);

async function transcribeWithAPI(
  file: File,
  modelId: string
): Promise<{ text: string; timestamps: Array<{ time: number; text: string }> }> {
  const apiUrl = `https://api-inference.huggingface.co/models/${modelId}`;
  
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`
    },
    body: formData
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to transcribe audio');
  }
  
  const result = await response.json();
  
  // Process the result into timestamps (simplified example)
  const timestamps = result.text.split('. ').map((sentence: string, index: number) => ({
    time: index * 5, // Simplified timestamp generation
    text: sentence.trim()
  }));
  
  return {
    text: result.text,
    timestamps
  };
}
}