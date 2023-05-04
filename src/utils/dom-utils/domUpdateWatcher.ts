const domUpdateWatch = (callback: () => void) => {
  const oldLocation = document.location.href;
  const observer = new MutationObserver(
    (_: unknown, observer: MutationObserver) => {
      const newLocation = document.location.href;

      if (oldLocation === newLocation || document.readyState !== "complete") {
        return;
      }
      observer.disconnect();
      setTimeout(callback, 20);
    },
  );

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

export default domUpdateWatch;
