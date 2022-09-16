class CalcController {

    /* se tiver "_" é porque ele é privado */
    /*aprendendo constructorr*/

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

        this.setLastNumberToDisplay();

    }



    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }


    clearAll() {
        this._operation = [];

        this.setLastNumberToDisplay();
    }

    clearEntry() {
        this._operation.pop();

        this.setLastNumberToDisplay();

    }

    getLastOperation() {
        return this._operation[this._operation.length - 1];


    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value) {
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
    }


    pushOperation(value) {
        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc();

        }

    }

    //Utilizando Evall

    calc() {

        let last = '';

        if(this._operation.length > 3){
            let last = this._operation.pop();

        }
       
        let result = eval(this._operation.join(""));

        if (last == '%'){
            result = result /=100 ;
            this._operation = [result]

        }else {
            this._operation = [result];

            if(last) this._operation.push(last);

        }


        this.setLastNumberToDisplay();
    }


    setLastNumberToDisplay() {

        let lastNumber;
        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (!this.isOperator(this._operation[i])) {
                lastNumber = this._operation[i];
                break;
            }
        }

        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;


    }


    addOperation(value) {
        console.log('A', this.getLastOperation());

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {
                this.setLastOperation(value);
                //trocar Operador

            } else if (isNaN(value)) {
                console.log(value);

            } else {
                this.pushOperation(value);
                this.setLastNumberToDisplay();

            }


        } else {

            if (this.isOperator(value)) {
                this.pushOperation(value);

            } else {
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(nemValue));

                this.setLastNumberToDisplay();

                //Atualizar Display

            }

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

    /* Incrementando switch e case*/
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
                this.calc();

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

    


    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index)=>{

            this.addEventListenerAll(btn, "click drag mouseover", e => {
                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn();
            });

        });

        this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
            btn, style.cursor = "pointer";
        });

    }


    /* acrescentando método Set criado */
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
