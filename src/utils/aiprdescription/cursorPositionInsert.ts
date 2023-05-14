//This function is used to insert text at the cursor position in the text area
export const insertAtCursor = (textArea: HTMLTextAreaElement, text: string) => {
  if (textArea.selectionStart) {
    var startPos = textArea.selectionStart;
    var endPos = textArea.selectionEnd;
    textArea.value =
      textArea.value.substring(0, startPos) +
      text +
      textArea.value.substring(endPos, textArea.value.length);
  } else {
    textArea.value += text;
  }
};
