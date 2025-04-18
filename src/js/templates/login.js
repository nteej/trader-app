export const loginHbs = `
<div class="auth-container">
    <div class="login-form">
        <div class="form-header">
            <img src="assets/imgs/logo.png" alt="Logo" class="logo">
            <h2>Tervetuloa</h2>
            <p class="subtitle">Please sign in to continue</p>
        </div>

        <form id="loginForm">
            <div class="form-group">
                <div class="input-group">
                    <i class="fa fa-user"></i>
                    <input type="text" id="username" name="username" 
                           class="form-control" required
                           placeholder="Username">
                </div>
            </div>

            <div class="form-group">
                <div class="input-group">
                    <i class="fa fa-lock"></i>
                    <input type="password" id="password" name="password" 
                           class="form-control" required
                           placeholder="Password">
                </div>
            </div>

            <div class="error-message hidden"></div>
            
            <button type="submit" class="btn btn-primary btn-block">
                Sign In
            </button>
        </form>

        <div class="auth-footer">
            <p>Don't have an account? <a href="#register" class="register-link">Sign Up</a></p>
        </div>
    </div>
</div>
`;