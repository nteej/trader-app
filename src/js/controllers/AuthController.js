import Handlebars from 'handlebars';
import { Dialog } from '@capacitor/dialog';
import router from '../router.js';

import { loginHbs } from '../templates/login.js';
import { registerHbs } from '../templates/register.js';

export default class AuthController {
    constructor(traderService) {
        this.traderService = traderService;
        this.loginCompiled = Handlebars.compile(loginHbs);
        this.registerCompiled = Handlebars.compile(registerHbs);
    }

    setupEventHandlers = () => {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        if (loginForm) {
            loginForm.addEventListener('submit', this.onLogin);
        }
        if (registerForm) {
            registerForm.addEventListener('submit', this.onRegister);
        }
    }

    onLogin = async (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        const form = event.target;
        const formData = new FormData(form);
        const credentials = Object.fromEntries(formData.entries());

        try {
            const success = await this.traderService.login(
                credentials.username, 
                credentials.password
            );

            if (success) {
                await Dialog.alert({
                    title: 'Success',
                    message: 'Login successful',
                });
                router.load('');  // Navigate to home
            } else {
                this.showError('Invalid credentials');
            }
        } catch (error) {
            this.showError('Login failed');
        }

        return false;
    }

    onRegister = async (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.confirmPassword) {
            this.showError('Passwords do not match');
            return false;
        }

        try {
            // Add register method to TraderService if needed
            const success = await this.traderService.register(
                data.username, 
                data.password
            );

            if (success) {
                await Dialog.alert({
                    title: 'Success',
                    message: 'Registration successful',
                });
                router.load('login');  // Navigate to login
            } else {
                this.showError('Registration failed');
            }
        } catch (error) {
            this.showError('Registration failed');
        }

        return false;
    }

    showError(message) {
        const errorDiv = document.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden');
        }
    }

    renderLogin = () => {
        return this.loginCompiled();
    }

    renderRegister = () => {
        return this.registerCompiled();
    }
}