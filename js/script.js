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

const dayInput = document.getElementById('age-day');
const dayInputValidation = () => {
    if (dayInput.value == '') {
        formFeedbacks[0].textContent = "This field is require";
        formFeedbacks[0].removeAttribute('hidden');
        formLabels[0].classList.add('js-form-label-error');
    } else if (!(dayInput.value >= 1 &&  dayInput.value <= 31  && dayInput.value <= daysInMonth(yearInput.value, monthInput.value))) {
        formFeedbacks[0].textContent = "Must be a valid day";
        formFeedbacks[0].removeAttribute('hidden');
        formLabels[0].classList.add('js-form-label-error');
    } else {
        formFeedbacks[0].setAttribute('hidden', 'hidden');
        formLabels[0].classList.remove('js-form-label-error');
    }
}

const yearInput = document.getElementById('age-year');
const yearInputValidation = () => {
    if (yearInput.value == '') {
        formFeedbacks[2].textContent = "This field is require";
        formFeedbacks[2].removeAttribute('hidden');
        formLabels[2].classList.add('js-form-label-error');
    } else if ((yearInput.value > currentYear) && yearInput.value > 0) {
        formFeedbacks[2].textContent = "Must be a valid year";
        formFeedbacks[2].removeAttribute('hidden');
        formLabels[2].classList.add('js-form-label-error');
    } else {
        daysInMonth(yearInput.value, monthInput.value);
        dayInputValidation();
        formFeedbacks[2].setAttribute('hidden', 'hidden');
        formLabels[2].classList.remove('js-form-label-error');
    }
}

const monthInput = document.getElementById('age-month');
const monthInputValidation = () => {
     if (monthInput.value == '') {
        formFeedbacks[1].textContent = "This field is require";
        formFeedbacks[1].removeAttribute('hidden');
        formLabels[1].classList.add('js-form-label-error');
    } else if (!(monthInput.value >= 1 && monthInput.value <= 12)) {
        formFeedbacks[1].textContent = "Must be a valid month";
        formFeedbacks[1].removeAttribute('hidden');
        formLabels[1].classList.add('js-form-label-error');
    } else {
        formFeedbacks[1].setAttribute('hidden', 'hidden');
        formLabels[1].classList.remove('js-form-label-error');
    }
}



// listen to user inputs
dayInput.addEventListener('input', dayInputValidation);
monthInput.addEventListener('input', monthInputValidation);
yearInput.addEventListener('input', yearInputValidation);

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


