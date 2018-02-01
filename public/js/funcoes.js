function Excluir(id){
    var pergunta = confirm('Deseja realmente excluir?');
    if(pergunta){
        $.ajax({
            url: '/usuarios/delete/'+id,
            dataType: 'json',
            type: 'POST',
            statusCode:{
                200: function(data){
                    alert(data);
                    window.location.reload();
                },
                400: function(data){
                    alert(data);
                }
            }
        })
    }
}