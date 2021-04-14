const $displayAdded = document.getElementById('display-added').content.firstElementChild;

export default targetAddBtn => {
  const $newDisplayAdded = $displayAdded.cloneNode(true);

  targetAddBtn.appendChild($newDisplayAdded);
  setTimeout(() => {
    targetAddBtn.removeChild($newDisplayAdded);
  }, 2000);
};
