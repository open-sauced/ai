// This function is used to insert text at the cursor position in the text area
export const insertAtCursorFromStream = async (textArea: HTMLTextAreaElement, stream: ReadableStream<Uint8Array>) => {
  const reader = stream.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
 break;
} else {
      const chunk = decoder.decode(value);
      const [start, end] = [textArea.selectionStart, textArea.selectionEnd];

      textArea.setRangeText(chunk, start, end, "end");
    }
  }
};
