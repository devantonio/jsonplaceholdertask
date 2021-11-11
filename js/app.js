const _$ = document.querySelector.bind(document);
const _$$ = document.querySelectorAll.bind(document);


function getUsers(callback) {
    let req = new Request('https://jsonplaceholder.typicode.com/users',{
    method:"GET"
    });

    fetch(req)
    .then(response => response.text())
    .then((response) => {

        response = JSON.parse(response);

         callback(response);
        

    }).catch(err => console.log(err));
}

function getPosts(callback) {
    let req = new Request('https://jsonplaceholder.typicode.com/posts',{
        method:"GET"
    });

    fetch(req)
    .then(response => response.text())
    .then((response) => {

        response = JSON.parse(response);

        callback(response);
        

    }).catch(err => console.log(err));
}


getUsers( (response) => {
    if(response) {

        _$('tr').innerHTML = `
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>`;

        response.forEach((el) => {
                _$('#select-user').insertAdjacentHTML('beforeend', `
                <option value="${el.id}">${el.username}</option>
            `);

            _$('tbody').insertAdjacentHTML('beforeend',`
                <tr>
                    <td>
                        <div class="data-id">
                            ${el.id}
                        </div>
                    </td>
                    <td>
                        <div class="data-name">
                            ${el.name}
                        </div>
                    </td>
                    <td>
                        <div class="data-username">
                            ${el.username}
                        </div>
                    </td>
                    <td>
                        <div class="data-email">
                            ${el.email}
                        </div>
                    </td>
                    <td>
                        <div class="data-address">
                            <p>
                                ${el.address.street}
                                ${el.address.suite}<br>
                                ${el.address.city}<br>
                                ${el.address.zipcode}
                            </p>
                            <div class="data-lat-lng">
                                <span class="lat">Latitude: ${el.address.geo.lat}</span>
                                <span class="lng">Longitude: ${el.address.geo.lng}</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="data-phone">
                            ${el.phone}
                        </div>
                    </td>
                    <td>
                        <div class="data-website">
                            ${el.website}
                        </div>
                    </td>
                    <td>
                        <div class="data-company">
                            <p>
                                <strong>${el.company.name}</strong><br>
                                ${el.company.catchPhrase}<br>
                            <i>${el.company.bs}</i>
                            </p>
                        </div>
                    </td>
                </tr>
            `);
        });
    }
});


_$('#select-user').onchange = (e) => {

    let value = e.target.value;

    getPosts((response) => {
        if(response) {
            _$('tr').innerHTML = `
            <th>UserId</th>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>`;
        
            response.forEach((post) => {
                if(post.userId == value) {
                    _$('tbody').innerHTML = "";
                    
                    _$('tbody').insertAdjacentHTML('beforeend', `
                    <tr>
                        <td>
                            <div class="data-userId">
                                ${post.userId}
                            </div>
                        </td>
                        <td>
                            <div class="data-id">
                                ${post.id}
                            </div>
                        </td>
                        <td>
                            <div class="data-title">
                                ${post.title}
                            </div>
                        </td>
                        <td>
                            <div class="data-body">
                                ${post.body}
                            </div>
                        </td>
                    </tr>
                    `);
                } 
            });
        }
    });
};