import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { jsPDF } from 'jspdf';

interface Timestamp {
  time: number;
  text: string;
}

// Format timestamp for SRT format
const formatSRTTime = (seconds: number): string => {
  const pad = (num: number): string => num.toString().padStart(2, '0');
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)},${ms.toString().padStart(3, '0')}`;
};

// Export as TXT
export const exportTXT = (transcription: string, timestamps: Timestamp[]): void => {
  const content = timestamps
    .map(({ time, text }) => `[${new Date(time * 1000).toISOString().substr(11, 8)}] ${text}`)
    .join('\n\n');
  
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, 'transcription.txt');
};

// Export as SRT
export const exportSRT = (timestamps: Timestamp[]): void => {
  const content = timestamps
    .map((item, index) => {
      const startTime = formatSRTTime(item.time);
      const endTime = formatSRTTime(item.time + 2); // Assuming 2-second duration per segment
      return `${index + 1}\n${startTime} --> ${endTime}\n${item.text}\n`;
    })
    .join('\n');
  
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, 'transcription.srt');
};

// Export as DOCX
export const exportDOCX = async (transcription: string, timestamps: Timestamp[]): Promise<void> => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: 'Audio Transcription',
              bold: true,
              size: 32,
            }),
          ],
        }),
        new Paragraph({
          children: [new TextRun('')],
        }),
        ...timestamps.map(
          ({ time, text }) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `[${new Date(time * 1000).toISOString().substr(11, 8)}] `,
                  bold: true,
                  size: 24,
                }),
                new TextRun({
                  text: text,
                  size: 24,
                }),
              ],
            })
        ),
      ],
    }],
  });

  const buffer = await Packer.toBlob(doc);
  saveAs(buffer, 'transcription.docx');
};

// Export as PDF
export const exportPDF = (transcription: string, timestamps: Timestamp[]): void => {
  const pdf = new jsPDF();
  const lineHeight = 10;
  let yPosition = 20;

  // Add title
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Audio Transcription', 20, yPosition);
  yPosition += lineHeight * 2;

  // Add content
  pdf.setFontSize(12);
  timestamps.forEach(({ time, text }) => {
    // Add timestamp
    pdf.setFont('helvetica', 'bold');
    const timestamp = `[${new Date(time * 1000).toISOString().substr(11, 8)}]`;
    pdf.text(timestamp, 20, yPosition);

    // Add text
    pdf.setFont('helvetica', 'normal');
    const textLines = pdf.splitTextToSize(text, 170);
    pdf.text(textLines, 20, yPosition + lineHeight);

    yPosition += (textLines.length + 2) * lineHeight;

    // Add new page if needed
    if (yPosition > 270) {
      pdf.addPage();
      yPosition = 20;
    }
  });

  pdf.save('transcription.pdf');
};