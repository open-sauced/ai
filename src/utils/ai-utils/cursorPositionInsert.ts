// This function is used to insert text at the cursor position in the text area
export const insertTextAtCursor = (textArea: HTMLTextAreaElement, text: string) => {
    let length = 0;
    textArea.focus();
    const typewriter = setInterval(() => {
        textArea.setRangeText(text[length++], textArea.selectionStart, textArea.selectionEnd, "end");
        if (length >= text.length) {
            clearInterval(typewriter);
            textArea.ownerDocument.execCommand('insertText', false, "\n\n_Generated using [OpenSauced](https://opensauced.ai/)_");
            textArea.blur();
        }
    }, 10);
};
