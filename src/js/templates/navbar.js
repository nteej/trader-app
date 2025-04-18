export const navbarHbs = `
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Trader</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#"><i class="fa fa-home"></i>&nbsp;Home</a>
        </li>
        {{#if isAuthenticated}}
        <li class="nav-item">
          <a class="nav-link" href="#"><i class="fa fa-briefcase"></i>&nbsp;Business</a>
        </li>
        {{/if}}
      </ul>
      <div class="d-flex align-items-center">
                <span class="navbar-text me-3">
                    <i class="fa fa-user"></i>&nbsp; {{username}}
                </span>
                <a href="#logout" class="btn btn-warning">
                    <i class="fa fa-sign-out-alt"></i> Logout
                </a>
            </div>
    </div>
  </div>
</nav>
`;