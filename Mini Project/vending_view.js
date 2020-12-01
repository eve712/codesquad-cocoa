class ViewMachine {
    constructor(reference, walletData) {
        this.moneyWrap = reference.moneyWrap; //HTMLCollection
        this.totalEl = reference.walletTotal;
        this.wallet = walletData;
    }
    viewWallet() {
        const wrapArr = [...this.moneyWrap];
        const elArr = wrapArr.map(el => el.lastElementChild);
        elArr.forEach((el, i) => el.innerText = walletData.moneyNumArr[i]);
        this.totalEl.innerText = this.wallet.total;
    }
}

const viewMachine = new ViewMachine(reference, walletData);
viewMachine.viewWallet();