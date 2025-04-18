export const registerHbs = `
<div class="auth-container">
    <div class="register-form">
        <div class="form-header">
            <img src="assets/logo.png" alt="Logo" class="logo">
            <h2>Create Account</h2>
            <p class="subtitle">Please fill in your details to register</p>
        </div>

        <form id="registerForm">
            <div class="form-group">
                <div class="input-group">
                    <i class="fa fa-user"></i>
                    <input type="text" id="username" name="username" 
                           class="form-control" required
                           placeholder="Choose a username">
                </div>
            </div>

            <div class="form-group">
                <div class="input-group">
                    <i class="fa fa-lock"></i>
                    <input type="password" id="password" name="password" 
                           class="form-control" required
                           placeholder="Create a password">
                </div>
            </div>

            <div class="form-group">
                <div class="input-group">
                    <i class="fa fa-lock"></i>
                    <input type="password" id="confirmPassword" name="confirmPassword" 
                           class="form-control" required
                           placeholder="Confirm your password">
                </div>
            </div>

            <div class="form-options">
                <label class="terms-checkbox">
                    <input type="checkbox" name="terms" required>
                    <span>I agree to the <a href="#" class="terms-link">Terms & Conditions</a></span>
                </label>
            </div>

            <div class="error-message hidden"></div>
            
            <button type="submit" class="btn btn-primary btn-block">
                Create Account
            </button>
        </form>

        <div class="auth-footer">
            <p>Already have an account? <a href="#login" class="login-link">Sign In</a></p>
        </div>
    </div>
</div>
`;