export const shopHbs = `
            <div class="shops-container">
                
                
                {{#each shops}}
                <div class="shop-card">
                    <div class="shop-header">
                        <ul class="list-group">
                            <li class="list-group-item active" aria-current="true">{{name}}</li>
                            <li class="list-group-item">{{owner}}</li>
                            <li class="list-group-item">{{address}}</li>
                            <li class="list-group-item">{{postalCode}}</li>
                            <li class="list-group-item">{{phone}}</li>
                            <li class="list-group-item active">
                                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <a href="#outlet/new/{{id}}" type="button" class="btn btn-success">Add outlet</a>
                                    <a href="#shops/{{id}}" type="button" class="btn btn-warning">View</a>
                                    <a href="#shops/{{id}}/edit" type="button" class="btn btn-danger">Edit</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="outlets-container">
                        <h3>Outlets({{outlets.length}})</h3>
                        {{#each outlets}}
                         <ul class="list-group mb-1">
                            <li class="list-group-item active" aria-current="true">{{name}}</li>
                            <li class="list-group-item">{{manager}}</li>
                            <li class="list-group-item">{{address}}</li>
                            <li class="list-group-item">{{duration}}</li>
                            <li class="list-group-item">{{phone}}</li>
                            <li class="list-group-item active">
                                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                    
                                    <a href="#outlet/{{this.id}}" type="button" class="btn btn-warning">View</a>
                                    <a href="#outlet/{{this.id}}/edit" type="button" class="btn btn-danger">Edit</a>
                                </div>
                            </li>
                        </ul>
                        
                        {{/each}}
                    </div>
                </div>
                {{/each}}
            </div>
        `