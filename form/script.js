'use strict';

// Код валидации формы
function validateForm (params){
    var form = document.getElementById(params.formId);
    var inputList = Array.from (document.querySelectorAll('input'));

    var isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    var numericValidate = function(element) {
        var value = element.value;
        if (value === ""){return true}
        if (!isNumeric(value)) {
            return false;
        }
        if (value < parseInt(element.dataset.validatorMin) || value > parseInt(element.dataset.validatorMax)) {
            return false;
        }
        return true;
    };

    var letterValidate = function (element) {
        var value = element.value;
        if (value === ""){return true}
        return /[[a-zA-Zа-яА-Я]/.test(value);
    };

    var regexpValidate = function (element) {
        var value = element.value;
        if (value === ""){return true}
        var regex = new RegExp(element.dataset.validatorPattern);
        return regex.test(value);
    };


    var blurHandler = function( event ) {
        var element = event ? event.target : this;
        if (element.tagName === 'INPUT') {
            var inputValue = element.value;

            if ((inputValue === "") && (element.dataset.hasOwnProperty("required"))) {
                element.classList.add(params.inputErrorClass);
            }
            if (element.dataset.validator === "letters") {
                if (!letterValidate(element)) {
                    element.classList.add(params.inputErrorClass);
                }
            }
            if (element.dataset.validator === "regexp") {
                if (!regexpValidate(element)) {
                    element.classList.add(params.inputErrorClass);
                }
            }
            if (element.dataset.validator === "number") {
                if (!numericValidate(element)) {
                    element.classList.add(params.inputErrorClass);
                }
            }
        }
    };

    var focusHandler = function( event ) {
        if (event.target.tagName === 'INPUT'){
            event.target.classList.remove(params.inputErrorClass);
        }
    };

    var submitHandler = function( event ) {
        event.preventDefault();
        this.classList.remove(params.formValidClass);
        this.classList.remove(params.formInvalidClass);

        for (var i= 0; i < inputList.length; i++){
            var input = inputList[i];

            blurHandler.call(input);

            var withoutError= function (element, index, array) {
                if(element.classList.contains(params.inputErrorClass) === false){
                    return true;
                }
            };

        }

        if (inputList.every(withoutError)){
            form.classList.add(params.formValidClass);
        } else {
            form.classList.add (params.formInvalidClass);
        }


    };

    form.addEventListener("focus", focusHandler, true);
    form.addEventListener("blur", blurHandler, true);
    form.addEventListener("submit", submitHandler);

}

