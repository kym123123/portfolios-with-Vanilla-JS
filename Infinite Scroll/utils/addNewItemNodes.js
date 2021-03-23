let flag = 0;

const colors = [
  'linear-gradient(90deg, rgba(40,225,232,1) 47%, rgba(96,233,185,1) 86%)',
  'linear-gradient(90deg, rgba(246, 116, 3, 1) 0%, rgba(238, 60, 1, 1) 32% )',
  'linear-gradient(90deg, rgba(145,40,232,1) 47%, rgba(249,81,235,1) 86%)',
  'linear-gradient(90deg, rgba(40,93,232,1) 47%, rgba(57,142,247,1) 86%)',
  'linear-gradient(90deg, rgba(249,1,196,1) 17%, rgba(232,118,40,1) 70%)',
  'linear-gradient(90deg, rgba(249,1,196,1) 0%, rgba(40,142,232,1) 100%)',
  'linear-gradient(90deg, rgba(1,249,91,1) 0%, rgba(40,232,211,1) 100%)',
  'linear-gradient(90deg, rgba(249,64,1,1) 0%, rgba(232,40,211,1) 100%)',
  'linear-gradient(90deg, rgba(16,249,1,1) 0%, rgba(40,220,232,1) 100%)',
  'linear-gradient(90deg, rgba(249,159,1,1) 0%, rgba(232,225,40,1) 100%)',
  'linear-gradient(90deg, rgba(249,1,200,1) 0%, rgba(232,225,40,1) 100%)',
  'linear-gradient(90deg, rgba(16,249,1,1) 0%, rgba(232,138,40,1) 100%)',
];
const getRandomIndex = () => Math.round(Math.random() * 100) % colors.length;

const createNewItemNode = (item, index) => {
  // 새로운 li의 template 복사
  const newItem = document.getElementById('list-item').content.firstElementChild.cloneNode(true);
  const email = newItem.querySelector('.item-email');
  const content = newItem.querySelector('.item-content');

  newItem.style.background = colors[getRandomIndex()];
  if (flag) newItem.style.animation = `slideIn 0.7s ease-in-out ${index / 10}s`;
  else newItem.style.animation = `fadeIn 0.7s ease-in-out`;
  email.textContent = item.email;
  content.textContent = item.body;

  return newItem;
};

const refreshObserver = (observer, Node) => {
  observer.disconnect(); // 기존의 마지막 Node에서 observer를 제거

  observer.observe(Node.lastElementChild); // 새로운 마지막 노드 observe 시작
};

export default (newItems, observer) => {
  const newFragmentNode = document.createDocumentFragment();

  newItems.map(createNewItemNode).forEach(item => newFragmentNode.appendChild(item));
  refreshObserver(observer, newFragmentNode);
  flag = 1;

  return newFragmentNode;
};
