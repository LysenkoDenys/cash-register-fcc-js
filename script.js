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
    const arrResult = [];
    statusNode.innerText = '';

    if (price < cash && totalCid < payback) {
      numStatus = 0;
    }
    if (totalCid < payback) {
      numStatus = 0;
      statusNode.innerText = `Status: ${status[numStatus]} ${JSON.stringify(
        cid
      )}`;
      return;
    }

    // the loop:====================================================
    while (payback > 0) {
      const paybackBefore = payback;
      const paybackToNominalToDollar = nominalToDollar.map((el, index) => {
        if (amountOfCid[index] > 0) {
          return Math.floor(payback / el[1]);
        } else {
          return 0;
        }
      });

      console.log('paybackToNominalToDollar:', paybackToNominalToDollar);

      let indexOfNeededAmount = -1;
      for (let i = nominalToDollar.length - 1; i >= 0; i--) {
        if (amountOfCid[i] > 0 && payback >= nominalToDollar[i][1]) {
          indexOfNeededAmount = i;
          break;
        }
      }
      if (indexOfNeededAmount === -1) {
        break;
      }
      if (
        paybackToNominalToDollar[indexOfNeededAmount] >
        amountOfCid[indexOfNeededAmount]
      ) {
        arrResult.push(
          `${cid[indexOfNeededAmount][0]}: $${(
            amountOfCid[indexOfNeededAmount] *
            nominalToDollar[indexOfNeededAmount][1]
          ).toFixed(2)}`
        );
        payback =
          Math.round(
            (payback -
              nominalToDollar[indexOfNeededAmount][1] *
                amountOfCid[indexOfNeededAmount]) *
              100
          ) / 100;
        amountOfCid[indexOfNeededAmount] = 0;
      } else {
        arrResult.push(
          `${cid[indexOfNeededAmount][0]}: $${(
            paybackToNominalToDollar[indexOfNeededAmount] *
            nominalToDollar[indexOfNeededAmount][1]
          ).toFixed(2)}`
        );
        payback =
          Math.round(
            (payback -
              nominalToDollar[indexOfNeededAmount][1] *
                paybackToNominalToDollar[indexOfNeededAmount]) *
              100
          ) / 100;
        amountOfCid[indexOfNeededAmount] -=
          paybackToNominalToDollar[indexOfNeededAmount];
      }
      if (paybackBefore === payback) {
        break;
      }
    }

    if (parseFloat(payback) > 0) {
      numStatus = 0;
      statusNode.innerText = `Status: ${status[numStatus]}`;
      return;
    }
    if (totalCid === Math.round((cash - price) * 100) / 100) {
      numStatus = 1;
      statusNode.innerText = `Status: ${status[numStatus]} ${JSON.stringify(
        arrResult
      )}`;
      return;
    }
    if (numStatus === undefined) {
      numStatus = 2;
    }
    if (cash < price) {
      alert('Customer does not have enough money to purchase the item');
    }
    if (cash === price) {
      statusNode.innerText = 'No change due - customer paid with exact cash';
      return;
    }

    return (statusNode.innerText = `Status: ${status[numStatus]} ${arrResult}`);
  };

  buttonNode.addEventListener('click', () => {
    const cash = parseFloat(inputNode.value);
    checkCashRegister(cash, price, cid);
  });
});
