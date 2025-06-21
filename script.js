let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
];

document.addEventListener('DOMContentLoaded', () => {
  const inputNode = document.getElementById('cash');
  const buttonNode = document.getElementById('purchase-btn');
  const totalNode = document.getElementById('total-price');
  const listNode = document.getElementById('cid-list');
  const statusNode = document.getElementById('change-due');

  totalNode.innerText += ` $${price}`;

  const totalCid =
    Math.round(cid.reduce((acc, currItem) => acc + currItem[1], 0) * 100) / 100;
  console.log(totalCid);

  const megaCid = (event) => {
    const cash = parseFloat(inputNode.value);
    if (cash < price) {
      alert('Customer does not have enough money to purchase the item');
    }
    if (cash === price) {
      statusNode.innerText = 'No change due - customer paid with exact cash';
    }
  };

  buttonNode.addEventListener('click', megaCid);
});
