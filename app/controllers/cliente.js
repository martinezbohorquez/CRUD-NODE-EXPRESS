exports.entrada = function(req, res) 
{
    return res.render('cliente/entrada', {title: 'Cliente' })
}

exports.configuracion = function(req, res) 
{
    return res.render('cliente/configuracion', {title: 'Cliente' })
}