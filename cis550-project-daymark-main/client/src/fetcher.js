import config from './config.json'

const getFrontPageBooks = async() => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/book`, {
        method: 'GET',
    })
    return res.json()
}

const getTopBooks = async(avgOrCount) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/book/top?sort_by=${avgOrCount}`, {
        method: 'Get'
    })
    return res.json()
}

const getSearchResults = async(title, isbn, author, limit) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/book/search?title=${title}&isbn=${isbn}&author_name=${author}&limit=${limit}`, {
        method: 'Get'
    })
    return res.json()
}

const getSimilarBooks = async(book_id, limit) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/book/similar/${book_id}?limit=${limit}`, {
        method: 'Get'
    })
    return res.json()
}

const getTopAuthors = async(sort, limit, genre) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/author/top?sort_by=${sort}&limit=${limit}&genre=${genre}`, {
        method: 'Get'
    })
    return res.json()
}

const getSimilarAuthors = async(id, limit) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/author/similar/${id}?limit=${limit}`, {
        method: 'Get'
    })
    return res.json()
}

const getBookDetail = async(id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/book/${id}`, {
        method: 'Get'
    })
    return res.json()
}

export {
    getFrontPageBooks,
    getTopBooks,
    getSearchResults,
    getSimilarBooks,
    getTopAuthors,
    getSimilarAuthors,
    getBookDetail
}