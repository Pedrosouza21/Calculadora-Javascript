class CalcController {

    /* se tiver "_" é porque ele é privado */
    /*aprendendo constructorr*/

    constructor() {
        this._audio = new Audio('click.mp3');
        this._audioOnOff = false;
        this._lastOperator = '';
        this._lastNumber = '';

        this._operation = [];
        this.locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard();
    }

    pasteFromClipboard(){
        document.addEventListener('paste',e=>{

         let text = e.clipboardData.getData('Text');

         this.displayCalc = parseFloat('text');

         console.log(text);


        });
    }


    //Evento Control C e Control V 

    copyToClipboard(){

        let input = document.createElement('input');

        input.value = this.displayCalc;

        document.body.appendChild(input);

        input.select();

        document.execCommand("Copy");

        input.remove();

    }


    initialize(){
        this.setDisplayDateTime();


        setInterval(() => {

            this.displayDate = this.currentDate.toLocaleDateString(this._locale);
            this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
        }, 1000);

        this.setLastNumberToDisplay();
        this.pasteFromClipboard();

        document.querySelectorAll9('.btn-ac').forEach(btn=>{

            btn.addEventListener('dblclcik', e=>{
                this.toggleAudio();
            

            });

        });


    }

    toggleAudio(){

        this._audioOnOff = !this._audioOnOff;

    }

    //toda vez que o botão for pressionado, ele irá ttocar 
    playAudio(){

        if (this._audioOnOff){
            this._audiocurrentTime = 0;
            this._audio.play();
        }

    }


    initKeyboard(){
        document.addEventListener('keyup', e => {

            this.playAudio();

            switch (e.key) {

                case 'Escape':
                    this.clearAll();
                    break;

                case 'Backspace':
                    this.clearEntry();
                    break;

                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(e.key);
                    break;

                case 'Enter':
                case '=':
                    this.calc();

                    break;

                case '.':
                case ',':
                    this.addDot();
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
                    this.addOperation(parseInt(e.key));
                    break;

                case 'c':
                    if (e.ctrlKey) this.copyToClipboard();
                    break;


            }

        });

    }



    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }


    clearAll() {
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';

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

//  arrumando erros eval
    getResult() {
        try{
            return eval(this._operation.join(""));
            
        }catch(e){
            setTimeout(() => {
                this.setError();
                
            }, 1);
           
        } 
    }


    //Utilizando Evall
    calc() {

        let last = '';
        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if (this._operation.length > 3) {
            last = this._operation.pop();
            this._lastNumber = this.getResult();

        } else if (this._operation.length == 3) {

            this._lastNumber = this.getLastItem(false);
        }

        console.log('_lastOperator', this._lastOperator);
        console.log('_lastNumber', this._lastNumber);

        let result = this.getResult();

        if (last == '%') {
            result = result /= 100;
            this._operation = [result]

        } else {
            this._operation = [result];

            if (last) this._operation.push(last);

        }


        this.setLastNumberToDisplay();
    }

    getLastItem(isOperator = true) {

        let LastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (this.isOperator(this._operation[i] == isOperator)) {
                LastItem = this._operation[i];
                break;
            }

        }

        if (!LastItem) {

            LastItem = (isOperator) ? this._lastOperator : this._lastNumber
        }

        return LastItem;
    }


    setLastNumberToDisplay() {

        let lastNumber = this.getLastItem(false);

        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }


    addOperation(value) {

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {
                this.setLastOperation(value);
                //trocar Operador

            } else {
                this.pushOperation(value);

                this.setLastNumberToDisplay();
            }


        } else {

            if (this.isOperator(value)) {
                this.pushOperation(value);

            } else {
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseFloat(newValue));

                this.setLastNumberToDisplay();

                //Atualizar Display

            }

        }

        console.log(this.operation)
    }


    setError() {
        this.displayCalc = "Error";

    }

    // Corrigindo Bugs do botão
    addDot() {

        let lastOperation = this.getLastOperation();

        if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if (this.isOperator(lastOperation) || !lastOperation) {
            this.pushOperation('0.');

        } else {
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();



    }

    /* addEventListener recebe 2 parametros(cliques) */
    /* switch = se for feito x, faça y e pare
    break = pare
    Se clicar em ac, irá apagar tudo */
    /* Incrementando switch e case*/

    execBtn(value) {

        this.playAudio();


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
                this.addDot();

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
        if(value.toString().length > 10 ) {
            this.setError();
            return false; 
        }

     this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }
    set currentDate(value) {
        return this._currentDate = value;
    }

}
