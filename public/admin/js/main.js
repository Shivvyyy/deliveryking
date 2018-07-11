let usernameField = document.getElementById('username');
let passwordField = document.getElementById('pswd');
let submitBtn = document.getElementById('login-submit');
let logoutBtn = document.getElementById('logout');

submitBtn.addEventListener('click', (e) => {
	e.preventDefault();
	if(usernameField.value === '' || passwordField.value === '') {
		document.getElementById('warning2').style.display = 'none';
		document.getElementById('warning1').style.display = 'block';
	}else if(usernameField.value === 'dlking' && passwordField.value === 'dlking@123') {
		localStorage.setItem('user', 'dlking');
		document.getElementById('login').submit();
	} else { 
		document.getElementById('warning1').style.display = 'none';
		document.getElementById('warning2').style.display = 'block';	
	}
});

