function displayMessage(message) {
  $('#message').text(message);
  $('#message').css({ display: 'block' });
}

const key = CryptoJS.lib.WordArray.random(32).toString();

$(function () {
  $('#signup-form').on('submit', function (event) {
    event.preventDefault();

    const username = $('#username').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const role = $('#role').val();

    $('body').on('click', function () {
      $("#message").css({ display: 'none' });
    });

    if (validateForm(username, email, password, role)) {
      if (role === 'admin') {
        // Admin will be added only via login, not sign-up
        displayMessage('Admin role cannot be added via sign-up.');
      } else if (role === 'seller') {
        addSeller(username, email, password, role); // Seller
      } else {
        addUser(username, email, password, role); // Regular user
        $('#username').val('');
        $('#email').val('');
        $('#password').val('');
        $('#role').val('');
      }
    }
  });

  function validateForm(username, email, password, role) {
    const usernameRegex = /^(([A-Z]|[a-z]){2,}(-|_)?([a-z]|[A-Z])+)+$/;
    const emailRegex =
      /^([a-z]|[A-Z])+([a-z]|[A-Z]|-|_|[1-9]){2,}[@]([a-z]|[A-Z])+(\.com)$/;
    const passwordMinLength = 6;

    if (!usernameRegex.test(username)) {
      displayMessage('Username must contain at least 3 alphabets, ("_" , "-") are allowed.');
      return false;
    }
    if (!emailRegex.test(email)) {
      displayMessage('Email is not valid.');
      return false;
    }

    if (password.length < passwordMinLength) {
      displayMessage('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  }

  function addUser(username, email, password, role) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const carts = JSON.parse(localStorage.getItem('carts')) || {};
    const userExists = users.some((user) => user.username === username);
    const emailExists = users.some((user) => user.email === email);

    if (userExists) {
      displayMessage('Username already exists. Please choose another one.');
    } else if (emailExists) {
      displayMessage('Email already exists. Please choose another one.');
    } else {
      // Encrypt password
      const encryptedPassword = CryptoJS.AES.encrypt(password, key).toString();

      const newUser = { username, email, encryptedPassword, role };
      users.push(newUser);
      if(role=='customer'){
        carts[username]=[]
        // const newCart = {[username]:[]};
        // newCart[username]=[]
        // carts.push(newCart);
        console.log(carts)
      }
      localStorage.setItem('carts', JSON.stringify(carts));
      localStorage.setItem('users', JSON.stringify(users));
      displayMessage('User added successfully!');
    }
  }

  function addSeller(username, email, password, role) {
    const sellers = JSON.parse(localStorage.getItem('sellers')) || [];
    const sellerExists = sellers.some((seller) => seller.username === username);
    const emailExists = sellers.some((seller) => seller.email === email);

    if (sellerExists) {
      displayMessage('Username already exists. Please choose another one.');
    } else if (emailExists) {
      displayMessage('Email already exists. Please choose another one.');
    } else {
      // Encrypt password
      const encryptedPassword = CryptoJS.AES.encrypt(JSON.stringify(password), key).toString();

      const newSeller = { username, email, encryptedPassword, role };
      sellers.push(newSeller);
      $('#username').val('');
      $('#email').val('');
      $('#password').val('');
      $('#role').val('');
      localStorage.setItem('sellers', JSON.stringify(sellers));
      displayMessage('Seller added successfully!');
    }
  }
});
