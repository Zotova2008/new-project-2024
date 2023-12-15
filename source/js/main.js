import { Form } from './modules/form-validate/form';
import { initModals } from './modules/modals/init-modals';
import { iosVhFix } from './utils/ios-vh-fix';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// ---------------------------------

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
// <div class="www" id="parent2">
//   <div class="ggg" id="parent1">
//     <p class="zzz" id="child"></p>
//   </div>
// </div>
// let elem = document.querySelector('#child');
// let parent = elem.closest('.www');
// console.log(parent.id);
// Результат: 'parent2'
