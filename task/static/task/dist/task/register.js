/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./task/resources/js/register.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./task/resources/js/register.js":
/*!***************************************!*\
  !*** ./task/resources/js/register.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Register\r\n{\r\n  run()\r\n  {\r\n    this.bindSubmit()\r\n  }\r\n\r\n  bindSubmit()\r\n  {\r\n    const submit = document.querySelector('#register-btn')\r\n\r\n    submit.onclick = (e) => {\r\n      const form = e.target.closest('form')\r\n      const valid = this.validate(form)\r\n      const validPass = this.passConfirm(form)\r\n\r\n      if (valid && validPass) {\r\n        this.sendRequest(form)\r\n      }\r\n    }\r\n  }\r\n\r\n  validate(form)\r\n  {\r\n    const invalid = []\r\n\r\n    for (let item of form.querySelectorAll('.form-control')) {\r\n      if (item.required && !item.value) {\r\n\r\n        this.setInvalid(item, 'Field cannot be left blank')\r\n\r\n        invalid.push(true)\r\n\r\n        continue\r\n      }\r\n\r\n      this.setInvalid(item)\r\n    }\r\n\r\n    return !invalid.includes(true)\r\n  }\r\n\r\n  passConfirm(form)\r\n  {\r\n    const pass_verify = form.querySelector('[name=pass_verify]')\r\n    const password = form.querySelector('[name=password]')\r\n\r\n    const valid = pass_verify.value == password.value\r\n\r\n    if (!password.value) {\r\n      return valid\r\n    }\r\n\r\n    if (!valid) {\r\n\r\n      this.setInvalid(pass_verify, 'Password not match')\r\n\r\n      return valid\r\n    }\r\n\r\n    this.setInvalid(pass_verify)\r\n\r\n    return valid\r\n  }\r\n\r\n  setInvalid(el, msg=null)\r\n  {\r\n    if (!msg) {\r\n      el.closest('.border').classList.remove('border-danger')\r\n      const label = el.parentNode.querySelector('small')\r\n\r\n      if (label) {\r\n        el.parentNode.removeChild(label)\r\n      }\r\n\r\n      return\r\n    }\r\n\r\n    el.focus()\r\n    el.closest('.border').classList.add('border-danger')\r\n    el.parentNode.appendChild(this.alertText(msg))\r\n  }\r\n\r\n  alertText(text)\r\n  {\r\n    const element = document.createElement('small')\r\n    element.classList.add(...'invalid text-danger'.split(' '))\r\n\r\n    element.innerHTML = text\r\n\r\n    return element\r\n  }\r\n\r\n  disableAll()\r\n  {\r\n    const form = document.querySelector('form')\r\n    const btn = document.querySelector('#register-btn')\r\n\r\n    for (let item of form) {\r\n      item.classList.add('disabled')\r\n      item.disabled = true\r\n    }\r\n\r\n    btn.classList.add('disabled')\r\n    btn.disabled = true\r\n  }\r\n\r\n  showLogin()\r\n  {\r\n    const loginbtn = document.querySelector('#login-btn')\r\n\r\n    loginbtn.parentNode.classList.remove('d-none')\r\n  }\r\n\r\n  sendRequest(form)\r\n  {\r\n    const data = new FormData(form)\r\n\r\n    fetch('', {\r\n      method: 'POST',\r\n      headers: {\r\n        'X-CSRFTOKEN': Cookies.get('csrftoken')\r\n      },\r\n      body: data\r\n    })\r\n      .then((res) => {\r\n        if (res.status == 400) {\r\n          return res.json()\r\n        }\r\n\r\n        if (res.status == 500) {\r\n          alert('Something went wrong')\r\n\r\n          return res.json()\r\n        }\r\n      })\r\n\r\n      .then((res) => {\r\n        if (!res) {\r\n\r\n          this.disableAll()\r\n          this.showLogin()\r\n\r\n          return\r\n        }\r\n\r\n        this.showErrorField(res)\r\n      })\r\n  }\r\n\r\n  showErrorField(res) {\r\n    const element = document.querySelector(`[name=\"${res.name}\"`)\r\n\r\n    if (element) {\r\n      element.focus()\r\n\r\n      this.setInvalid(element, res.message)\r\n    }\r\n  }\r\n}\r\n\r\n\r\nnew Register().run()\n\n//# sourceURL=webpack:///./task/resources/js/register.js?");

/***/ })

/******/ });