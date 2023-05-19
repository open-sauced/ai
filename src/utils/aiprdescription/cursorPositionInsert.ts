// This function is used to insert text at the cursor position in the text area
export const insertTextAtCursor = async (textArea: HTMLTextAreaElement, text: string) => {
  let length = 0;
  const typewriter = setInterval(() => {
    textArea.setRangeText(text[length++], textArea.selectionStart, textArea.selectionEnd, "end");
    if (length >= text.length) {
      clearInterval(typewriter);
      textArea.setRangeText("\n\n_Content generated using [OpenSauced](https://opensauced.ai/)._", textArea.selectionStart, textArea.selectionEnd, "end");
    }
  }, 10);
  
};

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
  textArea.setRangeText("\n\n_Generated using [OpenSauced](https://opensauced.ai/)._", textArea.selectionStart, textArea.selectionEnd, "end");
};
