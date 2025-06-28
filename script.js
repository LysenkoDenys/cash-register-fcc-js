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

  listItemsNode.forEach((el, index) => {
    el.innerText += ` $${cid[index][1]}`;
  });

  const roundToCents = (num) => Math.round(num * 100) / 100;

  const checkCashRegister = (cash, price, cid) => {
    let payback = roundToCents(cash - price);
    const totalCid = roundToCents(
      cid.reduce((acc, currItem) => acc + currItem[1], 0)
    );
    const unitsInDrawer = cid.map(
      (el, index) => +(el[1] / nominalToDollar[index][1]).toFixed()
    );
    const arrResult = [];
    statusNode.innerText = '';

    if (cash < price) {
      alert('Customer does not have enough money to purchase the item');
      return;
    }
    if (cash === price) {
      statusNode.innerText = 'No change due - customer paid with exact cash';
      return;
    }

    if (totalCid < payback) {
      statusNode.innerText = `Status: ${status[0]}`;
      return;
    }

    // the loop:
    while (payback > 0) {
      const paybackBefore = payback;
      const paybackToNominalToDollar = nominalToDollar.map((el, index) => {
        if (unitsInDrawer[index] > 0) {
          return Math.floor(payback / el[1]);
        } else {
          return 0;
        }
      });

      let indexOfNeededAmount = -1;
      for (let i = nominalToDollar.length - 1; i >= 0; i--) {
        if (unitsInDrawer[i] > 0 && payback >= nominalToDollar[i][1]) {
          indexOfNeededAmount = i;
          break;
        }
      }
      if (indexOfNeededAmount === -1) {
        break;
      }
      if (
        paybackToNominalToDollar[indexOfNeededAmount] >
        unitsInDrawer[indexOfNeededAmount]
      ) {
        arrResult.push([
          cid[indexOfNeededAmount][0],
          roundToCents(
            unitsInDrawer[indexOfNeededAmount] *
              nominalToDollar[indexOfNeededAmount][1]
          ),
        ]);
        payback = roundToCents(
          payback -
            nominalToDollar[indexOfNeededAmount][1] *
              unitsInDrawer[indexOfNeededAmount]
        );
        unitsInDrawer[indexOfNeededAmount] = 0;
      } else {
        arrResult.push([
          cid[indexOfNeededAmount][0],
          roundToCents(
            paybackToNominalToDollar[indexOfNeededAmount] *
              nominalToDollar[indexOfNeededAmount][1]
          ),
        ]);
        payback = roundToCents(
          payback -
            nominalToDollar[indexOfNeededAmount][1] *
              paybackToNominalToDollar[indexOfNeededAmount]
        );
        unitsInDrawer[indexOfNeededAmount] -=
          paybackToNominalToDollar[indexOfNeededAmount];
      }
      if (paybackBefore === payback) {
        break;
      }
    }
    const formatChange = (arr) =>
      arr.map(([name, val]) => `${name}: $${val}`).join(' ');

    if (payback > 0) {
      statusNode.innerText = `Status: ${status[0]}`;
      return;
    }

    // =====================================
    cid = cid.map((item, index) => {
      const [name] = item;
      const newAmount = roundToCents(
        unitsInDrawer[index] * nominalToDollar[index][1]
      );
      return [name, newAmount];
    });
    // =====================================
    console.log(cid);

    if (totalCid === roundToCents(cash - price)) {
      const resultStr = arrResult
        .map(([name, value]) => `${name}: $${value}`)
        .join(' ');
      statusNode.innerText = `Status: ${status[1]} ${resultStr}`;
      return;
    }
    const resultStr = formatChange(arrResult);

    return (statusNode.innerText = `Status: ${status[2]} ${resultStr}`);
  };

  buttonNode.addEventListener('click', () => {
    const cash = parseFloat(inputNode.value);
    checkCashRegister(cash, price, cid);
  });
});
