import * as pdfjsLib from 'pdfjs-dist/webpack.mjs';

// Function to extract text from a PDF Blob
export async function extractText(pdfBlob) {
  // Convert the Blob to an ArrayBuffer
  const arrayBuffer = await pdfBlob.arrayBuffer();

  // Load the PDF document using the ArrayBuffer
  const pdfDocument = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = '';

  // Loop through all the pages
  for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
    const page = await pdfDocument.getPage(pageNumber);

    // Extract text content
    const textContent = await page.getTextContent();

    // Combine text items into a single string
    const pageText = textContent.items.map((item) => item.str).join(' ');

    fullText += pageText + '\n';
  }
  console.log(fullText);

  return fullText;
}

export function splitTextIntoChunks(text, chunkSize = 500) {
  const words = text.split(/\s+/); // Split by whitespace
  const chunks = [];

  for (let i = 0; i < words.length; i += chunkSize) {
    const chunk = words.slice(i, i + chunkSize).join(' '); // Create a chunk of specified size
    chunks.push(chunk); // Add the chunk to the chunks array
  }

  return chunks; // Return the array of chunks
}
