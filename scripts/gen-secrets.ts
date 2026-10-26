import crypto from 'node:crypto';

const password = prompt('Password:');

if (!password) {
	throw 'No password received!';
}

const salt = crypto.randomBytes(16);
console.log('SALT=' + salt.toString('hex'));
console.log(
	'HASH=' + crypto.scryptSync(password, salt, 64).toString('hex'),
);
