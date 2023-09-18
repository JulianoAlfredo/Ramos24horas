exports.tratarResponse = (err, result, req, res) =>{
    if(err){
        console.log(err.message);
        return res.status(500).json({ error: "Algo deu errado" });
    }
    return res.status(200).json(result);
}