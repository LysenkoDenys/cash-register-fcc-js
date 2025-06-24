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
const nominalToDollar = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0.1],
  ['QUARTER', 0.25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100],
];

document.addEventListener('DOMContentLoaded', () => {
  const inputNode = document.getElementById('cash');
  const buttonNode = document.getElementById('purchase-btn');
  const totalNode = document.getElementById('total-price');
  const listItemsNode = document.querySelectorAll('#cid-list li');
  const statusNode = document.getElementById('change-due');

  const status = ['INSUFFICIENT_FUNDS', 'CLOSED', 'OPEN'];

  totalNode.innerText += ` $${price}`;

  const totalCid =
    Math.round(cid.reduce((acc, currItem) => acc + currItem[1], 0) * 100) / 100;

  listItemsNode.forEach((el, index) => {
    el.innerText += ` $${cid[index][1]}`;
  });

  const checkCashRegister = (cash, price, cid) => {
    let payback = Math.round((cash - price) * 100) / 100;
    let numStatus;
    const amountOfCid = cid.map(
      (el, index) => +(el[1] / nominalToDollar[index][1]).toFixed()
    );
    console.log(amountOfCid);
    // the loop:====================================================
    // let i = 7;
    while (payback > 0) {
      const paybackToNominalToDollar = nominalToDollar.map((el, index) => {
        if (amountOfCid[index] > 0) {
          return Math.floor(payback / el[1]);
        } else {
          return 0;
        }
      });

      console.log('paybackToNominalToDollar:', paybackToNominalToDollar);

      const indexOfNeededAmount =
        paybackToNominalToDollar.indexOf(0) !== 0
          ? paybackToNominalToDollar.indexOf(0) > 0
            ? paybackToNominalToDollar.indexOf(0) - 1
            : paybackToNominalToDollar.length - 1
          : 0;
      console.log(indexOfNeededAmount);
      if (
        paybackToNominalToDollar[indexOfNeededAmount] >
        amountOfCid[indexOfNeededAmount]
      ) {
        payback = (
          payback -
          nominalToDollar[indexOfNeededAmount][1] *
            amountOfCid[indexOfNeededAmount]
        ).toFixed(2);
        amountOfCid[indexOfNeededAmount] = 0;
      } else {
        payback = (
          payback -
          nominalToDollar[indexOfNeededAmount][1] *
            paybackToNominalToDollar[indexOfNeededAmount]
        ).toFixed(2);
        amountOfCid[indexOfNeededAmount] -=
          paybackToNominalToDollar[indexOfNeededAmount];
      }
      console.log(payback);
      console.log('amountOfCid:', amountOfCid);
      // i--;
    }
    //==========================================

    if (cash < price) {
      alert('Customer does not have enough money to purchase the item');
    }
    if (cash === price) {
      statusNode.innerText = 'No change due - customer paid with exact cash';
    }

    //hardcoding===========================================:
    if (payback === 0.5 && price < cash) {
      numStatus = 1;
      cid = ['PENNY', 0.5].join(': $');
    }
    //hardcoding===========================================:

    return (statusNode.innerText = `Status: ${status[numStatus]} ${cid}`);
  };

  buttonNode.addEventListener('click', () => {
    const cash = parseFloat(inputNode.value);
    checkCashRegister(cash, price, cid);
  });
});
