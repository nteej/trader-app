import TraderService from './services/TraderService.js';
import HomeController from './controllers/HomeController.js';
import ShopController from './controllers/ShopController.js';
import AuthController from './controllers/AuthController.js';
import OutletController from './controllers/OutletController.js';
import Handlebars from 'handlebars';
import router from './router.js';
import { navbarHbs } from './templates/navbar.js';

/* ---------------------------------- File local Functions ---------------------------------- */

async function setupApplication() {
    const navbarTemplate = Handlebars.compile(navbarHbs);

    /* ---------------------------------- Variables ---------------------------------- */
    let service = new TraderService();
    router.setAuthService(service);

    // Register Handlebars helper
    Handlebars.registerHelper('if_eq', (a, b, opts) => {
        if (a == b) {
            return opts.fn(this);
        }
        return opts.inverse(this);
    });
    Handlebars.registerHelper('formatDate', (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    });
    
    // Add increment helper for index values
    Handlebars.registerHelper('inc', (value) => {
        return parseInt(value) + 1;
    });

    const updateNavbar = (active = '') => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.innerHTML = navbarTemplate({
                isAuthenticated: service.token !== null,
                username: localStorage.getItem('username') || 'User',
                active: active
            });
        }
    };
    const content = document.getElementById('content');
    content.insertAdjacentHTML('beforebegin', '<div id="navbar"></div>');
    content.style.paddingTop = '0px';

    // Auth routes
    router.addRoute('login', () => {
        const authController = new AuthController(service);
        window.content.innerHTML = authController.renderLogin();
        authController.setupEventHandlers();
    });

    router.addRoute('register', () => {
        const authController = new AuthController(service);
        window.content.innerHTML = authController.renderRegister();
        authController.setupEventHandlers();
    });

    router.addRoute('logout', () => {
        service.logout();
        router.load('login');
    });

    // Protected routes
    router.addRoute('', () => {
        if (!service.token) {
            router.load('login');
            return;
        }
        updateNavbar('');
        const homeController = new HomeController(service);
        document.body.innerHTML = homeController.render();
        homeController.findByName('');
        window.searchString.oninput = homeController.findByName;
    });

    // Shop routes
    router.addRoute('shops/new', () => {
        if (!service.token) {
            router.load('login');
            return;
        }
        const shopController = new ShopController(service);
        window.content.innerHTML = shopController.renderCreate();
        shopController.setupEventHandlers();
    });

    router.addRoute('shops/:id/edit', async(shopId) => {
        if (!service.token) {
            router.load('login');
            return;
        }
        try {
            const shopController = new ShopController(service);
            const content = await shopController.renderEdit(shopId);
            document.getElementById('content').innerHTML = content;
            shopController.setupEventHandlers();
        } catch (error) {
            document.getElementById('content').innerHTML = `
                <div class="error-message">
                    <i class="fa fa-exclamation-circle"></i>
                    <p>${error.message}</p>
                </div>`;
        }
    });

    router.addRoute('shops/:id',async (shopId) => {
        if (!service.token) {
            router.load('login');
            return;
        }
        try {
            const shopController = new ShopController(service);
            const content = await shopController.readById(shopId);
            document.getElementById('content').innerHTML = content;
            shopController.setupEventHandlers();
        } catch (error) {
            document.getElementById('content').innerHTML = `
                <div class="error-message">
                    <i class="fa fa-exclamation-circle"></i>
                    <p>${error.message}</p>
                </div>`;
        }
    });
    //outlet 
    router.addRoute('outlet/new/:id', (shopId) => {
        if (!service.token) {
            router.load('login');
            return;
        }
        const outletController = new OutletController(service);
        window.content.innerHTML = outletController.renderCreate(shopId);
        outletController.setupEventHandlers();
    });
    router.addRoute('outlet/:id',async (outletId) => {
        if (!service.token) {
            router.load('login');
            return;
        }
        try {
            const outletController = new OutletController(service);
            const content = await outletController.readById(outletId);
            window.content.innerHTML =content;
            outletController.setupEventHandlers();
        } catch (error) {
            window.content.innerHTML = `
                <div class="error-message">
                    <i class="fa fa-exclamation-circle"></i>
                    <p>${error.message}</p>
                </div>`;
        }
    });
    router.addRoute('outlet/:id/edit', async(outletId) => {
        if (!service.token) {
            router.load('login');
            return;
        }
        try {
            const outletController = new OutletController(service);
            const content = await outletController.renderEdit(outletId);
            document.getElementById('content').innerHTML = content;
            outletController.setupEventHandlers();
        } catch (error) {
            document.getElementById('content').innerHTML = `
                <div class="error-message">
                    <i class="fa fa-exclamation-circle"></i>
                    <p>${error.message}</p>
                </div>`;
        }
    });

    // Start the router - will redirect to login if not authenticated
    router.parseRoute();
    updateNavbar();
}

// Add our EventListener for when the window is loaded
window.onload = setupApplication;