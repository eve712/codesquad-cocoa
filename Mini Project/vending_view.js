class ViewMachine {
    constructor(reference, walletData) {
        this.wrapArr = [...reference.moneyWrap];
        this.totalEl = reference.walletTotal;
        this.wallet = walletData;
    }
    // this.wallet의 데이터를 사용 → wallet 개수, 합계 출력
    viewWallet() {
        const elArr = this.wrapArr.map(el => el.lastElementChild);
        elArr.forEach((el, i) => el.innerText = this.wallet.moneyNumArr[i]);
        this.totalEl.innerText = this.wallet.total;
    }

    // wallet 클릭 이벤트
    setWalletEvent() {
        const elArr = this.wrapArr.map(el => el.firstElementChild);
        elArr.forEach(el => {
            el.addEventListener('click', this.checkWallet.bind(this));
        });
    }
    checkWallet({target}) {
        const text = target.innerText;
        const amount = text.substring(0, text.length - 1);
        const idx = this.wallet.value.indexOf(amount);
        // 현금 개수가 1보다 작다면
        if(this.wallet.moneyNumArr[idx] < 1) return; 
        else this.fixWallet(idx);
    }
    // this.wallet 값을 변경 (moneyNumArr 현금 개수, total 합계)
    fixWallet(idx) {
        this.wallet.moneyNumArr[idx]--;
        this.wallet.sumAmount(this.wallet);
        this.viewWallet();
    }
}

const viewMachine = new ViewMachine(reference, walletData);
viewMachine.viewWallet();
viewMachine.setWalletEvent();