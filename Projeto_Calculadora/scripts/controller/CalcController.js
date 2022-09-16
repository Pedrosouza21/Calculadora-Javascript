class CalcController {

    /* se tiver "_" é porque ele é privado */
    /*aprendendo constructor*/

    constructor() {
        this._operation = [];
        this.locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {
        this.setDisplayDateTime();


        setInterval(() => {

            this.displayDate = this.currentDate.toLocaleDateString(this._locale);
            this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
        }, 1000);

    }


    clearAll() {
        this._operation = [];

    }

    clearEntry() {
        this._operation.pop();

    }

    getLastOperation() {
        return this._operation[this._operation.length-1];


    }

    setLastOperation(value) {
        this._operation[this._operation.length-1] = value;
    }

    isOperator(value) {
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
    }


    addOperation(value) {
        console.log('A', this.getLastOperation());

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {
                this._setLastOperation(value);
                //trocar Operador

            } else if (isNaN(value)) {
                console.log(value);

            } else {
                this._operation.push(value);

                console.log(value);
            }
        } else {
        let newValue = this.setLastOperation().toString() + value.toString();
        //Number 
        this.setLastOperation(parseInt(nemValue));
        }
        console.log(this.operation)
    
  
}


setError() {
    this.displayCalc = "Error";

}

/* addEventListener recebe 2 parametros(cliques) */
/* switch = se for feito x, faça y e pare
break = pare
Se clicar em ac, irá apagar tudo */

execBtn(value) {
    switch (value) {
        case 'ac':
            this.clearAll();
            break;

        case 'ce':
            this.clearEntry();
            break;

        case 'soma':
            this.addOperation(parseInt('+'));
            break;

        case 'subtracao':
            this.addOperation(parseInt('-'));
            break;

        case 'divisao':
            this.addOperation(parseInt('/'));
            break;

        case 'multiplicacao':
            this.addOperation(parseInt('*'));
            break;

        case 'porcento':
            this.addOperation(parseInt('%'));
            break;

        case 'igual':

            break;

        case 'ponto':
            this.addOperation(parseInt('.'));

            break;

        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            this.addOperation(parseInt(value));
            break;

        default:
            this.setError();
            break;

    }

}

addEventListenerAll(element, events, fn) {
    events.split(' ').forEach(event => {
        element.addEventListener(event, fn, false);
    });


}


initButtonsEvents() {
    let buttons = document.querySelectorAll("#buttons > g, #parts > g");

    buttons.forEach((btn, index) => {

        this.addEventListenerAll(btn, "click drag mouseover", e => {
            let textBtn = btn.className.baseVal.replace("btn-", "");

            this.execBtn();
        });

    });

    this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
        btn, style.cursor = "pointer";
    });

}


/*método Set criado */
setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
    this.displayTime = this.currentDate.toLocaleDateString(this._locale);

}
    get displayTime() {
    return this._timeEl.innerHTML;
}
    set displayTime(value) {
    return this._timeEl.innerHTML = value;
}

    get displayDate() {
    return this._dateEl.innerHTML
}

    set displayDate(value) {
    return this._dateEl.innerHTML = value;
}

    get displayCalc() {
    return this._displayCalcEl.innerHTML;
}
    set displayCalc(value) {
    return this._displayCalcEl.innerHTML = value;

}
    get currentDate() {
    return new Date();
}
    set currentDate(value) {
    return this._currentDate = value;
}

}
