var num = 0;
var disp = '';
var total = 0;
var expression = '';
var flag = false;
var power = 1;
var stack = [];

function calculate(val) {
  if (stack.length == 0) stack.push(num);
  if (val != 'AC' || val != 'CE') {
    var p = stack.pop();
    if (p == '-' || p == '+' || p == '*' || p == '/') {
      var num1 = stack.pop();
      switch (p) {
        case '-':
          total = num1 - num;
          stack.push(total);
          break;
        case '+':
          total = num1 + num;
          stack.push(total);
          break;
        case '*':
          total = num1 * num;
          stack.push(total);
          break;
        case '/':
          total = num1 / num;
          stack.push(total);
          break;
        default:
          break;
      }
    } else {
      stack.push(p);
    }
  }
  expression += disp + ' ';
  switch (val) {
    case 'AC':
      disp = '';
      num = 0;
      total = 0;
      expression = '';
      while (stack.pop()) {}
      $('.answer').html('0');
      $('.calculation').html('0');
      break;
    case 'CE':
      num = 0;
      disp = '';
      $('.answer').html('0');
      break;
    case '/':
      expression += '/ ';
      stack.push('/');
      $('.answer').html(val);
      $('.calculation').html(expression);
      break;
    case '*':
      expression += '* ';
      stack.push('*');
      $('.answer').html(val);
      $('.calculation').html(expression);
      break;
    case '+':
      expression += '+ ';
      stack.push('+');
      $('.answer').html(val);
      $('.calculation').html(expression);
      break;
    case '-':
      expression += '- ';
      stack.push('-');
      $('.answer').html(val);
      $('.calculation').html(expression);
      break;
    case '=':
      expression += '= ' + total;
      var num2 = stack.pop();
      var exp = stack.pop();
      var num1 = stack.pop();
      switch (exp) {
        case '-':
          total = num1 - num2;
          break;
        case '+':
          total = num1 + num2;
          break;
        case '*':
          total = num1 * num2;
          break;
        case '/':
          total = num1 / num2;
          break;
        default:
          break;
      }
      $('.answer').html(total);
      $('.calculation').html(expression);
      num = 0;
      total = 0;
      expression = '';
      disp = '';
      while (stack.pop()) {}
      break;
    default:
      break;
  }
  disp = '';
  num = 0;
  flag = false;
}

function genNum(val) {
  if (stack.length == 0) $('.calculation').html(num);
  if (val === '.') {
    if (flag != true) {
      power = 1;
      disp = num + '.';
    }
    flag = true;
  } else {
    if (flag == true) {
      var temp = val;
      temp = Math.pow(10, -power);
      num += temp * val;
      power++;
    } else {
      num *= 10;
      num += val;
    }
    disp += val;
  }
  $('.answer').html(disp);
}
