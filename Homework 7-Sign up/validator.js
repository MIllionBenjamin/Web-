var validator = {
	form: {
		username: {
			status: false,
			errorMessage: '6-10 English letters, numbers, or underlines. Must begin with a letter.'
		},
		sid: {
			status: false,
			errorMessage: 'Should be 8-digit number.'
		},
		phone: {
			status: false,
			errorMessage: 'Should be 11-digit number. Cannot begin with \'0\'.'
		},
		email: {
			status: false,
			errorMessage: 'Please enter valid e-mail.'
		}
	},

	isUsernameValid: function (username){
		return this.form.username.status = /^[a-zA-Z][a-zA-Z0-9_]{6,18}$/.test(username);
	},

	isSidValid: function (sid){
		return this.form.sid.status = /^[1-9]\d{7}$/.test(sid);
	},

	isPhoneValid: function(phone){
		return this.form.phone.status = /^[1-9]\d{10}$/.test(phone);
	},

	isEmailValid: function(email){
		return this.form.email.status = /^[a-zA-Z_\-]+@([a-zA-Z_\-]+\.)+[a-zA-Z]{2,4}$/.test(email);
	},

	isFieldValid: function(fieldname, value){
		var CapFilename = fieldname[0].toUpperCase() + fieldname.slice(1,fieldname.length);
		return this["is" + CapFilename + 'Valid'](value);
	},

	isFormValid: function(){
		return this.form.username.status && this.form.sid.status && this.form.phone.status && this.form.email.status;
	},

	getErrorMessage: function(fieldname){
		return this.form[fieldname].errorMessage;
	},

	isAttrValueUnique: function(registry, user, attr){
		for(var key in registry){
			if(registry.hasOwnProperty(key) && registry[key][attr] == user[attr]) return false;
		}
		return true;
	}
};

if (typeof module == 'object' ) 
{
	module.exports = validator;
}