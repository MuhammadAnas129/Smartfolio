exports.imageToText = async (req, res) => {
    const { imageurl } = req.query
    try {
        var myHeaders = new Headers();
        myHeaders.append("apikey", process.env.apiKey);
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };
        fetch(`${process.env.apiBaseUrl}?url=${imageurl}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                return res.json({
                    "result": result.all_text
                })
            })
    } catch (err) {
        return res.json({
            "error": err.message
        })
    }
}