// grab HTML element fro DOM tree
let ageCalculatorForm = document.querySelector('.js-age-form');
let ageCalculatorInputs = document.querySelectorAll('.js-form-input');
let formFeedbacks = document.querySelectorAll('.js-form-feedback');
let formLabels = document.querySelectorAll('.js-form-label');


const currentDate = () => {
    const currentDate = new Date();
    return {
        currentYear: currentDate.getFullYear(), 
        currentMonth: currentDate.getMonth(), 
        currentDay: currentDate.getDate()
    }
}

const {currentYear, currentMonth, currentDay} = currentDate();

const daysInMonth = (year, month) => {
    // no 0th day in any month, JavaScript 
    // automatically adjusts this to 
    // the last day of the previous month
    return ((new Date(year, month, 0)).getDate());
}

const dayInputField = document.getElementById('age-day');
let dayInputValue = Number(dayInputField.value);
const dayInputValidation = () => {
    dayInputValue = Number(dayInputField.value);
    inputValidation(dayInputValue, 0);
}

const yearInputField = document.getElementById('age-year');
let yearInputValue = Number(yearInputField.value);
const yearInputValidation = () => {
    yearInputValue = Number(yearInputField.value);
    inputValidation(yearInputValue, 2);
    dayInputValidation();
}

const monthInputField = document.getElementById('age-month');
let monthInputValue = Number(monthInputField.value);
const monthInputValidation = () => {
    monthInputValue = Number(monthInputField.value);
    inputValidation(monthInputValue, 1);
    dayInputValidation();
}


const inputValidation = (userInput, feedbackId) => {
    let condition;
    switch(feedbackId) {
        case 0:
            // to improve UX because 
            
            // using this condition userInput <= daysInMonth(yearInputValue, monthInputValue)
            // without checking there are a values for month or year
            // cause throw month error

            // eg.
            // after user enter 29 and february (2)
            // without entering year yet year value will be 0
            // so it will set it to the current year (2025) not a leap year
            // and throw an error for user before he enter his year value
            // daysInMonth(0, 2)

            // adding this part (monthValue && yearValue && userInput) 
            // prevent calling func before adding year value 
            condition = !(userInput >= 1 &&  userInput <= 31  && 
                (monthValue && yearValue && userInput <= daysInMonth(yearInputValue, monthInputValue)));
            errorWord = "day";
            break;
        case 1:
            condition = !(userInput >= 1 && userInput <= 12);
            errorWord = "month";
            break;
        case 2:
            condition = (userInput > currentYear) && userInput > 0;
            errorWord = "year";
            break;

    }
    if (userInput === '') {
        formFeedbacks[feedbackId].textContent = "This field is require";
        formFeedbacks[feedbackId].removeAttribute('hidden');
        formLabels[feedbackId].classList.add('js-form-label-error');
    } else if (condition) {
        formFeedbacks[feedbackId].textContent = `Must be a valid ${errorWord}`;
        formFeedbacks[feedbackId].removeAttribute('hidden');
        formLabels[feedbackId].classList.add('js-form-label-error');
    } else {
        formFeedbacks[feedbackId].setAttribute('hidden', 'hidden');
        formLabels[feedbackId].classList.remove('js-form-label-error');
    }

}

// listen to user inputs
dayInputField.addEventListener('input', dayInputValidation);
monthInputField.addEventListener('input', monthInputValidation);
yearInputField.addEventListener('input', yearInputValidation);

// listen to form submit
ageCalculatorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    (ageCalculatorInputs).forEach((inputValue, index) => {
        console.log(typeof(inputValue.value));
        // check error empty fields
        if(inputValue.value === '') {
            // get empty input field index
            //  show error for that field only
            let emptyInputFieldIndex = index;
            formFeedbacks.forEach(() => {
                formFeedbacks[emptyInputFieldIndex].textContent = "This field is required";
                formFeedbacks[emptyInputFieldIndex].removeAttribute('hidden');
            });
            formLabels.forEach((formLabel) => {
                formLabels[emptyInputFieldIndex].classList.add('js-form-label-error');
            });
        } else {
            
        }
    } )
})






/* write difference between using children & childNodes
** document.querySelector('.js-age-form').children >> element nodes >> return object (HTMLCollection is an array-like object)
** HTMLCollection is an array-like object but it does not have forEach method
** Array.from(toggleButton).forEach((el) => {})

** document.querySelector('.js-age-form').childNodes >> all nodes, element, text, comment, .... >> returns a live NodeList of child nodes

** loop over 
** document.querySelector('.js-age-form').children
????? هل ممكن loop over with for...of
ايوه ينفع 

** or 
** document.querySelectorAll('.form-input');
** document.querySelectorAll return nodeList which we can loop over with forEach


???? are form input with type number return a string for value attribute
yes they return a string


in condition comparing if statement 
كان مش بيدخل على الحالة التانية ابدا لان الحالة الاولي بردو كانت بترجع
false
فكان بيدخل فيها لان هي الاولانية
احمد ؟؟؟؟؟؟؟؟؟؟؟
*/


