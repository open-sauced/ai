// This function is used to insert text at the cursor position in the text area
export const insertTextAtCursor = (textArea: HTMLTextAreaElement, text: string) => {
    let length = 0;
    const typewriter = setInterval(() => {
        textArea.setRangeText(text[length++], textArea.selectionStart, textArea.selectionEnd, "end");
        if (length >= text.length) {
            clearInterval(typewriter);
            textArea.setRangeText("\n\n_Generated using [OpenSauced](https://opensauced.ai/)._", textArea.selectionStart, textArea.selectionEnd, "end");
        }
    }, 10);
};
