"use strict";

export default class TraderService {
    constructor() {
        this.baseUrl = 'https://trader-api-egevceengbe7egck.northeurope-01.azurewebsites.net/api';
        this.authUrl = this.baseUrl+'/auth/login';
        this.token = localStorage.getItem('authToken');
        this.username = localStorage.getItem('username');
    }

    initialize = async () => {
        // No initialization required for API version
    }

    login = async (username, password) => {
        try {
            const response = await fetch(this.authUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            if (data.status === 1 && data.data.token) {
                this.token = data.data.token;
                // Store token in localStorage
                localStorage.setItem('authToken', this.token);
                localStorage.setItem('username', username);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    }

    logout = () => {
        this.token = null;
        // Remove token from localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
    }

    getAuthHeaders() {
        return {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        };
    }

    findById = async (id) => {
        try {
            if (!this.token) throw new Error('Not authenticated');

            const response = await fetch(`${this.baseUrl}/${id}`, {
                headers: this.getAuthHeaders()
            });
            if (!response.ok) {
                throw new Error('Appointment not found');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching appointment:', error);
            return null;
        }
    }

    findByName = async (searchKey) => {
        try {
            if (!this.token) throw new Error('Not authenticated');

            const response = await fetch(`${this.baseUrl}?search=${encodeURIComponent(searchKey)}`, {
                headers: this.getAuthHeaders()
            });
            if (!response.ok) {
                throw new Error('Failed to search appointments');
            }
            return await response.json();
        } catch (error) {
            console.error('Error searching appointments:', error);
            return [];
        }
    }

    persist = async (appointment) => {
        try {
            if (!this.token) throw new Error('Not authenticated');

            const method = appointment.id ? 'PUT' : 'POST';
            const url = appointment.id ? `${this.baseUrl}/${appointment.id}` : this.baseUrl;
            
            const response = await fetch(url, {
                method: method,
                headers: this.getAuthHeaders(),
                body: JSON.stringify(appointment)
            });

            if (!response.ok) {
                throw new Error('Failed to save appointment');
            }
            
            return true;
        } catch (error) {
            console.error('Error saving appointment:', error);
            return false;
        }
    }

    discard = async (appointment) => {
        try {
            if (!this.token) throw new Error('Not authenticated');
            if (!appointment?.id) return false;

            const response = await fetch(`${this.baseUrl}/${appointment.id}`, {
                method: 'DELETE',
                headers: this.getAuthHeaders()
            });

            return response.ok;
        } catch (error) {
            console.error('Error deleting appointment:', error);
            return false;
        }
    }
}