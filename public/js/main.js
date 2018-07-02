$( document ).ready(function($) {
    $('form#new_token').submit(function(e){
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/new/",
            data: $(this).serialize()
        }).done(res => {
            if('err' in res || 'error' in res){
                console.log(res);
            }else{
                $('table').children('tbody').append(`
                    <tr>
                    <td>${res.title}</td>
                    <td>${res.domains}</td>
                    <td>${res.api_token}</td>
                    </tr>
                `)
            }
        });
    })
});